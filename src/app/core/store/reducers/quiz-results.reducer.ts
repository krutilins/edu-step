import { createReducer, on } from '@ngrx/store';
import * as QuizResultActions from '../actions/quiz-result.actions';
import { QuizResultState } from '../models/quiz-result-state.model';

const initialState: QuizResultState = {
  results: []
};

export const quizResultReducer = createReducer(
  initialState,
  on(
    QuizResultActions.loadQuizResultsByQuizIdSuccess,
    QuizResultActions.loadQuizResultsByUserIdSuccess,
    (state, action) => {

      const newState: QuizResultState = {
        results: []
      };
      const quizResultsById = new Map();

      state.results.forEach(results => quizResultsById.set(results.id, results));
      action.quizResults.forEach(result => quizResultsById.set(result.id, result));

      for (const result of quizResultsById.values()) {
        newState.results.push(result);
      }

      return newState;
    }),
  on(QuizResultActions.sendQuizResultSuccess, (state, { quizResult }) => {
    const newState: QuizResultState = {
      results: []
    };

    const quizResultsById = new Map();

    state.results.forEach(result => quizResultsById.set(result.id, result));
    quizResultsById.set(quizResult.id, quizResult);

    for (const book of quizResultsById.values()) {
      newState.results.push(book);
    }

    return newState;
  })
);
