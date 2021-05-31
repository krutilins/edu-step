import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BookEditorService } from '../../services/book-editor.service';
import * as QuizResultActions from '../actions/quiz-result.actions';

@Injectable({
  providedIn: 'root'
})
export class QuizResultEffects {

  public sendQuizResult = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizResultActions.sendQuizResult),
      mergeMap(action => this.bookEditorService.sendQuizResult(action.quizResult).pipe(
        map(quizResult => QuizResultActions.sendQuizResultSuccess({ quizResult })),
        catchError(errorMessage => of(QuizResultActions.sendQuizResultFailed({ errorMessage })))
      ))
    );
  });

  public loadQuizResultsByUserId = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizResultActions.loadQuizResultsByUserId),
      mergeMap(action => this.bookEditorService.loadQuizResultsByUserId(action.quizId, action.userId).pipe(
        map(quizResults => QuizResultActions.loadQuizResultsByUserIdSuccess({ quizResults })),
        catchError(errorMessage => of(QuizResultActions.loadQuizResultsByUserIdFailed({ errorMessage })))
      ))
    );
  });

  public loadQuizResultByQuizId = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizResultActions.loadQuizResultsByQuiz),
      mergeMap(action => this.bookEditorService.loadQuizResultsByQuizId(action.quizId).pipe(
        map(quizResults => QuizResultActions.loadQuizResultsByQuizIdSuccess({ quizResults })),
        catchError(errorMessage => of(QuizResultActions.loadQuizResultsByQuizIdFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private bookEditorService: BookEditorService) { }
}
