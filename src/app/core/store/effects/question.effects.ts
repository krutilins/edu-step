import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BookEditorService } from '../../services/book-editor.service';
import * as QuestionActions from '../actions/question.actions';

@Injectable({
  providedIn: 'root'
})
export class QuestionEffects {

  public createQuestion = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.createQuestion),
      mergeMap(action => this.bookEditorService.createQuestion(action.question).pipe(
        map(questionMetadata => QuestionActions.createQuestionSuccess({ questionMetadata })),
        catchError(errorMessage => of(QuestionActions.createQuestionFailed({ errorMessage })))
      ))
    );
  });

  public loadQuestionById = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.loadQuestionById),
      mergeMap(action => this.bookEditorService.loadQuestionById(action.id).pipe(
        map(questionMetadata => QuestionActions.loadQuestionByIdSuccess({ questionMetadata })),
        catchError(errorMessage => of(QuestionActions.loadQuestionByIdFailed({ errorMessage })))
      ))
    );
  });

  public loadQuestionsByQuizId = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.loadQuestionByQuizId),
      mergeMap(action => this.bookEditorService.loadQuestionsByQuizId(action.id).pipe(
        map(questionsMetadata => QuestionActions.loadQuestionByQuizIdSuccess({ questionsMetadata })),
        catchError(errorMessage => of(QuestionActions.loadQuestionByQuizIdFailed({ errorMessage })))
      ))
    );
  });

  public updateQuestion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuestionActions.updateQuestion),
      mergeMap(({ id, question, answerType, options, required }) => this.bookEditorService.updateQuestion(
        id,
        question,
        answerType,
        options,
        required
      ).pipe(
        map(questionMetadata => QuestionActions.updateQuestionSuccess({ questionMetadata })),
        catchError(errorMessage => of(QuestionActions.updateQuestionFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private bookEditorService: BookEditorService) { }
}
