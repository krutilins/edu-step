import { createAction, props } from '@ngrx/store';
import { StepMetadata } from '../../models/metadata/step-metadata.model';

// LOAD STEPS BY BOOK ID

export const loadStepsByBookId = createAction(
  '[Step Editor] Load Steps By Book Id',
  props<{ bookId: string }>()
);

export const loadStepsByBookIdSuccess = createAction(
  '[Step Editor] Load Steps By Book Id Success',
  props<{ stepsMetadata: StepMetadata[] }>()
);

export const loadStepsByBookIdFailed = createAction(
  '[Step Editor] Load Steps By Book Id Failed',
  props<{ errorMessage: string }>()
);

// LOAD STEPS BY UNIT ID

export const loadStepsByUnitId = createAction(
  '[Step Editor] Load Steps By Unit Id',
  props<{ unitId: string }>()
);

export const loadStepsByUnitIdSuccess = createAction(
  '[Step Editor] Load Steps By Unit Id Success',
  props<{ stepsMetadata: StepMetadata[] }>()
);

export const loadStepsByUnitIdFailed = createAction(
  '[Step Editor] Load Steps By Unit Id Failed',
  props<{ errorMessage: string }>()
);


// loadStep

export const loadStep = createAction(
  '[Step Editor] Load Step',
  props<{ stepId: string }>()
);

export const loadStepSuccess = createAction(
  '[Step Editor] Load Step Success',
  props<{ stepMetadata: StepMetadata }>()
);

export const loadStepFailed = createAction(
  '[Step Editor] Load Step Failed',
  props<{ errorMessage: string }>()
);


// CREATE STEP

export const createStep = createAction(
  '[Book Editor] Create Step',
  props<{ unitId: string, title: string, subtitle: string, pos: number, blockType: string, bookId: string }>()
);

export const createStepSuccess = createAction(
  '[Book Editor API] Create Step Success',
  props<{ stepMetadata: StepMetadata }>()
);

export const createStepFailed = createAction(
  '[Book Editor API] Create Step Failed',
  props<{ errorMessage: string }>()
);

// UPDATE STEP HEADING

export const updateStep = createAction(
  '[Book Editor] Update Step',
  props<{ stepMetadataUpdate: StepMetadata }>()
);

export const updateStepSuccess = createAction(
  '[Book Editor API] Update Step Success',
  props<{ stepMetadata: StepMetadata }>()
);

export const updateStepFailed = createAction(
  '[Book Editor API] Update Step Failed',
  props<{ errorMessage: string }>()
);

// DELETE STEP

export const deleteStep = createAction(
  '[Book Editor] Delete Step',
  props<{ id: string }>()
);

export const deleteStepSuccess = createAction(
  '[Book Editor API] Delete Step Success',
  props<{ stepMetadata: StepMetadata }>()
);

export const deleteStepFailed = createAction(
  '[Book Editor API] Delete Step Failed',
  props<{ errorMessage: string }>()
);
