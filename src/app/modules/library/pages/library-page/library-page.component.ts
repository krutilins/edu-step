import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, skipWhile, take, tap } from 'rxjs/operators';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { loadBooksByIds } from 'src/app/core/store/actions/book-editor.actions';
import { loadLibrary } from 'src/app/core/store/actions/library.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectBooksByIds } from 'src/app/core/store/selectors/book-editor.selectors';
import { selectLibrary } from 'src/app/core/store/selectors/library.selectors';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryPageComponent implements OnInit {

  public booksMetadata$: Observable<BookMetadata[]>;

  constructor(
    private store: Store<AppState>,
  ) { }

  public ngOnInit(): void {

    this.booksMetadata$ = this.store.select(selectUserMetadata).pipe(
      map(userMetadata => {
        if (userMetadata) {
          this.store.dispatch(loadLibrary({ userId: userMetadata.id }));
        }
      }),
      mergeMap(() => this.store.select(selectLibrary)),
      tap(book => console.log(book)),
      map(library => {
        if (library) {
          this.store.dispatch(loadBooksByIds({ ids: library.books }));
          return library;
        } else {
          return null;
        }
      }),
      mergeMap(library => {
        if (library) {
          return this.store.select(selectBooksByIds, { ids: library.books })
        } else {
          return of([]);
        }
      }),
    );
  }

}
