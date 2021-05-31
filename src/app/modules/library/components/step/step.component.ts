import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent {

  @Input()
  public stepMetadata: StepMetadata;

  public getLinkForStep(): string {
    return `/dashboard/library/${this.stepMetadata.bookId}/step/${this.stepMetadata.id}`;
  }

}
