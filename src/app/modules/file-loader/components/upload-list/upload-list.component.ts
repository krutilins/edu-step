import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadListComponent implements OnChanges {
  @Input()
  public unitMetadata: UnitMetadata;

  @Input()
  public changeable = true;

  public fileUploads$: Observable<any[]>;

  constructor(private uploadService: FileUploadService) { }

  public ngOnChanges(): void {
    if (this.unitMetadata) {
      this.fileUploads$ = this.uploadService.getFiles('units', this.unitMetadata.id).snapshotChanges().pipe(
        map(changes =>
          // store the key
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
    }
  }
}
