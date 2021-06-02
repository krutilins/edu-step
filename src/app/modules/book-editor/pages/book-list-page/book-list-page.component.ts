import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { BookCreationDialogData } from 'src/app/core/models/components/book-creation-dialog-data.model';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { UserMetadata } from 'src/app/core/models/metadata/user-metadata.model';
import { createBook, loadBooksByUserId } from 'src/app/core/store/actions/book-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectEditableBooks } from 'src/app/core/store/selectors/book-editor.selectors';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';
import { BookCreationDialogComponent } from '../../creation-dialogs/book-creation-dialog/book-creation-dialog.component';

@Component({
  selector: 'app-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListPageComponent implements OnInit {

  public booksMetadata$: Observable<BookMetadata[]>;
  public userMetadata: UserMetadata;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    public router: Router
  ) { }

  public ngOnInit(): void {

    this.booksMetadata$ = this.store.select(selectUserMetadata).pipe(
      tap(userMetadata => {
        if (userMetadata) {
          this.userMetadata = userMetadata;
          this.store.dispatch(
            loadBooksByUserId({ userId: userMetadata.id })
          );
        }
      }),
      mergeMap(userMetadata => this.store.select(selectEditableBooks, { userMetadata }))
    );
  }

  public getRedirectLink(book: BookMetadata): string {
    return `/dashboard/editor/${book.id}`;
  }

  public openBookCreationDialog(): void {
    this.dialog.open<BookCreationDialogComponent, BookCreationDialogData>(BookCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        ownerId: this.userMetadata.id,
        id: '',
        subtitle: '',
        title: '',
        dialogType: createBook.type
      }
    });
  }
}
