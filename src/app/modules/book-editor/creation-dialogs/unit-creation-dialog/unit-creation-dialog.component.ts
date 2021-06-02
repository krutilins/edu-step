import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ErrorMatcher } from 'src/app/core/classes/error-matcher.class';
import { UnitCreationDialogData } from 'src/app/core/models/components/unit-creation-dialog.model';
import { createUnit, deleteUnit, updateUnit } from 'src/app/core/store/actions/unit-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-unit-creation-dialog',
  templateUrl: './unit-creation-dialog.component.html',
  styleUrls: ['./unit-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitCreationDialogComponent {

  public titleFormControl = new FormControl(this.data.title, [
    Validators.required,
  ]);

  public subtitleFormControl = new FormControl(this.data.subtitle, [
    Validators.required,
  ]);

  public errorMatcher = new ErrorMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UnitCreationDialogData,
    public dialogRef: MatDialogRef<UnitCreationDialogComponent>,
    private store: Store<AppState>
  ) { }

  public handleModalAction(): void {
    if (this.data.dialogType === createUnit.type) {
      this.handleCreateUnit();
    } else {
      this.handleUpdateUnit();
    }
  }

  public handleCreateUnit(): void {
    this.store.dispatch(createUnit({
      bookId: this.data.bookId,
      title: this.data.title,
      subtitle: this.data.subtitle,
      pos: this.data.pos
    }));

    this.onClose();
  }

  public handleUpdateUnit(): void {
    this.store.dispatch(updateUnit({
      unitMetadata: {
        id: this.data.id,
        title: this.data.title,
        subtitle: this.data.subtitle,
        bookId: this.data.bookId,
        pos: this.data.pos
      }
    }));

    this.onClose();
  }

  public handleDeleteUnit(): void {
    this.store.dispatch(deleteUnit({
      id: this.data.id
    }));

    this.onClose();
  }

  public handleDisableSaveButton(): boolean {
    return this.data.title === '' || this.data.subtitle === '';
  }

  public handleDisableDeleteButton(): boolean {
    return this.data.dialogType === createUnit.type;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onInputChange(field: 'title' | 'subtitle', target: EventTarget | null): void {
    this.data[field] = (target as HTMLInputElement).value.trim();
  }
}
