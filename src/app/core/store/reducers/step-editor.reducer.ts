import { createReducer, on } from '@ngrx/store';
import { StepEditorState } from '../models/step-editor.model';
import * as StepEditorActions from '../actions/step-editor.action';
import { deepCopy } from '../../functions/deep-copy.function';

const initialState: StepEditorState = {
  steps: []
};

export const stepEditorReducer = createReducer(
  initialState,
  on(StepEditorActions.loadStepSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.steps = newState.steps.filter(step => step.id !== action.stepMetadata.id);
    newState.steps.push(action.stepMetadata);

    return newState;
  }),
  on(StepEditorActions.deleteStepSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.steps = newState.steps.filter(step => step.id !== action.stepMetadata.id);

    return newState;
  }),
  on(StepEditorActions.updateStepSuccess, (state, { stepMetadata }) => {
    const newState = deepCopy(state);

    const changedStep = newState.steps.find(step => step.id === stepMetadata.id);

    if (changedStep) {
      changedStep.title = stepMetadata.title;
      changedStep.subtitle = stepMetadata.subtitle;
    }

    return newState;
  }),
  on(StepEditorActions.createStepSuccess, (state, { stepMetadata }) => {
    const newState = deepCopy(state);

    newState.steps.push(stepMetadata);

    return newState;
  }),
  on(StepEditorActions.createStepFailed, (state, action) => ({
    ...state
  })),
  on(
    StepEditorActions.loadStepsByBookIdSuccess,
    StepEditorActions.loadStepsByUnitIdSuccess,
    (state, action) => {

      const newState: StepEditorState = {
        steps: []
      };
      const stepsById = new Map();

      state.steps.forEach(step => stepsById.set(step.id, step));
      action.stepsMetadata.forEach(step => stepsById.set(step.id, step));

      for (const step of stepsById.values()) {
        newState.steps.push(step);
      }

      return newState;
    }),
);
