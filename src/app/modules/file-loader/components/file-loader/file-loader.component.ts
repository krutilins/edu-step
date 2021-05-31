import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileLoaderComponent {

  @Input()
  public unitMetadata: UnitMetadata;

}
