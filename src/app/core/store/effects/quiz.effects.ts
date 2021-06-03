import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { StepQuizService } from '../../services/step-quiz.service';
import * as QuizActions from '../actions/quiz.actions';

@Injectable({
  providedIn: 'root'
})
export class QuizEffects {

  public loadQuiz = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.loadQuiz),
      mergeMap(action => this.stepQuizService.loadQuiz(action.stepMetadata).pipe(
        map(quizMetadata => QuizActions.loadQuizSuccess({ quizMetadata })),
        catchError(errorMessage => of(QuizActions.loadQuizFailed({ errorMessage })))
      ))
    );
  });

  public updateQuiz = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.updateQuiz),
      mergeMap(action => this.stepQuizService.updateQuiz(action.quizMetadata).pipe(
        map(quizMetadata => QuizActions.updateQuizSuccess({ quizMetadata })),
        catchError(errorMessage => of(QuizActions.updateQuizFailed({ errorMessage })))
      ))
    );
  });

  public deleteQuiz = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.deleteQuiz),
      mergeMap(action => this.stepQuizService.deleteQuiz(action.id).pipe(
        map(quizMetadata => QuizActions.deleteQuizSuccess({ quizMetadata })),
        catchError(errorMessage => of(QuizActions.deleteQuizFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private stepQuizService: StepQuizService) { }
}
