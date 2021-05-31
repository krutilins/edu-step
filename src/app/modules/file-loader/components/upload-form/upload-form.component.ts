import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FileUpload } from 'src/app/core/classes/file-upload.class';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UploadFormComponent implements OnInit {

  @Input()
  public unitMetadata: UnitMetadata;

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  constructor(private uploadService: FileUploadService, private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
  }

  public selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  public upload(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, 'units', this.unitMetadata.id).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        this.changeDetectorRef.detectChanges();

      },
      error => {
        console.log(error);
      }
    );
  }
}
