import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectSidebarOpen } from 'src/app/core/store/selectors/sidebar.selectors';

@Component({
  selector: 'app-step-editor-page',
  templateUrl: './step-editor-page.component.html',
  styleUrls: ['./step-editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepEditorPageComponent {
  public open$ = this.store.select(selectSidebarOpen);

  constructor(private store: Store<AppState>, private router: Router) { }

  public goToBoardsList(): void {
    this.router.navigate(['/dashboard']);
  }
}
