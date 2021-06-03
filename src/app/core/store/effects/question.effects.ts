import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { QuestionService } from '../../services/question.service';
import * as QuestionActions from '../actions/question.actions';

@Injectable({
  providedIn: 'root'
})
export class QuestionEffects {

  public createQuestion = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.createQuestion),
      mergeMap(action => this.questionService.createQuestion(action.question).pipe(
        map(questionMetadata => QuestionActions.createQuestionSuccess({ questionMetadata })),
        catchError(errorMessage => of(QuestionActions.createQuestionFailed({ errorMessage })))
      ))
    );
  });

  public loadQuestionById = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.loadQuestionById),
      mergeMap(action => this.questionService.loadQuestionById(action.id).pipe(
        map(questionMetadata => QuestionActions.loadQuestionByIdSuccess({ questionMetadata })),
        catchError(errorMessage => of(QuestionActions.loadQuestionByIdFailed({ errorMessage })))
      ))
    );
  });

  public loadQuestionsByQuizId = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.loadQuestionByQuizId),
      mergeMap(action => this.questionService.loadQuestionsByQuizId(action.id).pipe(
        map(questionsMetadata => QuestionActions.loadQuestionByQuizIdSuccess({ questionsMetadata })),
        catchError(errorMessage => of(QuestionActions.loadQuestionByQuizIdFailed({ errorMessage })))
      ))
    );
  });

  public updateQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.updateQuestion),
      mergeMap(({ metadata }) => this.questionService.updateQuestion(
        metadata
      ).pipe(
        map(questionMetadata => QuestionActions.updateQuestionSuccess({ questionMetadata })),
        catchError(errorMessage => of(QuestionActions.updateQuestionFailed({ errorMessage })))
      ))
    );
  });

  public deleteQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.deleteQuestion),
      mergeMap(action => this.questionService.deleteQuestion(action.id).pipe(
        map(questionMetadata => QuestionActions.deleteQuestionSuccess({ questionMetadata })),
        catchError(errorMessage => of(QuestionActions.deleteQuestionFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private questionService: QuestionService) { }
}
