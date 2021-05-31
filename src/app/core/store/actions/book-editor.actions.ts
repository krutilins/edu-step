import { createAction, props } from '@ngrx/store';
import { BookMetadata } from '../../models/metadata/book-metadata.model';

// LOAD ALL BOOKS

export const loadAllBooks = createAction(
  '[Book Editor] Load All Books'
);

export const loadAllBooksSuccess = createAction(
  '[Book Editor API] Load All Books Success',
  props<{ booksMetadata: BookMetadata[] }>()
);

export const loadAllBooksFailed = createAction(
  '[Book Editor API] Load All Books Failed',
  props<{ errorMessage: string }>()
);

// LOAD BOOKS BY USER ID

export const loadBooksByUserId = createAction(
  '[Book Editor] Load Books By User Id',
  props<{ userId: string }>()
);

export const loadBooksByUserIdSuccess = createAction(
  '[Book Editor API] Load Books By User Id Success',
  props<{ booksMetadata: BookMetadata[] }>()
);

export const loadBooksByUserIdFailed = createAction(
  '[Book Editor API] Load Books By User Id Failed',
  props<{ errorMessage: string }>()
);

// LOAD BOOKS BY IDS

export const loadBooksByIds = createAction(
  '[Book Editor] Load Books By Ids',
  props<{ ids: string[] }>()
);

export const loadBooksByIdsSuccess = createAction(
  '[Book Editor API] Load Books By Ids Success',
  props<{ booksMetadata: BookMetadata[] }>()
);

export const loadBooksByIdsFailed = createAction(
  '[Book Editor API] Load Books By Ids Failed',
  props<{ errorMessage: string }>()
);

// CREATE BOOK

export const createBook = createAction(
  '[Book Editor] Create Book',
  props<{ owner: string, title: string, subtitle: string }>()
);

export const createBookSuccess = createAction(
  '[Book Editor API] Create Book Success',
  props<{ bookMetadata: BookMetadata }>()
);

export const createBookFailed = createAction(
  '[Book Editor API] Create Book Failed',
  props<{ errorMessage: string }>()
);

// DELETE BOOK

export const deleteBook = createAction(
  '[Book Editor] Delete Book',
  props<{ id: string }>()
);

export const deleteBookSuccess = createAction(
  '[Book Editor API] Delete Book Success',
  props<{ bookMetadata: BookMetadata }>()
);

export const deleteBookFailed = createAction(
  '[Book Editor API] Delete Book Failed',
  props<{ errorMessage: string }>()
);

// LOAD BOOK

export const loadBook = createAction(
  '[Book Editor] Load Book',
  props<{ id: string }>()
);

export const loadBookSuccess = createAction(
  '[Book Editor API] Load Book Success',
  props<{ bookMetadata: BookMetadata }>()
);

export const loadBookFailed = createAction(
  '[Book Editor API] Load Book Failed',
  props<{ errorMessage: string }>()
);

// UPDATE BOOK HEADING

export const updateBook = createAction(
  '[Book Editor] Update Book',
  props<{ bookId: string, title: string, subtitle: string }>()
);

export const updateBookSuccess = createAction(
  '[Book Editor API] Update Book Success',
  props<{ bookMetadata: BookMetadata }>()
);

export const updateBookFailed = createAction(
  '[Book Editor API] Update Book Failed',
  props<{ errorMessage: string }>()
);


