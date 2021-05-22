import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';
import { deleteStep } from 'src/app/core/store/actions/step-editor.action';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-step-preview',
  templateUrl: './step-preview.component.html',
  styleUrls: ['./step-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepPreviewComponent {

  @Input()
  public step: StepMetadata;

  constructor(private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }

  public getLink(): string {
    return `/dashboard/editor/${this.step.bookId}/step/${this.step.id}`;
  }

  public onDeleteStep(): void {
    this.store.dispatch(deleteStep({ id: this.step.id }));
  }

  public openStepInEditor(): void {
    this.router.navigate(['step', this.step.id], { relativeTo: this.route });


    // this.dialog.open<StepCreationDialogComponent, StepCreationDialogData>(StepCreationDialogComponent, {
    //   width: '500px',
    //   minWidth: '300px',
    //   data: {
    //     id: this.step.id,
    //     unitId: this.step.unitId,
    //     title: this.step.title,
    //     subtitle: this.step.subtitle,
    //     type: updateStepHeading.type,
    //     pos: this.step.pos,
    //     blockType: this.step.blockType,
    //     passed: this.step.passed,
    //     contentId: this.step.content.id
    //   }
    // });
  }

}
