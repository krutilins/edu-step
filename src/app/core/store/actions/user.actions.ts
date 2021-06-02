import { createAction, props } from '@ngrx/store';
import { UserMetadata } from '../../models/metadata/user-metadata.model';

export const userLoad = createAction(
  '[User] User Load'
);

export const userLoadSuccess = createAction(
  '[User API] User Load Success',
  props<{ userMetadata: UserMetadata }>()
);

export const userLoadFailed = createAction(
  '[User APi] User Load Failed',
  props<{ errorMessage: string }>()
);

export const userSignInSuccess = createAction(
  '[User API] User Sign In Success',
  props<{ userMetadata: UserMetadata }>()
);

export const userSignInFailed = createAction(
  '[User API] User Sign In Failed',
  props<{ errorMessage: string }>()
);

export const userSignOut = createAction(
  '[User] User Sign Out'
);

export const userSignOutSuccess = createAction(
  '[User] User Sign Out Success'
);

export const userSignOutFailed = createAction(
  '[User] User Sign Out Failed',
  props<{ errorMessage: string }>()
);
