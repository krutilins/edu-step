import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { QuestionMetadata } from '../models/metadata/question-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private firestore: AngularFirestore, private uuidv4: v4) { }

  public createQuestion(question: Omit<QuestionMetadata, 'id'>): Observable<QuestionMetadata> {
    const newQuestion: QuestionMetadata = {
      ...question,
      id: this.uuidv4(),
    };

    return from(
      this.firestore.collection<QuestionMetadata>(environment.firebaseEndpoints.questions)
        .doc(newQuestion.id)
        .set(newQuestion)
        .then(_ => newQuestion)
    );
  }

  public loadQuestionById(id: string): Observable<QuestionMetadata> {
    return this.firestore.collection<QuestionMetadata>(environment.firebaseEndpoints.questions).doc(id).get().pipe(
      map(questionSnapshot => questionSnapshot.data())
    );
  }

  public loadQuestionsByQuizId(quizId: string): Observable<QuestionMetadata[]> {
    return this.firestore.collection<QuestionMetadata>(
      environment.firebaseEndpoints.questions,
      ref => ref.where('quizId', '==', quizId)
    ).get().pipe(
      map(questionQuery => questionQuery.docs.map(questionSnapshot => questionSnapshot.data()))
    );
  }

  public updateQuestion(
    metadata: Omit<QuestionMetadata, 'quizId'>
  ): Observable<QuestionMetadata> {
    return this.firestore.collection<QuestionMetadata>(environment.firebaseEndpoints.questions).doc(metadata.id).get().pipe(
      mergeMap(questionSnapshot => {
        if (questionSnapshot.exists) {
          return from(questionSnapshot.ref.update(metadata).then(() => ({
            ...questionSnapshot.data(),
            ...metadata
          })));
        } else {
          return throwError('question metadata does not exist');
        }
      })
    );
  }

  public deleteQuestion(id: string): Observable<QuestionMetadata> {
    return this.firestore.collection<QuestionMetadata>(environment.firebaseEndpoints.questions).doc(id).get().pipe(
      mergeMap(questionSnapshot => from(questionSnapshot.ref.delete().then(_ => questionSnapshot.data())))
    );
  }

}
