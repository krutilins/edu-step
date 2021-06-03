import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { StepMetadata } from '../models/metadata/step-metadata.model';
import { TextMetadata } from '../models/metadata/text-metadata.model';
import { TextType } from '../models/types/text-type.model';

@Injectable({
  providedIn: 'root'
})
export class StepTextService {

  constructor(private firestore: AngularFirestore, private uuidv4: v4) { }

  public loadStepText(stepMetadata: StepMetadata): Observable<TextMetadata> {
    return this.firestore.collection<TextMetadata>(environment.firebaseEndpoints.text).doc(stepMetadata.contentId).get().pipe(
      mergeMap(textSnapshot => {
        if (!textSnapshot.exists) {
          const newText: TextMetadata = {
            id: stepMetadata.contentId,
            title: 'Title',
            subtitle: 'Description',
            content: '',
            type: TextType.Text
          };

          return from(
            this.firestore.collection<TextMetadata>(environment.firebaseEndpoints.text).doc(newText.id).set(newText).then(_ => newText)
          );
        } else {
          return of(textSnapshot.data());
        }
      })
    );
  }

  public updateStepText(textMetadata: TextMetadata): Observable<TextMetadata> {
    return this.firestore.collection<TextMetadata>(environment.firebaseEndpoints.text).doc(textMetadata.id).get().pipe(
      mergeMap(textMetadataSnapshot => {
        if (textMetadataSnapshot.exists) {
          return from(textMetadataSnapshot.ref.update(textMetadata).then(
            () => ({
              ...textMetadataSnapshot.data(),
              ...textMetadata
            })
          ));
        } else {
          return throwError('step text metadata does not exist');
        }
      })
    );
  }

  public deleteStepText(id: string): Observable<TextMetadata> {
    return this.firestore.collection<TextMetadata>(environment.firebaseEndpoints.text).doc(id).get().pipe(
      mergeMap(textSnapshot => from(textSnapshot.ref.delete().then(_ => textSnapshot.data())))
    );
  }
}
