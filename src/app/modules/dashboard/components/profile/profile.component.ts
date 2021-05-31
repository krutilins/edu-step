import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserMetadata } from 'src/app/core/models/metadata/user-metadata.model';
import { userSignOut } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  public isOpen = false;

  @Input()
  public profile$: Observable<UserMetadata>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.profile$ = this.store.select(selectUserMetadata);
  }

  public signOut(): void {
    this.store.dispatch(userSignOut());
    this.router.navigate(['/auth']);
  }

  public toggleProfile(): void {
    this.isOpen = !this.isOpen;
  }

  public getDefaultPhoto(): string {
    return 'https://sandstormit.com/wp-content/uploads/2018/09/incognito-2231825_960_720-1-300x300.png';
  }
}
