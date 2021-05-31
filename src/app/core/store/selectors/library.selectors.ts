import { createSelector } from '@ngrx/store';
import { Library } from '../../models/metadata/library.model';
import { AppState } from '../models/app-state.model';
import { LibraryState } from '../models/library-state.model';

export const selectLibraryState = (state: AppState): LibraryState => state.library;

export const selectLibrary = createSelector(
  selectLibraryState,
  (libraryState: LibraryState): Library => libraryState.library
);
