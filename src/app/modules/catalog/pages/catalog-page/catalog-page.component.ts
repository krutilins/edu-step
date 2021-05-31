import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { map, mergeMap, skipWhile, take, tap } from 'rxjs/operators';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { loadAllBooks, loadBooksByUserId } from 'src/app/core/store/actions/book-editor.actions';
import { loadLibrary } from 'src/app/core/store/actions/library.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectAllBooks, selectEnrollableBooks } from 'src/app/core/store/selectors/book-editor.selectors';
import { selectLibrary } from 'src/app/core/store/selectors/library.selectors';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogPageComponent implements OnInit {

  public booksMetadata$: Observable<BookMetadata[]>;

  constructor(
    private store: Store<AppState>,
  ) { }

  public ngOnInit(): void {

    this.store.select(selectUserMetadata).pipe(
      take(1),
      map(userMetadata => {
        if (userMetadata) {
          this.store.dispatch(loadLibrary({ userId: userMetadata.id }));
          this.store.dispatch(loadAllBooks());
        }
      })
    ).subscribe();

    this.booksMetadata$ = this.store.select(selectLibrary).pipe(
      mergeMap(library => {
        if (library) {
          return this.store.select(selectEnrollableBooks, { library });
        } else {
          return of([]);
        }
      }),
    );


  }

}
