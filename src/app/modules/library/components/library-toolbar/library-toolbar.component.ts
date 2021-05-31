import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleSidebar } from 'src/app/core/store/actions/sidebar.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-library-toolbar',
  templateUrl: './library-toolbar.component.html',
  styleUrls: ['./library-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryToolbarComponent {

  constructor(private store: Store<AppState>) { }

  public onToggleSidebar(): void {
    this.store.dispatch(toggleSidebar());
  }

}
