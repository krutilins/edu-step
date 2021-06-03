import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, throwError } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { UnitMetadata } from '../models/metadata/unit-metadata.model';


@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private firestore: AngularFirestore, private uuidv4: v4) { }

  public createUnit(unitMetadata: Omit<UnitMetadata, 'id'>): Observable<UnitMetadata> {
    const newUnit: UnitMetadata = {
      ...unitMetadata,
      id: this.uuidv4(),
    };

    return from(
      this.firestore.collection<UnitMetadata>(environment.firebaseEndpoints.units).doc(newUnit.id).set(newUnit).then(_ => newUnit)
    );
  }

  public loadUnitById(id: string): Observable<UnitMetadata> {
    return this.firestore.collection<UnitMetadata>(environment.firebaseEndpoints.units).doc(id).get().pipe(
      map(unitSnapshot => unitSnapshot.data())
    );
  }

  public loadUnitsByBookId(bookId: string): Observable<UnitMetadata[]> {
    return this.firestore.collection<UnitMetadata>(
      environment.firebaseEndpoints.units,
      ref => ref.where('bookId', '==', bookId)
    ).get().pipe(
      map(unitsQuery => unitsQuery.docs.map(unitSnapshot => unitSnapshot.data()))
    );
  }

  public updateUnit(unitMetadataUpdate: UnitMetadata): Observable<UnitMetadata> {
    return this.firestore.collection<UnitMetadata>(environment.firebaseEndpoints.units).doc(unitMetadataUpdate.id).get().pipe(
      mergeMap(unitMetadataSnapshot => {
        if (unitMetadataSnapshot.exists) {
          return from(unitMetadataSnapshot.ref.update(unitMetadataUpdate).then(
            () => ({
              ...unitMetadataSnapshot.data(),
              ...unitMetadataUpdate
            })
          ));
        } else {
          return throwError('unit metadata does not exists');
        }
      })
    );
  }

  public deleteUnit(id: string): Observable<UnitMetadata> {
    return this.firestore.collection<UnitMetadata>(environment.firebaseEndpoints.units).doc(id).get().pipe(
      mergeMap(unitSnapshot => from(unitSnapshot.ref.delete().then(_ => unitSnapshot.data())))
    );
  }
}
