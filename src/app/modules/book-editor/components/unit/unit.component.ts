import { Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StepCreationDialogData } from 'src/app/core/models/components/step-creation-dialog-data.model';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { BlockType } from 'src/app/core/models/types/block-type.model';
import { createStep } from 'src/app/core/store/actions/step-editor.action';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectStepsByUnitId } from 'src/app/core/store/selectors/step-editor.selectors';
import { StepCreationDialogComponent } from '../step-creation-dialog/step-creation-dialog.component';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitComponent implements OnInit, OnDestroy {
  public steps: StepMetadata[] = [];

  @Input()
  public unit: UnitMetadata;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>, private changeDetectorRef: ChangeDetectorRef, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.store.select(selectStepsByUnitId, { unitId: this.unit.id }).pipe(
        map(steps => {
          this.steps = steps;
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

  public openStepCreationDialog(unitId: string, pos: number): void {
    this.dialog.open<StepCreationDialogComponent, StepCreationDialogData>(StepCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        id: '',
        title: '',
        subtitle: '',
        blockType: BlockType.Text,
        contentId: '',
        bookId: this.unit.bookId,
        unitId,
        passed: false,
        pos,
        type: createStep.type,
      }
    });
  }

}
