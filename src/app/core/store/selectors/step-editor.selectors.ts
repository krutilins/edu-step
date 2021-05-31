import { createSelector } from '@ngrx/store';
import { StepMetadata } from '../../models/metadata/step-metadata.model';
import { AppState } from '../models/app-state.model';
import { StepEditorState } from '../models/step-editor.model';

export const selectStepEditor = (state: AppState): StepEditorState => state.stepEditor;

export const selectStepById = createSelector(
  selectStepEditor,
  (
    stepEditorState: StepEditorState,
    props: { id: string }
  ): StepMetadata | undefined => stepEditorState.steps.find(step => step.id === props.id)
);

export const selectStepsByUnitId = createSelector(
  selectStepEditor,
  (
    stepEditorState: StepEditorState,
    props: { unitId: string }
  ): StepMetadata[] => stepEditorState.steps.filter(step => step.unitId === props.unitId).sort((a, b) => a.pos - b.pos)
);

export const selectStepsByBookId = createSelector(
  selectStepEditor,
  (
    stepEditorState: StepEditorState,
    props: { bookId: string }
  ): StepMetadata[] => stepEditorState.steps.filter(step => step.bookId === props.bookId).sort((a, b) => a.pos - b.pos)
);
