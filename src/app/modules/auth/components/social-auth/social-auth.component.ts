import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { userLoad } from 'src/app/core/store/actions/user.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialAuthComponent {

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  public signInGoogle(): void {
    this.authService.googleAuth().then(() => {
      this.store.dispatch(userLoad());
    });
  }
}
