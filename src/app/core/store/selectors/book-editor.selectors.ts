import { createSelector } from '@ngrx/store';
import { BookMetadata } from '../../models/metadata/book-metadata.model';
import { AppState } from '../models/app-state.model';
import { BookEditorState } from '../models/book-editor-state.model';

export const selectBookEditorState = (state: AppState): BookEditorState => state.bookEditor;

export const selectEditableBooks = createSelector(
  selectBookEditorState,
  (bookEditorState: BookEditorState): BookMetadata[] => bookEditorState.books
);

export const selectBook = createSelector(
  selectEditableBooks,
  (books: BookMetadata[], props: { id: string }): (BookMetadata | undefined) => books.find(book => book.id === props.id)
);
