import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookCreationDialogData } from 'src/app/core/models/components/book-creation-dialog-data.model';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { updateBookHeading } from 'src/app/core/store/actions/book-editor.actions';
import { BookCreationDialogComponent } from '../book-creation-dialog/book-creation-dialog.component';

@Component({
  selector: 'app-book-heading-editor',
  templateUrl: './book-heading-editor.component.html',
  styleUrls: ['./book-heading-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookHeadingEditorComponent {

  @Input()
  public bookMetadata: BookMetadata | null;

  constructor(private dialog: MatDialog) { }

  public onUpdateHeading(): void {
    this.dialog.open<BookCreationDialogComponent, BookCreationDialogData>(BookCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        id: this.bookMetadata.id,
        owner: this.bookMetadata.owner,
        title: this.bookMetadata.title,
        subtitle: this.bookMetadata.subtitle,
        type: updateBookHeading.type
      }
    });
  }

}
