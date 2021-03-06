import { createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { UserState } from '../models/user-state.model';

export const selectUserState = (state: AppState): UserState => state.user;

export const selectUserMetadata = createSelector(
  selectUserState,
  (userState: UserState) => userState.userMetadata
);
