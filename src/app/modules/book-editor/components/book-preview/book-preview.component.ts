import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { deleteBook } from 'src/app/core/store/actions/book-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-book-preview',
  templateUrl: './book-preview.component.html',
  styleUrls: ['./book-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPreviewComponent {

  @Input()
  public book: BookMetadata;

  constructor(private store: Store<AppState>, private router: Router) { }

  public onDeleteBook(id: string): void {
    this.store.dispatch(deleteBook({ id }));
  }

  public openBookInEditor(id: string): void {
    this.router.navigate(['dashboard', 'editor', this.book.id]);
  }

}
