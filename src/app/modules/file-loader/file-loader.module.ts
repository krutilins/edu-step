import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFormComponent } from './components/upload-form/upload-form.component';
import { UploadListComponent } from './components/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/upload-details/upload-details.component';
import { FileLoaderComponent } from './components/file-loader/file-loader.component';



@NgModule({
  declarations: [
    UploadDetailsComponent,
    UploadFormComponent,
    UploadListComponent,
    FileLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UploadDetailsComponent,
    UploadFormComponent,
    UploadListComponent,
    FileLoaderComponent
  ]
})
export class FileLoaderModule { }
