import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../classes/file-upload.class';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  public pushFileToStorage(fileUpload: FileUpload, parentEndpoint: string, parentId: string): Observable<number> {
    const filePath = `${this.basePath}/${parentEndpoint}/${parentId}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload, parentEndpoint, parentId);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload, parentEndpoint: string, parentId: string): void {
    this.db.list(`${this.basePath}/${parentEndpoint}/${parentId}`).push(fileUpload);
  }

  public getFiles(parentEndpoint: string, parentId: string): AngularFireList<FileUpload> {
    return this.db.list(`${this.basePath}/${parentEndpoint}/${parentId}`, ref => ref.limitToLast(25));
  }

  public deleteFile(fileUpload: FileUpload, parentEndpoint: string, parentId: string): void {
    this.deleteFileDatabase(fileUpload.key, parentEndpoint, parentId)
      .then(() => {
        this.deleteFileStorage(fileUpload.name, parentEndpoint, parentId);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string, parentEndpoint: string, parentId: string): Promise<void> {
    return this.db.list(`${this.basePath}/${parentEndpoint}/${parentId}`).remove(key);
  }

  private deleteFileStorage(name: string, parentEndpoint: string, parentId: string): void {
    const storageRef = this.storage.ref(`${this.basePath}/${parentEndpoint}/${parentId}`);
    storageRef.child(name).delete();
  }
}
