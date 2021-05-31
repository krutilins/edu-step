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
  on(StepEditorActions.updateStepHeadingSuccess, (state, { stepMetadata }) => {
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
  on(StepEditorActions.loadStepsByBookIdSuccess, (state, action) => {
    const newState = deepCopy(state);

    for (const actionStep of action.stepsMetadata) {
      let exists = false;

      for (let step of newState.steps) {
        if (step.id === actionStep.id) {
          exists = true;
          step = actionStep;
        }
      }

      if (!exists) {
        newState.steps.push(actionStep);
      }
    }

    return newState;
  }),
  on(StepEditorActions.loadStepsByUnitIdSuccess, (state, action) => {
    const newState = deepCopy(state);

    for (const actionStep of action.stepsMetadata) {
      let exists = false;

      for (let step of newState.steps) {
        if (step.id === actionStep.id) {
          exists = true;
          step = actionStep;
        }
      }

      if (!exists) {
        newState.steps.push(actionStep);
      }
    }

    return newState;
  }),
);
