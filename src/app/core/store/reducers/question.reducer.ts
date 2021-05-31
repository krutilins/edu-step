import { createReducer, on } from '@ngrx/store';
import { deepCopy } from '../../functions/deep-copy.function';
import { findChangedItem } from '../../functions/find-changed-item.function';
import * as QuestoinActions from '../actions/question.actions';
import { QuestionState } from '../models/question-state.model';

const initialState: QuestionState = {
  questions: []
};

export const questionReducer = createReducer(
  initialState,
  on(QuestoinActions.createQuestionSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.questions.push(action.questionMetadata);

    return newState;
  }),
  on(QuestoinActions.loadQuestionByIdSuccess, (state, { questionMetadata }) => {
    const newState = deepCopy(state);

    const changedQuestion = findChangedItem(newState.questions, questionMetadata.id);

    if (changedQuestion) {
      changedQuestion.answerType = questionMetadata.answerType;
      changedQuestion.options = questionMetadata.options;
      changedQuestion.question = questionMetadata.question;
      changedQuestion.quizId = questionMetadata.quizId;
      changedQuestion.required = questionMetadata.required;
    } else {
      newState.questions = [...newState.questions, questionMetadata];
    }

    return newState;
  }),
  on(QuestoinActions.loadQuestionByQuizIdSuccess, (state, action) => {
    const newState = deepCopy(state);

    for (const actionQuestion of action.questionsMetadata) {
      let exists = false;

      for (let question of newState.questions) {
        if (question.id === actionQuestion.id) {
          exists = true;
          question = actionQuestion;
        }
      }

      if (!exists) {
        newState.questions.push(actionQuestion);
      }
    }

    return newState;
  }),
  on(QuestoinActions.updateQuestionSuccess, (state, { questionMetadata }) => {
    const newState = deepCopy(state);

    const changedQuestion = findChangedItem(newState.questions, questionMetadata.id);

    if (changedQuestion) {
      changedQuestion.answerType = questionMetadata.answerType;
      changedQuestion.options = questionMetadata.options;
      changedQuestion.question = questionMetadata.question;
      changedQuestion.quizId = questionMetadata.quizId;
      changedQuestion.required = questionMetadata.required;
    }

    return newState;
  }),
  on(QuestoinActions.deleteQuestionSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.questions = newState.questions.filter(question => question.id !== action.questionMetadata.id);

    return newState;
  })
);
