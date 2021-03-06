import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { deepCopy } from '../functions/deep-copy.function';
import { BookMetadata } from '../models/metadata/book-metadata.model';
import { Library } from '../models/metadata/library.model';
import { QuestionMetadata } from '../models/metadata/question-metadata.model';
import { QuizMetadata } from '../models/metadata/quiz-metadata.model';
import { QuizResult } from '../models/metadata/quiz-result-metadata.model';
import { StepMetadata } from '../models/metadata/step-metadata.model';
import { TextMetadata } from '../models/metadata/text-metadata.model';
import { UnitMetadata } from '../models/metadata/unit-metadata.model';
import { BlockType } from '../models/types/block-type.model';
import { TextType } from '../models/types/text-type.model';

@Injectable({
  providedIn: 'root'
})
export class BookEditorService {
  // TODO: change to env
  private readonly booksCollectionKey = 'books';
  private readonly unitsCollectionKey = 'units';
  private readonly stepsCollectionKey = 'steps';
  private readonly textCollectionKey = 'texts';
  private readonly quizCollectionKey = 'quizes';
  private readonly questionsCollectionKey = 'questions';
  private readonly quizResultsCollectionKey = 'quizResults';
  private readonly libraryCollectionKey = 'library';

  constructor(private firestore: AngularFirestore) { }

  // BOOK CRUD

  public createBook(title: string, subtitle: string, owner: string): Observable<BookMetadata> {
    const newBook: BookMetadata = {
      id: uuidv4(),
      owner,
      title,
      subtitle
    };

    return from(this.firestore.collection<BookMetadata>(this.booksCollectionKey).doc(newBook.id).set(newBook).then(_ => newBook));
  }

  public loadAllBooks(): Observable<BookMetadata[]> {
    return this.firestore.collection<BookMetadata>(this.booksCollectionKey).get().pipe(
      map(bookQuery => bookQuery.docs.map(bookData => bookData.data()))
    );
  }


  public loadBook(id: string): Observable<BookMetadata> {
    return this.firestore.collection<BookMetadata>(this.booksCollectionKey).doc(id).get().pipe(
      map(bookMetadataSnapshot => bookMetadataSnapshot.data())
    );
  }

  public loadBooksByUserId(userId: string): Observable<BookMetadata[]> {
    return this.firestore.collection<BookMetadata>(this.booksCollectionKey, (ref) => ref.where('owner', '==', userId)).get().pipe(
      map(bookQuery => bookQuery.docs.map(bookData => bookData.data()))
    );
  }

  public loadBooksByIds(ids: string[]): Observable<BookMetadata[]> {
    if (ids.length === 0) {
      return from([]);
    }
    return this.firestore.collection<BookMetadata>(this.booksCollectionKey, ref => ref.where('id', 'in', ids)).get().pipe(
      map(bookMetadataQuery => bookMetadataQuery.docs.map(bookMetadataSnapshot => bookMetadataSnapshot.data()))
    );
  }

  public updateBook(id: string, title: string, subtitle: string): Observable<BookMetadata> {
    return this.firestore.collection<BookMetadata>(this.booksCollectionKey).doc(id).get().pipe(
      mergeMap(bookMetadataSnapshot => {
        if (bookMetadataSnapshot.exists) {
          return from(bookMetadataSnapshot.ref.update({
            title,
            subtitle
          }).then(
            () => ({
              ...bookMetadataSnapshot.data(),
              title,
              subtitle
            })
          ));
        } else {
          return throwError('book metadata not exists');
        }
      })
    );
  }

  public deleteBook(id: string): Observable<BookMetadata> {
    return this.firestore.collection<BookMetadata>(this.booksCollectionKey).doc(id).get().pipe(
      mergeMap(bookSnapshot => from(bookSnapshot.ref.delete().then(() => bookSnapshot.data())))
    );
  }

  // STEP CRUD

  public createStep(stepMetadata: Omit<StepMetadata, 'id' | 'contentId'>): Observable<StepMetadata> {
    const newStep: StepMetadata = {
      ...stepMetadata,
      id: uuidv4(),
      contentId: uuidv4(),
    };

    return from(this.firestore.collection<StepMetadata>(this.stepsCollectionKey).doc(newStep.id).set(newStep).then(_ => newStep));
  }

