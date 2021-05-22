import { createAction, props } from '@ngrx/store';
import { QuizMetadata } from '../../models/metadata/quiz-metadata.model';
import { StepMetadata } from '../../models/metadata/step-metadata.model';

// LOAD QUIZ

export const loadQuiz = createAction(
  '[Quiz] Load Quiz',
  props<{ stepMetadata: StepMetadata }>()
);

export const loadQuizSuccess = createAction(
  '[Quiz] Load Quiz Success',
  props<{ quizMetadata: QuizMetadata }>()
);

export const loadQuizFailed = createAction(
  '[Quiz] Load Quiz Failed',
  props<{ errorMessage: string }>()
);

// UPDATE QUIZ

export const updateQuiz = createAction(
  '[Quiz] Update Quiz',
  props<{ id: string, title: string, subtitle: string, content: string[] }>()
);

export const updateQuizSuccess = createAction(
  '[Quiz] Update Quiz Success',
  props<{ quizMetadata: QuizMetadata }>()
);

export const updateQuizFailed = createAction(
  '[Quiz] Update Quiz Failed',
  props<{ errorMessage: string }>()
);

// DELETE QUIZ

export const deleteQuiz = createAction(
  '[Quiz] Delete Quiz',
  props<{ id: string }>()
);

export const deleteQuizSuccess = createAction(
  '[Quiz] Delete Quiz Success',
  props<{ quizMetadata: QuizMetadata }>()
);

export const deleteQuizFailed = createAction(
  '[Quiz] Delete Quiz Failed',
  props<{ errorMessage: string }>()
);

