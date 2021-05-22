import { createAction, props } from '@ngrx/store';
import { BookMetadata } from '../../models/metadata/book-metadata.model';

// LOAD BOOKS

export const loadBooksPreviews = createAction(
  '[Book Editor] Load Books Preview',
  props<{ userId: string }>()
);

export const loadBooks = createAction(
  '[Book Editor API] Load Books Preview Success',
  props<{ booksMetadata: BookMetadata[] }>()
);

export const loadBooksFailed = createAction(
  '[Book Editor API] Load Books Preview Failed',
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

export const updateBookHeading = createAction(
  '[Book Editor] Update Book Heading',
  props<{ bookId: string, title: string, subtitle: string }>()
);

export const updateBookHeadingSuccess = createAction(
  '[Book Editor API] Update Book Heading Success',
  props<{ bookMetadata: BookMetadata }>()
);

export const updateBookHeadingFailed = createAction(
  '[Book Editor API] Update Book Heading Failed',
  props<{ errorMessage: string }>()
);


