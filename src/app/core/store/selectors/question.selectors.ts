import { createSelector } from '@ngrx/store';
import { QuestionMetadata } from '../../models/metadata/question-metadata.model';
import { AppState } from '../models/app-state.model';
import { QuestionState } from '../models/question-state.model';

export const selectQuestions = (state: AppState): QuestionState => state.question;

export const selectQuestionById = createSelector(
  selectQuestions,
  (
    questionState: QuestionState,
    props: { id: string }
  ): QuestionMetadata | undefined => questionState.questions.find(question => question.id === props.id)
);

export const selectQuestionByQuizId = createSelector(
  selectQuestions,
  (
    questionState: QuestionState,
    props: { quizId: string }
  ): QuestionMetadata[] => questionState.questions.filter(question => question.quizId === props.quizId)
);
