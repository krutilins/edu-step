import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BookEditorService } from '../../services/book-editor.service';
import * as QuizActions from '../actions/quiz.actions';

@Injectable({
  providedIn: 'root'
})
export class QuizEffects {

  public loadQuiz = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.loadQuiz),
      mergeMap(action => this.bookEditorService.loadQuiz(action.stepMetadata).pipe(
        map(quizMetadata => QuizActions.loadQuizSuccess({ quizMetadata })),
        catchError(errorMessage => of(QuizActions.loadQuizFailed({ errorMessage })))
      ))
    );
  });

  public updateQuiz = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.updateQuiz),
      mergeMap(action => this.bookEditorService.updateQuiz(action.quizMetadata).pipe(
        map(quizMetadata => QuizActions.updateQuizSuccess({ quizMetadata })),
        catchError(errorMessage => of(QuizActions.updateQuizFailed({ errorMessage })))
      ))
    );
  });

  public deleteQuiz = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.deleteQuiz),
      mergeMap(action => this.bookEditorService.deleteQuiz(action.id).pipe(
        map(quizMetadata => QuizActions.deleteQuizSuccess({ quizMetadata })),
        catchError(errorMessage => of(QuizActions.deleteQuizFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private bookEditorService: BookEditorService) { }
}
