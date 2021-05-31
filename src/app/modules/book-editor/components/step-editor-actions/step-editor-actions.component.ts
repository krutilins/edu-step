import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StepCreationDialogData } from 'src/app/core/models/components/step-creation-dialog-data.model';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';
import { deleteStep, updateStep } from 'src/app/core/store/actions/step-editor.action';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { StepCreationDialogComponent } from '../../creation-dialogs/step-creation-dialog/step-creation-dialog.component';

@Component({
  selector: 'app-step-editor-actions',
  templateUrl: './step-editor-actions.component.html',
  styleUrls: ['./step-editor-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepEditorActionsComponent {

  @Input()
  public stepMetadata: StepMetadata;

  constructor(private store: Store<AppState>, private dialog: MatDialog, private router: Router) { }

  public onDeleteStep(): void {
    this.store.dispatch(deleteStep({ id: this.stepMetadata.id }));
  }

  public onUpdateStep(): void {
    this.dialog.open<StepCreationDialogComponent, StepCreationDialogData>(StepCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        blockType: this.stepMetadata.blockType,
        bookId: this.stepMetadata.bookId,
        contentId: this.stepMetadata.contentId,
        id: this.stepMetadata.id,
        pos: this.stepMetadata.pos,
        subtitle: this.stepMetadata.subtitle,
        title: this.stepMetadata.title,
        type: updateStep.type,
        unitId: this.stepMetadata.unitId
      }
    });
  }

  public onOpenStepInEditor(): void {
    this.router.navigate(['dashboard', 'editor', this.stepMetadata.bookId, 'step', this.stepMetadata.id]);
  }


}
