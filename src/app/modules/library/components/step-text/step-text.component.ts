import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TextMetadata } from 'src/app/core/models/metadata/text-metadata.model';
import { TextType } from 'src/app/core/models/types/text-type.model';

@Component({
  selector: 'app-step-text',
  templateUrl: './step-text.component.html',
  styleUrls: ['./step-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTextComponent {

  @Input()
  public textMetadata: TextMetadata;

  public TextType = TextType;

}
