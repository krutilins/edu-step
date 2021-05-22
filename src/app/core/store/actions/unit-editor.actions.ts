import { createAction, props } from '@ngrx/store';
import { UnitMetadata } from '../../models/metadata/unit-metadata.model';

// LOAD UNITS

export const loadUnits = createAction(
  '[Unit] Load Units',
  props<{ bookId: string }>()
);

export const loadUnitsSuccess = createAction(
  '[Unit Api] Load Units Success',
  props<{ unitsMetadata: UnitMetadata[] }>()
);

export const loadUnitsFailed = createAction(
  '[Unit Api] Load Units Failed',
  props<{ errorMessage: string }>()
);

// LOAD UNIT

export const loadUnit = createAction(
  '[Unit] Load Unit',
  props<{ id: string }>()
);

export const loadUnitSuccess = createAction(
  '[Unit Api] Load Unit Success',
  props<{ unitMetadata: UnitMetadata }>()
);

export const loadUnitFailed = createAction(
  '[Unit Api] Load Unit Failed',
  props<{ errorMessage: string }>()
);

// CREATE UNIT

export const createUnit = createAction(
  '[Unit] Create Unit',
  props<{ bookId: string, title: string, subtitle: string, pos: number }>()
);

export const createUnitSuccess = createAction(
  '[Unit API] Create Unit Success',
  props<{ unitMetadata: UnitMetadata }>()
);

export const createUnitFailed = createAction(
  '[Unit API] Create Unit Failed',
  props<{ errorMessage: string }>()
);

// DELETE UNIT

export const deleteUnit = createAction(
  '[Unit] Delete Unit',
  props<{ id: string }>()
);

export const deleteUnitSuccess = createAction(
  '[Unit API] Delete Unit Success',
  props<{ unitMetadata: UnitMetadata }>()
);

export const deleteUnitFailed = createAction(
  '[Unit API] Delete Unit Failed',
  props<{ errorMessage: string }>()
);

// UPDATE UNIT HEADING

export const updateUnitHeading = createAction(
  '[Unit] Update Unit Heading',
  props<{ id: string, title: string, subtitle: string }>()
);

export const updateUnitHeadingSuccess = createAction(
  '[Unit API] Update Unit Heading Success',
  props<{ unitMetadata: UnitMetadata }>()
);

export const updateUnitHeadingFailed = createAction(
  '[Unit API] Update Unit Heading Failed',
  props<{ errorMessage: string }>()
);
