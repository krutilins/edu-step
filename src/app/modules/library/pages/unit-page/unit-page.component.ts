import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, skipWhile, tap } from 'rxjs/operators';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { loadBook } from 'src/app/core/store/actions/book-editor.actions';
import { loadUnit } from 'src/app/core/store/actions/unit-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectBook } from 'src/app/core/store/selectors/book-editor.selectors';
import { selectSidebarOpen } from 'src/app/core/store/selectors/sidebar.selectors';
import { selectUnitById } from 'src/app/core/store/selectors/unit-editor.selectors';

@Component({
  selector: 'app-unit-page',
  templateUrl: './unit-page.component.html',
  styleUrls: ['./unit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitPageComponent implements OnInit {
  public bookMetadata$: Observable<BookMetadata>;
  public unitMetadata$: Observable<UnitMetadata>
  public sidebar$: Observable<boolean>;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.bookMetadata$ = this.activatedRoute.paramMap.pipe(
      map(params => params.get('bookId')),
      skipWhile(id => !id),
      tap(bookId => this.store.dispatch(loadBook({ id: bookId }))),
      mergeMap(bookId => this.store.select(selectBook, { id: bookId })),
      skipWhile(book => !book)
    );

    this.unitMetadata$ = this.activatedRoute.paramMap.pipe(
      map(params => params.get('unitId')),
      skipWhile(id => !id),
      tap(unitId => this.store.dispatch(loadUnit({ id: unitId }))),
      mergeMap(unitId => this.store.select(selectUnitById, { id: unitId })),
      skipWhile(unit => !unit)
    );

    this.sidebar$ = this.store.select(selectSidebarOpen);
  }


}
