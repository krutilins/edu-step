import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from 'src/app/core/store/actions/sidebar.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-step-editor-toolbar',
  templateUrl: './step-editor-toolbar.component.html',
  styleUrls: ['./step-editor-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepEditorToolbarComponent {
  constructor(private store: Store<AppState>) { }

  public onToggleSidebar(): void {
    this.store.dispatch(toggleSidebar());
  }
}