  public loadStep(id: string): Observable<StepMetadata> {
    return this.firestore.collection<StepMetadata>(this.stepsCollectionKey).doc(id).get().pipe(
      map(stepSnapshot => {
        if (stepSnapshot.exists) {
          return stepSnapshot.data();
        } else {
          throwError('step does not exist');
        }
      })
    );
  }

  public loadStepsByUnitId(unitId: string): Observable<StepMetadata[]> {
    return this.firestore.collection<StepMetadata>(
      this.stepsCollectionKey,
      ref => ref.where('unitId', '==', unitId)
    ).get().pipe(
      map(stepsQuery => stepsQuery.docs.map(stepSnapshot => stepSnapshot.data()))
    );
  }

  public loadStepsByBookId(bookId: string): Observable<StepMetadata[]> {
    return this.firestore.collection<StepMetadata>(
      this.stepsCollectionKey,
      ref => ref.where('bookId', '==', bookId)
    ).get().pipe(
      map(stepsQuery => stepsQuery.docs.map(stepSnapshot => stepSnapshot.data()))
    );
  }

  public updateStep(id: string, title: string, subtitle: string): Observable<StepMetadata> {
    return this.firestore.collection<StepMetadata>(this.stepsCollectionKey).doc(id).get().pipe(
      mergeMap(stepMetadataSnapshot => {
        if (stepMetadataSnapshot.exists) {
          return from(stepMetadataSnapshot.ref.update({
            title,
            subtitle
          }).then(
            () => ({
              ...stepMetadataSnapshot.data(),
              title,
              subtitle
            })
          ));
        } else {
          return throwError('book metadata not exists');
        }
      })
    );
  }

  public deleteStep(id: string): Observable<StepMetadata> {
    return this.firestore.collection<StepMetadata>(this.stepsCollectionKey).doc(id).get().pipe(
      mergeMap(stepSnapshot => {

        if (stepSnapshot.data().blockType === BlockType.Text) {
          this.firestore.collection<TextMetadata>(this.textCollectionKey).doc(stepSnapshot.data().contentId).delete();

        } else {
          this.firestore.collection<QuizMetadata>(this.quizCollectionKey).doc(stepSnapshot.data().contentId).get().pipe(
            mergeMap(quizSnpashot => {

              return this.firestore.collection<QuestionMetadata>(
                this.questionsCollectionKey,
                ref => ref.where('quizId', '==', quizSnpashot.data().id)
              ).get().pipe(
                map(questionQuery => questionQuery.docs.map(questionSnapshot => questionSnapshot.ref.delete()))
              );
            })
          );
        }

        return from(stepSnapshot.ref.delete().then(_ => stepSnapshot.data()));
      })
    );
  }

  // UNIT CRUD

  public createUnit(unitMetadata: Omit<UnitMetadata, 'id'>): Observable<UnitMetadata> {
    const newUnit: UnitMetadata = {
      ...unitMetadata,
      id: uuidv4(),
    };

    return from(this.firestore.collection<UnitMetadata>(this.unitsCollectionKey).doc(newUnit.id).set(newUnit).then(_ => newUnit));
  }

  public loadUnitById(id: string): Observable<UnitMetadata> {
    return this.firestore.collection<UnitMetadata>(this.unitsCollectionKey).doc(id).get().pipe(
      map(unitSnapshot => unitSnapshot.data())
    );
  }

  public loadUnitsByBookId(bookId: string): Observable<UnitMetadata[]> {
    return this.firestore.collection<UnitMetadata>(
      this.unitsCollectionKey,
      ref => ref.where('bookId', '==', bookId)
    ).get().pipe(
      map(unitsQuery => unitsQuery.docs.map(unitSnapshot => unitSnapshot.data()))
    );
  }

  public updateUnit(id: string, title: string, subtitle: string): Observable<UnitMetadata> {
    return this.firestore.collection<UnitMetadata>(this.unitsCollectionKey).doc(id).get().pipe(
      mergeMap(unitMetadataSnapshot => {
        if (unitMetadataSnapshot.exists) {
          return from(unitMetadataSnapshot.ref.update({
            title,
            subtitle
          }).then(
            () => ({
              ...unitMetadataSnapshot.data(),
              title,
              subtitle
            })
          ));
        } else {
          return throwError('unit metadata does not exists');
        }
      })
    );
  }

