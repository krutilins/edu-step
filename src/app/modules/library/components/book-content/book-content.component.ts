import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BookMetadata } from 'src/app/core/models/metadata/book-metadata.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { loadUnits } from 'src/app/core/store/actions/unit-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectUnitsByBookId } from 'src/app/core/store/selectors/unit-editor.selectors';

@Component({
  selector: 'app-book-content',
  templateUrl: './book-content.component.html',
  styleUrls: ['./book-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookContentComponent implements OnChanges {

  @Input()
  public bookMetadata: BookMetadata;

  public unitsMetadata$: Observable<UnitMetadata[]>;

  constructor(private store: Store<AppState>) { }

  public ngOnChanges(): void {
    if (this.bookMetadata) {
      this.store.dispatch(loadUnits({ bookId: this.bookMetadata.id }));
      this.unitsMetadata$ = this.store.select(selectUnitsByBookId, { bookId: this.bookMetadata.id });
    }
  }

}
