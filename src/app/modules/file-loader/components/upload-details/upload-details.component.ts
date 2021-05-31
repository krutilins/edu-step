import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FileUpload } from 'src/app/core/classes/file-upload.class';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UploadDetailsComponent {
  @Input()
  public fileUpload: FileUpload;

  @Input()
  public deletable: true;

  @Input()
  public unitMetadata: UnitMetadata;

  constructor(private uploadService: FileUploadService) { }

  public deleteFileUpload(fileUpload): void {
    this.uploadService.deleteFile(fileUpload, 'units', this.unitMetadata.id);
  }
}
