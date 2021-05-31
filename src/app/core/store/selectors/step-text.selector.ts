import { createSelector } from '@ngrx/store';
import { TextMetadata } from '../../models/metadata/text-metadata.model';
import { AppState } from '../models/app-state.model';
import { StepTextState } from '../models/step-text-state.model';

export const selectStepTexts = (state: AppState): StepTextState => state.stepText;

export const selectStepTextById = createSelector(
  selectStepTexts,
  (
    stepTextState: StepTextState,
    props: { id: string }
  ): TextMetadata | undefined => {
    return stepTextState.texts.find(text => text.id === props.id)}
);
