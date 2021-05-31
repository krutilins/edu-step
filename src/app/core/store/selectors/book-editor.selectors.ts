import { createSelector } from '@ngrx/store';
import { BookMetadata } from '../../models/metadata/book-metadata.model';
import { Library } from '../../models/metadata/library.model';
import { UserMetadata } from '../../models/metadata/user-metadata.model';
import { AppState } from '../models/app-state.model';
import { BookEditorState } from '../models/book-editor-state.model';

export const selectBookEditorState = (state: AppState): BookEditorState => state.bookEditor;

export const selectAllBooks = createSelector(
  selectBookEditorState,
  (bookEditorState: BookEditorState): BookMetadata[] => bookEditorState.books
);

export const selectEditableBooks = createSelector(
  selectBookEditorState,
  (
    booksState: BookEditorState,
    props: { userMetadata: UserMetadata }
  ) => booksState.books.filter(book => book.owner === props.userMetadata.id)
);

export const selectEnrollableBooks = createSelector(
  selectBookEditorState,
  (booksState: BookEditorState, props: { library: Library }) => booksState.books.filter(book => !(props.library.books.includes(book.id)))
);

export const selectBook = createSelector(
  selectBookEditorState,
  (booksState: BookEditorState, props: { id: string }): (BookMetadata | undefined) => booksState.books.find(book => book.id === props.id)
);

export const selectBooksByIds = createSelector(
  selectBookEditorState,
  (
    bookEditorState: BookEditorState,
    props: { ids: string[] }
  ): BookMetadata[] => bookEditorState.books.filter(book => props.ids.includes(book.id))
);
