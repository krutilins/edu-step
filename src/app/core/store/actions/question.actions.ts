import { createAction, props } from '@ngrx/store';
import { QuestionMetadata } from '../../models/metadata/question-metadata.model';

// CREATE QUESTOIN

export const createQuestion = createAction(
  '[Question] Create Question',
  props<{ question: Omit<QuestionMetadata, 'id'> }>()
);

export const createQuestionSuccess = createAction(
  '[Question] Create Question Success',
  props<{ questionMetadata: QuestionMetadata }>()
);

export const createQuestionFailed = createAction(
  '[Question] Create Question Failed',
  props<{ errorMessage: string }>()
);

// LOAD QUESTION BY ID

export const loadQuestionById = createAction(
  '[Question] Load Question By Id',
  props<{ id: string }>()
);

export const loadQuestionByIdSuccess = createAction(
  '[Question] Load Question By Id Success',
  props<{ questionMetadata: QuestionMetadata }>()
);

export const loadQuestionByIdFailed = createAction(
  '[Question] Load Question By Id Failed',
  props<{ errorMessage: string }>()
);

// LOAD QUESTION BY QUIZ ID

export const loadQuestionByQuizId = createAction(
  '[Question] Load Question By Quiz Id',
  props<{ id: string }>()
);

export const loadQuestionByQuizIdSuccess = createAction(
  '[Question] Load Question By Quiz Id Success',
  props<{ questionsMetadata: QuestionMetadata[] }>()
);

export const loadQuestionByQuizIdFailed = createAction(
  '[Question] Load Question By Quiz Id Failed',
  props<{ errorMessage: string }>()
);

// UPDATE QUESTION

export const updateQuestion = createAction(
  '[Question] Update Question',
  props<{ metadata: Omit<QuestionMetadata, 'quizId'> }>()
);

export const updateQuestionSuccess = createAction(
  '[Question] Update Question Success',
  props<{ questionMetadata: QuestionMetadata }>()
);

export const updateQuestionFailed = createAction(
  '[Question] Update Question Failed',
  props<{ errorMessage: string }>()
);

// DELETE QUESTION

export const deleteQuestion = createAction(
  '[Question] Delete Question',
  props<{ id: string }>()
);

export const deleteQuestionSuccess = createAction(
  '[Question] Delete Question Success',
  props<{ questionMetadata: QuestionMetadata }>()
);

export const deleteQuestionFailed = createAction(
  '[Question] Delete Question Failed',
  props<{ errorMessage: string }>()
);

