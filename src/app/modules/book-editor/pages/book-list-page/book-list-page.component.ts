import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BookCreationDialogData } from 'src/app/core/models/components/book-creation-dialog-data.model';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { UserMetadata } from 'src/app/core/models/metadata/user-metadata.model';
import { createBook, loadBooksPreviews } from 'src/app/core/store/actions/book-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectEditableBooks } from 'src/app/core/store/selectors/book-editor.selectors';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';
import { BookCreationDialogComponent } from '../../components/book-creation-dialog/book-creation-dialog.component';

@Component({
  selector: 'app-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListPageComponent implements OnInit, OnDestroy {

  public books$: Observable<BookMetadata[]>;
  public userMetadata: UserMetadata;
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    public router: Router
  ) { }

  public ngOnInit(): void {

    this.subscriptions.push(
      this.store.select(selectUserMetadata).pipe(
        tap(userMetadata => {
          if (userMetadata) {
            this.userMetadata = userMetadata;
            this.store.dispatch(
              loadBooksPreviews({ userId: userMetadata.id })
            );
          }
        })
      ).subscribe()
    );

    this.books$ = this.store.select(selectEditableBooks);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    });
  }

  public openBookCreationDialog(): void {
    this.dialog.open<BookCreationDialogComponent, BookCreationDialogData>(BookCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        owner: this.userMetadata.id,
        id: '',
        subtitle: '',
        title: '',
        type: createBook.type
      }
    });
  }
}
