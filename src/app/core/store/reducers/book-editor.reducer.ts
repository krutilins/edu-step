import { createReducer, on } from '@ngrx/store';
import { BookEditorState } from '../models/book-editor-state.model';
import * as BookEditorActions from '../actions/book-editor.actions';
import { deepCopy } from '../../functions/deep-copy.function';
import { findChangedItem } from '../../functions/find-changed-item.function';

const initialState: BookEditorState = {
  books: []
};

export const bookEditorReducer = createReducer(
  initialState,
  on(BookEditorActions.loadBooks, (state, action) => {
    const newState = deepCopy(state);

    newState.books = action.booksMetadata;

    return newState;
  }),
  on(BookEditorActions.loadBooksFailed, (state, action) => ({
    ...state
  })),
  on(BookEditorActions.createBookSuccess, (state, action) => ({
    ...state,
    books: [...state.books, action.bookMetadata]
  })),
  on(BookEditorActions.createBookFailed, (state, action) => ({
    ...state
  })),
  on(BookEditorActions.deleteBookSuccess, (state, action) => ({
    ...state,
    books: state.books.filter(book => book.id !== action.bookMetadata.id)
  })),
  on(BookEditorActions.deleteBookFailed, (state, action) => ({
    ...state
  })),
  on(BookEditorActions.loadBookSuccess, (state, action) => {
    const newState = deepCopy(state);

    const changedBook = findChangedItem(newState.books, action.bookMetadata.id);

    if (!changedBook) {
      newState.books = [...newState.books, action.bookMetadata];
    }

    return newState;
  }),
  on(BookEditorActions.loadBookFailed, (state, action) => ({
    ...state
  })),
  on(BookEditorActions.updateBookHeadingSuccess, (state, actions) => {
    const newState = deepCopy(state);

    const bookMetadata = actions.bookMetadata;

    const changedBook = findChangedItem(newState.books, bookMetadata.id);

    if (changedBook) {
      changedBook.title = bookMetadata.title;
      changedBook.subtitle = bookMetadata.subtitle;
    }

    return newState;
  }),
  on(BookEditorActions.updateBookHeadingFailed, (state, action) => ({
    ...state
  })),
);

