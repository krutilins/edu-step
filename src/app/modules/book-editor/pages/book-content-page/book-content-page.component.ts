import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, mergeMap, skipWhile, tap } from 'rxjs/operators';
import { BookCreationDialogData } from 'src/app/core/models/components/book-creation-dialog-data.model';
import { UnitCreationDialogData } from 'src/app/core/models/components/unit-creation-dialog.model';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { loadBook, updateBook } from 'src/app/core/store/actions/book-editor.actions';
import { loadStepsByBookId } from 'src/app/core/store/actions/step-editor.action';
import { createUnit, loadUnits } from 'src/app/core/store/actions/unit-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectBook } from 'src/app/core/store/selectors/book-editor.selectors';
import { selectUnitsByBookId } from 'src/app/core/store/selectors/unit-editor.selectors';
import { UnitCreationDialogComponent } from 'src/app/modules/book-editor/creation-dialogs/unit-creation-dialog/unit-creation-dialog.component';
import { BookCreationDialogComponent } from '../../creation-dialogs/book-creation-dialog/book-creation-dialog.component';

@Component({
  selector: 'app-book-content-page',
  templateUrl: './book-content-page.component.html',
  styleUrls: ['./book-content-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookContentPageComponent implements OnInit, OnDestroy {

  public bookMetadata: BookMetadata;
  public units: UnitMetadata[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.pipe(
        map(params => params.bookId),
        tap(id => this.store.dispatch(loadBook({ id }))),
        tap(bookId => this.store.dispatch(loadUnits({ bookId }))),
        tap(bookId => this.store.dispatch(loadStepsByBookId({ bookId }))),
        skipWhile(id => !id),
        mergeMap(id => this.store.select(selectBook, { id })),
        skipWhile(book => !book),
        map(book => {
          this.bookMetadata = book;
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
        bookId: this.bookMetadata.id,
        type: createUnit.type,
        pos: this.units.length
      }
    });
  }

  public onUpdateHeading(): void {
    this.dialog.open<BookCreationDialogComponent, BookCreationDialogData>(BookCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        id: this.bookMetadata.id,
        owner: this.bookMetadata.owner,
        title: this.bookMetadata.title,
        subtitle: this.bookMetadata.subtitle,
        type: updateBook.type
      }
    });
  }

}

