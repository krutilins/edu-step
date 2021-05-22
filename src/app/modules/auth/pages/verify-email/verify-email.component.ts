import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserMetadata } from 'src/app/core/models/metadata/user-metadata.model';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailComponent {

  public userMetadata: Observable<UserMetadata | null> = this.store.select(selectUserMetadata);

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
  ) { }

  public onSendVerificationEmail(): void {
    this.authService.sendVerificationMail();
  }
}
