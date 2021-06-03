import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { QuizMetadata } from '../models/metadata/quiz-metadata.model';
import { StepMetadata } from '../models/metadata/step-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class StepQuizService {

  constructor(private firestore: AngularFirestore, private uuidv4: v4) { }

  public loadQuiz(stepMetadata: StepMetadata): Observable<QuizMetadata> {
    return this.firestore.collection<QuizMetadata>(environment.firebaseEndpoints.quiz).doc(stepMetadata.contentId).get().pipe(
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
    return this.firestore.collection<QuizMetadata>(environment.firebaseEndpoints.quiz).doc(quizMetadata.id).get().pipe(
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
    return this.firestore.collection<QuizMetadata>(environment.firebaseEndpoints.quiz).doc(id).get().pipe(
      mergeMap(quizSnapshot => from(quizSnapshot.ref.delete().then(_ => quizSnapshot.data())))
    );
  }

}
