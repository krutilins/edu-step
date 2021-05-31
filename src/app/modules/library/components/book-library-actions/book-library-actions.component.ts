import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { deleteBookFromLibrary } from 'src/app/core/store/actions/library.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-book-library-actions',
  templateUrl: './book-library-actions.component.html',
  styleUrls: ['./book-library-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookLibraryActionsComponent {

  @Input()
  public bookMetadata: BookMetadata;

  constructor(private router: Router, private store: Store<AppState>) { }

  public onViewBook(): void {
    this.router.navigate(['dashboard', 'library', this.bookMetadata.id]);
  }

  public onDeleteBook(): void {
    this.store.select(selectUserMetadata).pipe(
      take(1)
    ).subscribe(userMetadata => {
      this.store.dispatch(deleteBookFromLibrary({ bookId: this.bookMetadata.id, userId: userMetadata.id }))
    });
  }

}
