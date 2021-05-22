import { createSelector } from '@ngrx/store';
import { QuizMetadata } from '../../models/metadata/quiz-metadata.model';
import { AppState } from '../models/app-state.model';
import { QuizState } from '../models/quiz-state.model';

export const selectQuizes = (state: AppState): QuizState => state.quiz;

export const selectQuizById = createSelector(
  selectQuizes,
  (
    quizState: QuizState,
    props: { id: string }
  ): QuizMetadata | undefined => quizState.quizes.find(quiz => quiz.id === props.id)
);
