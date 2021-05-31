import { createReducer, on } from '@ngrx/store';
import * as StepTextActions from '../actions/step-text.actions';
import { deepCopy } from '../../functions/deep-copy.function';
import { findChangedItem } from '../../functions/find-changed-item.function';
import { StepTextState } from '../models/step-text-state.model';

const initialState: StepTextState = {
  texts: []
};

export const stepTextReducer = createReducer(
  initialState,
  on(StepTextActions.loadStepTextSuccess, (state, { textMetadata }) => {
    const newState = deepCopy(state);

    const changedStepText = findChangedItem(newState.texts, textMetadata.id);

    if (changedStepText) {
      changedStepText.title = textMetadata.title;
      changedStepText.subtitle = textMetadata.subtitle;
    } else {
      newState.texts = [...newState.texts, textMetadata];
    }

    return newState;
  }),
  on(StepTextActions.updateStepText, (state, { textMetadata }) => {
    const newState = deepCopy(state);

    const changedStepText = findChangedItem(newState.texts, textMetadata.id);

    if (changedStepText) {
      changedStepText.title = textMetadata.title;
      changedStepText.subtitle = textMetadata.subtitle;
      changedStepText.content = textMetadata.content;
    }

    return newState;
  }),
  on(StepTextActions.deleteStepTextSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.texts = newState.texts.filter(quiz => quiz.id !== action.textMetadata.id);

    return newState;
  })
);
