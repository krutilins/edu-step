import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, skipWhile, tap } from 'rxjs/operators';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { loadBook } from 'src/app/core/store/actions/book-editor.actions';
import { selectBook } from 'src/app/core/store/selectors/book-editor.selectors';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookPageComponent implements OnInit {
  public bookMetadata$: Observable<BookMetadata>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
  ) { }

  public ngOnInit(): void {
    this.bookMetadata$ = this.activatedRoute.params.pipe(
      map(params => params.bookId),
      skipWhile(id => !id),
      tap(id => this.store.dispatch(loadBook({ id }))),
      mergeMap(id => this.store.select(selectBook, { id })),
      skipWhile(book => !book)
    );
  }

}

