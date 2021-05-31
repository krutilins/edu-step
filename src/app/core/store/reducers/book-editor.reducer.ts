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
  on(BookEditorActions.loadBooksByUserIdSuccess, (state, action) => {
    const newState = deepCopy(state);

    // action.booksMetadata.forEach(actionBook => {
    //   let changedBook = newState.books.find(book => book.id === actionBook.id);
    //   if (changedBook) {
    //     changedBook = actionBook;
    //   } else {
    //     newState.books.push(actionBook);
    //   }
    // });

    for (const actionBook of action.booksMetadata) {
      let exists = false;

      for (let book of newState.books) {
        if (book.id === actionBook.id) {
          exists = true;
          book = actionBook;
        }
      }

      if (!exists) {
        newState.books.push(actionBook);
      }
    }

    return newState;
  }),
  on(BookEditorActions.loadBooksByIdsSuccess, (state, action) => {
    const newState = deepCopy(state);


    for (const actionBook of action.booksMetadata) {
      let exists = false;

      for (let book of newState.books) {
        if (book.id === actionBook.id) {
          exists = true;
          book = actionBook;
        }
      }

      if (!exists) {
        newState.books.push(actionBook);
      }
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
  on(BookEditorActions.loadBookSuccess, (state, action) => {
    const newState = deepCopy(state);

    const changedBook = findChangedItem(newState.books, action.bookMetadata.id);

    if (!changedBook) {
      newState.books.push(action.bookMetadata);
    }

    return newState;
  }),
  on(BookEditorActions.updateBookSuccess, (state, actions) => {
    const newState = deepCopy(state);

    const bookMetadata = actions.bookMetadata;

    const changedBook = findChangedItem(newState.books, bookMetadata.id);

    if (changedBook) {
      changedBook.title = bookMetadata.title;
      changedBook.subtitle = bookMetadata.subtitle;
    }

    return newState;
  }),
  on(BookEditorActions.loadAllBooksSuccess, (state, action) => {
    const newState = deepCopy(state);


    for (const actionBook of action.booksMetadata) {
      let exists = false;

      for (let book of newState.books) {
        if (book.id === actionBook.id) {
          exists = true;
          book = actionBook;
        }
      }

      if (!exists) {
        newState.books.push(actionBook);
      }
    }

    return newState;
  })
);

