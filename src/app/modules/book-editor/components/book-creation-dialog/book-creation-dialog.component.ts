import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ErrorMatcher } from 'src/app/core/classes/error-matcher.class';
import { BookCreationDialogData } from 'src/app/core/models/components/book-creation-dialog-data.model';
import { createBook, deleteBook, updateBookHeading } from 'src/app/core/store/actions/book-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-book-creation-dialog',
  templateUrl: './book-creation-dialog.component.html',
  styleUrls: ['./book-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCreationDialogComponent {

  public titleFormControl = new FormControl(this.data.title, [
    Validators.required,
  ]);

  public subtitleFormControl = new FormControl(this.data.subtitle, [
    Validators.required,
  ]);

  public errorMatcher = new ErrorMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookCreationDialogData,
    public dialogRef: MatDialogRef<BookCreationDialogComponent>,
    private store: Store<AppState>
  ) { }

  public handleModalAction(): void {
    if (this.data.type === createBook.type) {
      this.handleCreateBook();
    } else {
      this.handleUpdateBook();
    }
  }

  public handleCreateBook(): void {
    this.store.dispatch(createBook({
      owner: this.data.owner,
      title: this.data.title,
      subtitle: this.data.subtitle
    }));

    this.onClose();
  }

  public handleUpdateBook(): void {
    this.store.dispatch(updateBookHeading({
      bookId: this.data.id,
      title: this.data.title,
      subtitle: this.data.subtitle
    }));

    this.onClose();
  }

  public handleDeleteBook(): void {
    this.store.dispatch(deleteBook({
      id: this.data.id
    }));

    this.onClose();
  }

  public handleDisableSaveButton(): boolean {
    return this.data.title === '' || this.data.subtitle === '';
  }

  public handleDisableDeleteButton(): boolean {
    return this.data.type === createBook.type;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onInputChange(field: 'title' | 'subtitle', target: EventTarget | null): void {
    this.data[field] = (target as HTMLInputElement).value.trim();
  }
}
