import { Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { StepCreationDialogData } from 'src/app/core/models/components/step-creation-dialog-data.model';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { BlockType } from 'src/app/core/models/types/block-type.model';
import { createStep } from 'src/app/core/store/actions/step-editor.action';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectStepsByUnitId } from 'src/app/core/store/selectors/step-editor.selectors';
import { StepCreationDialogComponent } from 'src/app/modules/book-editor/creation-dialogs/step-creation-dialog/step-creation-dialog.component';

@Component({
  selector: 'app-unit-editor',
  templateUrl: './unit-editor.component.html',
  styleUrls: ['./unit-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitEditorComponent implements OnInit {

  @Input()
  public unitMetadata: UnitMetadata;

  public steps$: Observable<StepMetadata[]>;

  private length: number;

  constructor(private store: Store<AppState>, private dialog: MatDialog) { }

  public ngOnInit(): void {
    this.steps$ = this.store.select(selectStepsByUnitId, { unitId: this.unitMetadata.id }).pipe(
      tap(steps => this.length = steps.length)
    );
  }

  public openStepCreationDialog(unitId: string): void {
    this.dialog.open<StepCreationDialogComponent, StepCreationDialogData>(StepCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        blockType: BlockType.Text,
        bookId: this.unitMetadata.bookId,
        contentId: '',
        id: '',
        pos: this.length,
        subtitle: '',
        title: '',
        type: createStep.type,
        unitId: this.unitMetadata.id
      }
    });
  }

}