  public deleteUnit(id: string): Observable<UnitMetadata> {
    return this.firestore.collection<UnitMetadata>(this.unitsCollectionKey).doc(id).get().pipe(
      mergeMap(unitSnapshot => from(unitSnapshot.ref.delete().then(_ => unitSnapshot.data())))
    );
  }

  // TEXT CRUD

  public loadStepText(stepMetadata: StepMetadata): Observable<TextMetadata> {
    return this.firestore.collection<TextMetadata>(this.textCollectionKey).doc(stepMetadata.contentId).get().pipe(
      mergeMap(textSnapshot => {
        if (!textSnapshot.exists) {
          const newText: TextMetadata = {
            id: stepMetadata.contentId,
            title: 'Title',
            subtitle: 'Description',
            content: '',
            type: TextType.Text
          };

          return from(this.firestore.collection<TextMetadata>(this.textCollectionKey).doc(newText.id).set(newText).then(_ => newText));
        } else {
          return of(textSnapshot.data());
        }
      })
    );
  }

  public updateStepText(textMetadata: TextMetadata): Observable<TextMetadata> {
    return this.firestore.collection<TextMetadata>(this.textCollectionKey).doc(textMetadata.id).get().pipe(
      mergeMap(textMetadataSnapshot => {
        if (textMetadataSnapshot.exists) {
          return from(textMetadataSnapshot.ref.update(textMetadata).then(
            () => ({
              ...textMetadataSnapshot.data(),
              ...textMetadata
            })
          ));
        } else {
          return throwError('step text metadata does not exist');
        }
      })
    );
  }

  public deleteStepText(id: string): Observable<TextMetadata> {
    return this.firestore.collection<TextMetadata>(this.textCollectionKey).doc(id).get().pipe(
      mergeMap(textSnapshot => from(textSnapshot.ref.delete().then(_ => textSnapshot.data())))
    );
  }

  // QUIZ CRUD

  public loadQuiz(stepMetadata: StepMetadata): Observable<QuizMetadata> {
    return this.firestore.collection<QuizMetadata>(this.quizCollectionKey).doc(stepMetadata.contentId).get().pipe(
      map(quizSnapshot => {
        if (!quizSnapshot.exists) {
          const newQuiz: QuizMetadata = {
            id: stepMetadata.contentId,
            title: 'Quiz',
            subtitle: 'Description',
          };

          quizSnapshot.ref.set(newQuiz);

          return newQuiz;
        } else {
          return quizSnapshot.data();
        }
      })
    );
  }

  public updateQuiz(quizMetadata: QuizMetadata): Observable<QuizMetadata> {
    return this.firestore.collection<QuizMetadata>(this.quizCollectionKey).doc(quizMetadata.id).get().pipe(
      mergeMap(quizSnapshot => {
        if (quizSnapshot.exists) {
          return from(quizSnapshot.ref.update(quizMetadata).then(
            () => (quizMetadata)
          ));
        } else {
          return throwError('quiz metadata does not exist');
        }
      })
    );
  }

  public deleteQuiz(id: string): Observable<QuizMetadata> {
    return this.firestore.collection<QuizMetadata>(this.quizCollectionKey).doc(id).get().pipe(
      mergeMap(quizSnapshot => from(quizSnapshot.ref.delete().then(_ => quizSnapshot.data())))
    );
  }

  // QUESTION CRUD

  public createQuestion(question: Omit<QuestionMetadata, 'id'>): Observable<QuestionMetadata> {
    const newQuestion: QuestionMetadata = {
      ...question,
      id: uuidv4(),
    };

    return from(
      this.firestore.collection<QuestionMetadata>(this.questionsCollectionKey).doc(newQuestion.id).set(newQuestion).then(_ => newQuestion)
    );
  }

  public loadQuestionById(id: string): Observable<QuestionMetadata> {
    return this.firestore.collection<QuestionMetadata>(this.questionsCollectionKey).doc(id).get().pipe(
      map(questionSnapshot => questionSnapshot.data())
    );
  }

  public loadQuestionsByQuizId(quizId: string): Observable<QuestionMetadata[]> {
    return this.firestore.collection<QuestionMetadata>(this.questionsCollectionKey, ref => ref.where('quizId', '==', quizId)).get().pipe(
      map(questionQuery => questionQuery.docs.map(questionSnapshot => questionSnapshot.data()))
    );
  }

