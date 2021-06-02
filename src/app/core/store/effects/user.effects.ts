import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as UserActions from '../actions/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserEffects {

  public loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userLoad),
      mergeMap(() => this.authService.userMetadata$.pipe(
        map(userMetadata => {
          if (userMetadata) {
            return UserActions.userLoadSuccess({ userMetadata  });
          } else {
            return UserActions.userLoadFailed({ errorMessage: 'have no user' });
          }
        })
      ))
    );
  });

  public signOutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.userSignOut),
      mergeMap(() => of(this.authService.signOut()).pipe(
        map(() => UserActions.userSignOutSuccess())
      )),
      catchError(errorMessage => of(UserActions.userSignOutFailed({ errorMessage })))
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
}
