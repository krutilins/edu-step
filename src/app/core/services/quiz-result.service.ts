import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { QuizResult } from '../models/metadata/quiz-result-metadata.model';


@Injectable({
  providedIn: 'root'
})
export class QuizResultService {

  constructor(private firestore: AngularFirestore, private uuidv4: v4) { }

  public sendQuizResult(quizResult: Omit<QuizResult, 'id'>): Observable<QuizResult> {
    const newQuizResult: QuizResult = {
      ...quizResult,
      id: this.uuidv4()
    };

    return from(
      this.firestore.collection<QuizResult>(environment.firebaseEndpoints.quizResults)
        .doc(newQuizResult.id)
        .set(newQuizResult)
        .then(_ => newQuizResult)
    );
  }

  public loadQuizResultsByUserId(quizId: string, userId: string): Observable<QuizResult[]> {
    return this.firestore.collection<QuizResult>(
      environment.firebaseEndpoints.quizResults,
      ref => ref.where('quizId', '==', quizId).where('userId', '==', userId)
    ).get().pipe(
      map(questionQuery => questionQuery.docs.map(questionSnapshot => questionSnapshot.data()))
    );
  }

  public loadQuizResultsByQuizId(quizId: string): Observable<QuizResult[]> {
    return this.firestore.collection<QuizResult>(
      environment.firebaseEndpoints.quizResults,
      ref => ref.where('quizId', '==', quizId)
    ).get().pipe(
      map(questionQuery => questionQuery.docs.map(questionSnapshot => questionSnapshot.data()))
    );
  }
}
