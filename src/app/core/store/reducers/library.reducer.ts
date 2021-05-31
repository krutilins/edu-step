import { createReducer, on } from '@ngrx/store';
import { deepCopy } from '../../functions/deep-copy.function';
import { addBookToLibrarySuccess, deleteBookFromLibrarySuccess, loadLibrarySuccess } from '../actions/library.actions';
import { LibraryState } from '../models/library-state.model';

const initialState: LibraryState = {
  library: null
};

export const libraryReducer = createReducer(
  initialState,
  on(addBookToLibrarySuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.library = action.library;

    return newState;
  }),
  on(loadLibrarySuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.library = action.library;

    return newState;
  }),
  on(deleteBookFromLibrarySuccess, (state, action) => {
    const newState = deepCopy(state);

    newState.library = action.library;

    return newState;
  }),
);
