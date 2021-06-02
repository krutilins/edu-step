import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookCreationDialogData } from 'src/app/core/models/components/book-creation-dialog-data.model';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { deleteBook, updateBook } from 'src/app/core/store/actions/book-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { BookCreationDialogComponent } from '../../creation-dialogs/book-creation-dialog/book-creation-dialog.component';

@Component({
  selector: 'app-book-editor-actions',
  templateUrl: './book-editor-actions.component.html',
  styleUrls: ['./book-editor-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookEditorActionsComponent {

  @Input()
  public bookMetadata: BookMetadata;

  constructor(private store: Store<AppState>, private router: Router, private dialog: MatDialog) { }

  public onDeleteBook(): void {
    this.store.dispatch(deleteBook({ id: this.bookMetadata.id }));
  }

  public onOpenBookInEditor(): void {
    this.router.navigate(['dashboard', 'editor', this.bookMetadata.id]);
  }

  public onUpdateBook(): void {
    this.dialog.open<BookCreationDialogComponent, BookCreationDialogData>(BookCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        ownerId: this.bookMetadata.ownerId,
        id: this.bookMetadata.id,
        subtitle: this.bookMetadata.subtitle,
        title: this.bookMetadata.title,
        dialogType: updateBook.type
      }
    });
  }

}
