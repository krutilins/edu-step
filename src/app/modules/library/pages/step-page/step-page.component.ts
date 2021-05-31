import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, skipWhile, tap } from 'rxjs/operators';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';
import { loadBook } from 'src/app/core/store/actions/book-editor.actions';
import { loadStep } from 'src/app/core/store/actions/step-editor.action';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectBook } from 'src/app/core/store/selectors/book-editor.selectors';
import { selectSidebarOpen } from 'src/app/core/store/selectors/sidebar.selectors';
import { selectStepById } from 'src/app/core/store/selectors/step-editor.selectors';


@Component({
  selector: 'app-step-page',
  templateUrl: './step-page.component.html',
  styleUrls: ['./step-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepPageComponent implements OnInit {

  public bookMetadata$: Observable<BookMetadata>;
  public stepMetadata$: Observable<StepMetadata>;
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

    this.stepMetadata$ = this.activatedRoute.paramMap.pipe(
      map(params => params.get('stepId')),
      skipWhile(stepId => !stepId),
      tap(stepId => this.store.dispatch(loadStep({ stepId }))),
      mergeMap(stepId => this.store.select(selectStepById, { id: stepId })),
      skipWhile(step => !step)
    );

    this.sidebar$ = this.store.select(selectSidebarOpen);
  }

}
