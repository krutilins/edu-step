import { createReducer, on } from '@ngrx/store';
import { UnitEditorState } from '../models/unit-editor-state.model';
import * as UnitEditorActions from '../actions/unit-editor.actions';
import { deepCopy } from '../../functions/deep-copy.function';

const initialState: UnitEditorState = {
  units: []
};

export const unitEditorReducer = createReducer(
  initialState,
  on(UnitEditorActions.updateUnitSuccess, (state, { unitMetadata }) => {
    const newState = deepCopy(state);

    const changedStep = newState.units.find(unit => unit.id === unitMetadata.id);

    if (changedStep) {
      changedStep.title = unitMetadata.title;
      changedStep.subtitle = unitMetadata.subtitle;
    }

    return newState;
  }),
  on(UnitEditorActions.createUnitSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.units = [...newState.units, action.unitMetadata].sort((a, b) => b.pos - a.pos);

    return newState;
  }),
  on(UnitEditorActions.deleteUnitSuccess, (state, { unitMetadata }) => {
    const newState = deepCopy(state);

    newState.units = newState.units.filter(unit => unit.id !== unitMetadata.id);

    return newState;
  }),
  on(UnitEditorActions.loadUnitSuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.units = [...newState.units.filter(unit => unit.id !== action.unitMetadata.id), action.unitMetadata];

    return newState;
  }),
  on(UnitEditorActions.loadUnitsSuccess, (state, action) => {

    const newState: UnitEditorState = {
      units: []
    };
    const unitsById = new Map();

    state.units.forEach(unit => unitsById.set(unit.id, unit));
    action.unitsMetadata.forEach(unit => unitsById.set(unit.id, unit));

    for (const unit of unitsById.values()) {
      newState.units.push(unit);
    }

    return newState;
  }),
);
