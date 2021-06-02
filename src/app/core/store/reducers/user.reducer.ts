import { createReducer, on } from '@ngrx/store';
import * as UserStateActions from '../actions/user.actions';
import { UserState } from '../models/user-state.model';

const initialState: UserState = {
  userMetadata: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserStateActions.userLoadSuccess, (state, { userMetadata }) => ({
    userMetadata
  })),
  on(UserStateActions.userSignInSuccess, (state, { userMetadata }) => ({
    userMetadata
  }))
);
