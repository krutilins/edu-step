import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UnitCreationDialogData } from 'src/app/core/models/components/unit-creation-dialog.model';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { deleteUnit, updateUnit } from 'src/app/core/store/actions/unit-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { UnitCreationDialogComponent } from 'src/app/modules/book-editor/creation-dialogs/unit-creation-dialog/unit-creation-dialog.component';

@Component({
  selector: 'app-unit-editor-actions',
  templateUrl: './unit-editor-actions.component.html',
  styleUrls: ['./unit-editor-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitEditorActionsComponent {

  @Input()
  public unitMetadata: UnitMetadata;

  constructor(private store: Store<AppState>, private dialog: MatDialog, public router: Router) { }

  public onDeleteUnit(): void {
    this.store.dispatch(deleteUnit({ id: this.unitMetadata.id }));
  }

  public onUpdateUnit(): void {
    this.dialog.open<UnitCreationDialogComponent, UnitCreationDialogData>(UnitCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        id: this.unitMetadata.id,
        bookId: this.unitMetadata.bookId,
        title: this.unitMetadata.title,
        subtitle: this.unitMetadata.subtitle,
        dialogType: updateUnit.type,
        pos: this.unitMetadata.pos
      }
    });
  }

  public onOpenUnitInEditor(): void {
    this.router.navigate(['dashboard', 'editor', this.unitMetadata.bookId, 'unit', this.unitMetadata.id]);
  }

}
