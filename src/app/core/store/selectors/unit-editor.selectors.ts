import { createSelector } from '@ngrx/store';
import { UnitMetadata } from '../../models/metadata/unit-metadata.model';
import { AppState } from '../models/app-state.model';
import { UnitEditorState } from '../models/unit-editor-state.model';

export const selectUnitEditor = (state: AppState): UnitEditorState => state.unitEditor;

export const selectUnitpById = createSelector(
  selectUnitEditor,
  (
    unitEditorState: UnitEditorState,
    props: { id: string }
  ): UnitMetadata | undefined => unitEditorState.units.find(unit => unit.id === props.id)
);

export const selectUnitsByBookId = createSelector(
  selectUnitEditor,
  (
    unitEditorState: UnitEditorState,
    props: { bookId: string }
  ): UnitMetadata[] => unitEditorState.units.filter(unit => unit.bookId === props.bookId)
);
