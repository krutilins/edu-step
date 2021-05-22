import { createAction, props } from '@ngrx/store';
import { StepMetadata } from '../../models/metadata/step-metadata.model';
import { TextMetadata } from '../../models/metadata/text-metadata.model';

// LOAD STEP TEXT

export const loadStepText = createAction(
  '[Step Text] Load Step Text',
  props<{ stepMetadata: StepMetadata }>()
);

export const loadStepTextSuccess = createAction(
  '[Step Text] Load Step Text Success',
  props<{ textMetadata: TextMetadata }>()
);

export const loadStepTextFailed = createAction(
  '[Step Text] Load Step Text Failed',
  props<{ errorMessage: string }>()
);

// UPDATE STEP TEXT

export const updateStepText = createAction(
  '[Step Text] Update Step Text',
  props<{ id: string, title: string, subtitle: string, content: string[] }>()
);

export const updateStepTextSuccess = createAction(
  '[Step Text] Update Step Text Success',
  props<{ textMetadata: TextMetadata }>()
);

export const updateStepTextFailed = createAction(
  '[Step Text] Update Step Text Failed',
  props<{ errorMessage: string }>()
);

// DELETE STEP TEXT

export const deleteStepText = createAction(
  '[Step Text] Delete Step Text',
  props<{ id: string }>()
);

export const deleteStepTextSuccess = createAction(
  '[Step Text] Delete Step Text Success',
  props<{ textMetadata: TextMetadata }>()
);

export const deleteStepTextFailed = createAction(
  '[Step Text] Delete Step Text Failed',
  props<{ errorMessage: string }>()
);

