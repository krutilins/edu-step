import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { loadStepsByUnitId } from 'src/app/core/store/actions/step-editor.action';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectStepsByUnitId } from 'src/app/core/store/selectors/step-editor.selectors';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitComponent implements OnChanges {

  @Input()
  public unitMetadata: UnitMetadata;

  public stepsMetadata$: Observable<StepMetadata[]>;

  constructor(private store: Store<AppState>) { }

  public ngOnChanges(): void {
    if (this.unitMetadata) {
      this.store.dispatch(loadStepsByUnitId({ unitId: this.unitMetadata.id }));
      this.stepsMetadata$ = this.store.select(selectStepsByUnitId, { unitId: this.unitMetadata.id });
    }
  }

  public getLinkForUnit(): string {
    return `/dashboard/library/${this.unitMetadata.bookId}/unit/${this.unitMetadata.id}`;
  }
}
