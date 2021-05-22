import { createReducer, on } from '@ngrx/store';
import * as QuizActions from '../actions/quiz.actions';
import { deepCopy } from '../../functions/deep-copy.function';
import { QuizState } from '../models/quiz-state.model';
import { findChangedItem } from '../../functions/find-changed-item.function';

const initialState: QuizState = {
  quizes: []
};

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.loadQuizSuccess, (state, { quizMetadata }) => {
    const newState = deepCopy(state);

    const changedQuiz = findChangedItem(newState.quizes, quizMetadata.id);

    if (changedQuiz) {
      changedQuiz.title = quizMetadata.title;
      changedQuiz.subtitle = quizMetadata.subtitle;
    } else {
      newState.quizes = [...newState.quizes, quizMetadata];
    }

    return newState;
  }),
  on(QuizActions.updateQuizSuccess, (state, { quizMetadata }) => {
    const newState = deepCopy(state);

    const changedQuiz = findChangedItem(newState.quizes, quizMetadata.id);

    if (changedQuiz) {
      changedQuiz.title = quizMetadata.title;
      changedQuiz.subtitle = quizMetadata.subtitle;
    }

    return newState;
  }),
  on(QuizActions.deleteQuizSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.quizes = newState.quizes.filter(quiz => quiz.id !== action.quizMetadata.id);

    return newState;
  })
);
