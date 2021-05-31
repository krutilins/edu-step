import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (this.authService.isLoggedIn !== true) {
    //   this.router.navigate(['auth']);
    // }

    // if (this.authService.isLoggedIn && this.authService.userState$)

    return this.authService.userState$.pipe(
      map(userState => userState?.userMetadata),
      map(userMetadata => {
        if (userMetadata && userMetadata.emailVerified) {
          return true;
        } else if (userMetadata) {
          return this.router.createUrlTree(['/auth/verify-email']);
        } else {
          return this.router.createUrlTree(['/auth/sign-up']);
        }
      })
    )

    // return true;
  }
}