  public updateQuestion(
    metadata: Omit<QuestionMetadata, 'quizId'>
  ): Observable<QuestionMetadata> {
    return this.firestore.collection<QuestionMetadata>(this.questionsCollectionKey).doc(metadata.id).get().pipe(
      mergeMap(questionSnapshot => {
        if (questionSnapshot.exists) {
          return from(questionSnapshot.ref.update({
            question: metadata.question,
            answerType: metadata.answerType,
            options: metadata.options,
            required: metadata.required
          }).then(
            () => ({
              ...questionSnapshot.data(),
              ...metadata
            })
          ));
        } else {
          return throwError('question metadata does not exist');
        }
      })
    );
  }

  public deleteQuestion(id: string): Observable<QuestionMetadata> {
    return this.firestore.collection<QuestionMetadata>(this.questionsCollectionKey).doc(id).get().pipe(
      mergeMap(questionSnapshot => from(questionSnapshot.ref.delete().then(_ => questionSnapshot.data())))
    );
  }

  public sendQuizResult(quizResult: Omit<QuizResult, 'id'>): Observable<QuizResult> {
    const newQuizResult: QuizResult = {
      ...quizResult,
      id: uuidv4()
    };

    return from(
      this.firestore.collection<QuizResult>(this.quizResultsCollectionKey).doc(newQuizResult.id).set(newQuizResult).then(_ => newQuizResult)
    );
  }

  public loadQuizResultsByUserId(quizId: string, userId: string): Observable<QuizResult[]> {
    return this.firestore.collection<QuizResult>(this.quizResultsCollectionKey, ref => ref.where('quizId', '==', quizId).where('userId', '==', userId)).get().pipe(
      map(questionQuery => questionQuery.docs.map(questionSnapshot => questionSnapshot.data()))
    );
  }

  public loadQuizResultsByQuizId(quizId: string): Observable<QuizResult[]> {
    return this.firestore.collection<QuizResult>(this.quizResultsCollectionKey, ref => ref.where('quizId', '==', quizId)).get().pipe(
      map(questionQuery => questionQuery.docs.map(questionSnapshot => questionSnapshot.data()))
    );
  }

  public addBookToLibrary(bookId: string, userId: string): Observable<Library> {
    return from(
      this.firestore.collection<Library>(this.libraryCollectionKey).doc(userId).get().pipe(
        mergeMap(librarySnapshot => {
          if (librarySnapshot.exists) {
            const newLibrary: Library = deepCopy(librarySnapshot.data());
            newLibrary.books.push(bookId);

            return from(
              this.firestore.collection<Library>(this.libraryCollectionKey).doc(userId).set(newLibrary).then(_ => newLibrary)
            );


          } else {
            const newLibrary: Library = {
              books: [bookId],
              id: uuidv4(),
              userId
            };

            return from(
              this.firestore.collection<Library>(this.libraryCollectionKey).doc(userId).set(newLibrary).then(_ => newLibrary)
            );
          }
        })
      )
    );
  }

  public deleteBookFromLibrary(bookId: string, userId: string): Observable<Library> {
    return from(
      this.firestore.collection<Library>(this.libraryCollectionKey).doc(userId).get().pipe(
        mergeMap(librarySnapshot => {
          if (librarySnapshot.exists) {
            const newLibrary: Library = librarySnapshot.data();
            newLibrary.books = newLibrary.books.filter(id => id !== bookId);

            return from(
              this.firestore.collection<Library>(this.libraryCollectionKey).doc(userId).set(newLibrary).then(_ => newLibrary)
            );


          } else {
            const newLibrary: Library = {
              books: [],
              id: uuidv4(),
              userId
            };

            return from(
              this.firestore.collection<Library>(this.libraryCollectionKey).doc(userId).set(newLibrary).then(_ => newLibrary)
            );
          }
        })
      )
    );
  }

  public loadLibrary(userId: string): Observable<Library> {
    return this.firestore.collection<Library>(this.libraryCollectionKey).doc(userId).get().pipe(
      map(librarySnapshot => {
        if (librarySnapshot.exists) {
          return librarySnapshot.data()
        } else {
          const newLibrary: Library = {
            books: [],
            id: userId,
            userId
          };
          librarySnapshot.ref.set(newLibrary);
          return newLibrary;
        }
      })
    );
  }
}
