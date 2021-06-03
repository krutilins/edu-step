import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { QuestionMetadata } from '../models/metadata/question-metadata.model';
import { QuizMetadata } from '../models/metadata/quiz-metadata.model';
import { StepMetadata } from '../models/metadata/step-metadata.model';
import { TextMetadata } from '../models/metadata/text-metadata.model';
import { BlockType } from '../models/types/block-type.model';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private firestore: AngularFirestore, private uuidv4: v4) { }

  public createStep(stepMetadata: Omit<StepMetadata, 'id' | 'contentId'>): Observable<StepMetadata> {
    const newStep: StepMetadata = {
      ...stepMetadata,
      id: this.uuidv4(),
      contentId: this.uuidv4(),
    };

    return from(
      this.firestore.collection<StepMetadata>(environment.firebaseEndpoints.steps).doc(newStep.id).set(newStep).then(_ => newStep)
    );
  }

  public loadStep(id: string): Observable<StepMetadata> {
    return this.firestore.collection<StepMetadata>(environment.firebaseEndpoints.steps).doc(id).get().pipe(
      map(stepSnapshot => {
        if (stepSnapshot.exists) {
          return stepSnapshot.data();
        } else {
          throwError('step does not exist');
        }
      })
    );
  }

  public loadStepsByUnitId(unitId: string): Observable<StepMetadata[]> {
    return this.firestore.collection<StepMetadata>(
      environment.firebaseEndpoints.steps,
      ref => ref.where('unitId', '==', unitId)
    ).get().pipe(
      map(stepsQuery => stepsQuery.docs.map(stepSnapshot => stepSnapshot.data()))
    );
  }

  public loadStepsByBookId(bookId: string): Observable<StepMetadata[]> {
    return this.firestore.collection<StepMetadata>(
      environment.firebaseEndpoints.steps,
      ref => ref.where('bookId', '==', bookId)
    ).get().pipe(
      map(stepsQuery => stepsQuery.docs.map(stepSnapshot => stepSnapshot.data()))
    );
  }

  public updateStep(stepMetadataUpdate: StepMetadata): Observable<StepMetadata> {
    const collectionRef = this.firestore.collection<StepMetadata>(environment.firebaseEndpoints.steps);
    return collectionRef.doc(stepMetadataUpdate.id).get().pipe(
      mergeMap(stepMetadataSnapshot => from(
        stepMetadataSnapshot.ref.update(stepMetadataUpdate).then(() => stepMetadataUpdate)
      ))
    );
  }

  public deleteStep(id: string): Observable<StepMetadata> { // TODO: split into two functions
    return this.firestore.collection<StepMetadata>(environment.firebaseEndpoints.steps).doc(id).get().pipe(
      mergeMap(stepSnapshot => {

        if (stepSnapshot.data().blockType === BlockType.Text) { // TODO: should I remove step content deleting
          this.firestore.collection<TextMetadata>(environment.firebaseEndpoints.text).doc(stepSnapshot.data().contentId).delete();

        } else {
          this.firestore.collection<QuizMetadata>(environment.firebaseEndpoints.quiz).doc(stepSnapshot.data().contentId).get().pipe(
            mergeMap(quizSnpashot => {

              return this.firestore.collection<QuestionMetadata>(
                environment.firebaseEndpoints.questions,
                ref => ref.where('quizId', '==', quizSnpashot.data().id)
              ).get().pipe(
                map(questionQuery => questionQuery.docs.map(questionSnapshot => questionSnapshot.ref.delete()))
              );
            })
          );
        }

        return from(stepSnapshot.ref.delete().then(_ => stepSnapshot.data()));
      })
    );
  }

}
