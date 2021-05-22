import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Observer, Subscription } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { BlockType } from 'src/app/core/models/types/block-type.model';
import { loadBook } from 'src/app/core/store/actions/book-editor.actions';
import { createStep, loadStepsByBookId } from 'src/app/core/store/actions/step-editor.action';
import { selectBook } from 'src/app/core/store/selectors/book-editor.selectors';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { createUnit, loadUnits } from 'src/app/core/store/actions/unit-editor.actions';
import { selectUnitsByBookId } from 'src/app/core/store/selectors/unit-editor.selectors';
import { UnitCreationDialogData } from 'src/app/core/models/components/unit-creation-dialog.model';
import { StepCreationDialogData } from 'src/app/core/models/components/step-creation-dialog-data.model';
import { StepCreationDialogComponent } from '../../components/step-creation-dialog/step-creation-dialog.component';
import { UnitCreationDialogComponent } from '../../components/unit-creation-dialog/unit-creation-dialog.component';
import { selectStepsByBookId } from 'src/app/core/store/selectors/step-editor.selectors';

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookContentComponent implements OnInit, OnDestroy {
  public book: BookMetadata | undefined;
  public units: UnitMetadata[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.pipe(
        map(params => params.bookId),
        tap(id => this.store.dispatch(loadBook({ id }))),
        tap(bookId => this.store.dispatch(loadUnits({ bookId }))),
        tap(bookId => this.store.dispatch(loadStepsByBookId({ bookId }))),
        mergeMap(id => this.store.select(selectBook, { id })),
        map(book => {
          this.book = book;
          this.changeDetectorRef.detectChanges();
        }),
      ).subscribe()
    );

    this.subscriptions.push(
      this.activatedRoute.params.pipe(
        map(params => params.bookId),
        mergeMap(bookId => this.store.select(selectUnitsByBookId, { bookId })),
        map(units => {
          this.units = units;
          this.changeDetectorRef.detectChanges();
        })
      ).subscribe()
    );


  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    });
  }

  public openUnitCreationDialog(): void {
    this.dialog.open<UnitCreationDialogComponent, UnitCreationDialogData>(UnitCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        id: '',
        title: '',
        subtitle: '',
        bookId: this.book.id,
        type: createUnit.type,
        pos: this.units.length
      }
    });
  }
}

