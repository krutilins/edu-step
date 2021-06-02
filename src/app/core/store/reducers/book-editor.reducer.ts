import { createReducer, on } from '@ngrx/store';
import { BookEditorState } from '../models/book-editor-state.model';
import * as BookEditorActions from '../actions/book-editor.actions';

const initialState: BookEditorState = {
  books: []
};

export const bookEditorReducer = createReducer(
  initialState,
  on(
    BookEditorActions.loadBooksByIdsSuccess,
    BookEditorActions.loadBooksByUserIdSuccess,
    BookEditorActions.loadAllBooksSuccess,
    (state, action) => {
      const newState: BookEditorState = {
        books: []
      };
      const booksById = new Map();

      state.books.forEach(book => booksById.set(book.id, book));
      action.booksMetadata.forEach(book => booksById.set(book.id, book));

      for (const book of booksById.values()) {
        newState.books.push(book);
      }

      return newState;
    }),
  on(BookEditorActions.createBookSuccess, (state, action) => ({
    ...state,
    books: [...state.books, action.bookMetadata]
  })),
  on(BookEditorActions.deleteBookSuccess, (state, action) => ({
    ...state,
    books: state.books.filter(book => book.id !== action.bookMetadata.id)
  })),
  on(
    BookEditorActions.loadBookSuccess,
    BookEditorActions.updateBookSuccess,
    (state, { bookMetadata }) => {
      const newState: BookEditorState = {
        books: []
      };

      const booksById = new Map();

      state.books.forEach(book => booksById.set(book.id, book));
      booksById.set(bookMetadata.id, bookMetadata);

      for (const book of booksById.values()) {
        newState.books.push(book);
      }

      return newState;
    })
);

