import { createAction, props } from '@ngrx/store';
import { Library } from '../../models/metadata/library.model';

// LOAD LIBRARY

export const loadLibrary = createAction(
  '[Library] Load Library',
  props<{ userId: string }>()
);

export const loadLibrarySuccess = createAction(
  '[Library] Load Library Success',
  props<{ library: Library }>()
);

export const loadLibraryFailed = createAction(
  '[Library] Load Library Failed',
  props<{ errorMessage: string }>()
);

// ADD BOOK TO LIBRARY

export const addBookToLibrary = createAction(
  '[Library] Add book to library',
  props<{ bookId: string, userId: string }>()
);

export const addBookToLibrarySuccess = createAction(
  '[Library] Add book to library success',
  props<{ library: Library }>()
);

export const addBookToLibraryFailed = createAction(
  '[Library] Add Book To Library Failed',
  props<{ errorMessage: string }>()
);

// DELETE BOOK TO LIBRARY

export const deleteBookFromLibrary = createAction(
  '[Library] Delete Book From Library',
  props<{ bookId: string, userId: string }>()
);

export const deleteBookFromLibrarySuccess = createAction(
  '[Library] Delete Book From Library Success',
  props<{ library: Library }>()
);
export const deleteBookFromLibraryFailed = createAction(
  '[Library] Delete Book From Library Failed',
  props<{ errorMessage: string }>()
);
