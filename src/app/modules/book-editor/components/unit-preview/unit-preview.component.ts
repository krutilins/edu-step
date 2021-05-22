import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UnitCreationDialogData } from 'src/app/core/models/components/unit-creation-dialog.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { deleteUnit, updateUnitHeading } from 'src/app/core/store/actions/unit-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { UnitCreationDialogComponent } from '../unit-creation-dialog/unit-creation-dialog.component';

@Component({
  selector: 'app-unit-preview',
  templateUrl: './unit-preview.component.html',
  styleUrls: ['./unit-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitPreviewComponent {

  @Input()
  public unit: UnitMetadata;

  constructor(private store: Store<AppState>, private dialog: MatDialog) { }

  public onDeleteUnit(): void {
    this.store.dispatch(deleteUnit({ id: this.unit.id }));
  }

  public openUnitInEditor(): void {
    this.dialog.open<UnitCreationDialogComponent, UnitCreationDialogData>(UnitCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        id: this.unit.id,
        bookId: this.unit.bookId,
        title: this.unit.title,
        subtitle: this.unit.subtitle,
        type: updateUnitHeading.type,
        pos: this.unit.pos
      }
    });
  }

}
