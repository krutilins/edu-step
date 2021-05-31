import { createReducer, on } from '@ngrx/store';
import { deepCopy } from '../../functions/deep-copy.function';
import { loadQuizResultsByQuizIdSuccess, loadQuizResultsByUserIdSuccess, sendQuizResultSuccess } from '../actions/quiz-result.actions';
import { QuizResultState } from '../models/quiz-result-state.model';

const initialState: QuizResultState = {
  results: []
};

export const quizResultReducer = createReducer(
  initialState,
  on(loadQuizResultsByQuizIdSuccess, (state, action) => {
    const newState = deepCopy(state);

    for (const actionQuizResult of action.quizResults) {
      let exists = false;

      for (let quizResult of newState.results) {
        if (quizResult.id === actionQuizResult.id) {
          exists = true;
          quizResult = actionQuizResult;
        }
      }

      if (!exists) {
        newState.results.push(actionQuizResult);
      }
    }

    return newState;
  }),
  on(loadQuizResultsByUserIdSuccess, (state, action) => {
    const newState = deepCopy(state);

    for (const actionQuizResult of action.quizResults) {
      let exists = false;

      for (let quizResult of newState.results) {
        if (quizResult.id === actionQuizResult.id) {
          exists = true;
          quizResult = actionQuizResult;
        }
      }

      if (!exists) {
        newState.results.push(actionQuizResult);
      }
    }

    return newState;
  }),
  on(sendQuizResultSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.results.push(action.quizResult);

    return newState;
  })
);
