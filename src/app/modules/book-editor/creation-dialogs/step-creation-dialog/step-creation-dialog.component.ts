import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Store } from '@ngrx/store';
import { ErrorMatcher } from 'src/app/core/classes/error-matcher.class';
import { StepCreationDialogData } from 'src/app/core/models/components/step-creation-dialog-data.model';
import { BlockType } from 'src/app/core/models/types/block-type.model';
import { createStep, deleteStep, updateStep } from 'src/app/core/store/actions/step-editor.action';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-step-creation-dialog',
  templateUrl: './step-creation-dialog.component.html',
  styleUrls: ['./step-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepCreationDialogComponent {

  public blockType = BlockType;


  public titleFormControl = new FormControl(this.data.title, [
    Validators.required,
  ]);

  public subtitleFormControl = new FormControl(this.data.subtitle, [
    Validators.required,
  ]);

  public stepTypeControl = new FormControl(this.data.type, [
    Validators.required
  ]);

  public errorMatcher = new ErrorMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: StepCreationDialogData,
    public dialogRef: MatDialogRef<StepCreationDialogComponent>,
    private store: Store<AppState>
  ) { }

  public handleModalAction(): void {
    if (this.data.type === createStep.type) {
      this.handleCreateStep();
    } else {
      this.handleUpdateStep();
    }
  }

  public handleCreateStep(): void {
    this.store.dispatch(createStep({
      unitId: this.data.unitId,
      title: this.data.title,
      subtitle: this.data.subtitle,
      blockType: this.data.blockType,
      pos: this.data.pos,
      bookId: this.data.bookId
    }));

    this.onClose();
  }

  public handleUpdateStep(): void {
    this.store.dispatch(updateStep({
      id: this.data.id,
      title: this.data.title,
      subtitle: this.data.subtitle
    }));

    this.onClose();
  }

  public handleDeleteStep(): void {
    this.store.dispatch(deleteStep({
      id: this.data.id
    }));

    this.onClose();
  }

  public handleDisableSaveButton(): boolean {
    return this.data.title === '' || this.data.subtitle === '';
  }

  public handleDisableDeleteButton(): boolean {
    return this.data.type === createStep.type;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onInputChange(field: 'title' | 'subtitle', target: EventTarget | null): void {
    this.data[field] = (target as HTMLInputElement).value.trim();
  }

  public onTypeChange(event$: MatRadioChange): void {
    this.data.blockType = event$.value;
  }

}
