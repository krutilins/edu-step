import { createAction, props } from '@ngrx/store';
import { QuizResult } from '../../models/metadata/quiz-result-metadata.model';

export const sendQuizResult = createAction(
  '[Quiz Result] Send Quiz Result',
  props<{ quizResult: Omit<QuizResult, 'id'> }>()
);

export const sendQuizResultSuccess = createAction(
  '[Quiz Result] Send Quiz Result Success',
  props<{ quizResult: QuizResult }>()
);

export const sendQuizResultFailed = createAction(
  '[Quiz Result] Send Quiz Result Failed',
  props<{ errorMessage: string }>()
);

export const loadQuizResultsByUserId = createAction(
  '[Quiz Result] Load Quiz By User Id Result',
  props<{ quizId: string, userId: string }>()
);

export const loadQuizResultsByUserIdSuccess = createAction(
  '[Quiz Result] Load Quiz Results By User Id Success',
  props<{ quizResults: QuizResult[] }>()
);

export const loadQuizResultsByUserIdFailed = createAction(
  '[Quiz Result] Load Quiz Results By User Id Failed',
  props<{ errorMessage: string }>()
);

export const loadQuizResultsByQuiz = createAction(
  '[Quiz Result] Load Quiz By Quiz Id Result',
  props<{ quizId: string }>()
);

export const loadQuizResultsByQuizIdSuccess = createAction(
  '[Quiz Result] Load Quiz By Quiz Id Result Success',
  props<{ quizResults: QuizResult[] }>()
);

export const loadQuizResultsByQuizIdFailed = createAction(
  '[Quiz Result] Load Quiz By Quiz Id Result Failed',
  props<{ errorMessage: string }>()
);



