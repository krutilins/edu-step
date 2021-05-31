import { createSelector } from '@ngrx/store';
import { QuizResult } from '../../models/metadata/quiz-result-metadata.model';
import { AppState } from '../models/app-state.model';
import { QuizResultState } from '../models/quiz-result-state.model';

export const selectQuizResultState = (state: AppState): QuizResultState => state.quizResult;

export const selectQuizResultByQuizId = createSelector(
  selectQuizResultState,
  (
    quizResultState: QuizResultState,
    props: { quizId: string }
  ): QuizResult | undefined => quizResultState.results.find(result => result.quizId === props.quizId)
);

export const selectQuizResultById = createSelector(
  selectQuizResultState,
  (
    quizResultState: QuizResultState,
    props: { id: string }
  ): QuizResult | undefined => quizResultState.results.find(result => result.id === props.id)
);
