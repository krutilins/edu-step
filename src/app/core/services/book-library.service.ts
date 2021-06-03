import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { deepCopy } from '../functions/deep-copy.function';
import { Library } from '../models/metadata/library.model';

@Injectable({
  providedIn: 'root'
})
export class BookLibraryService {

  constructor(private firestore: AngularFirestore, private uuidv4: v4) { }

  public addBookToLibrary(bookId: string, userId: string): Observable<Library> {
    return from(
      this.firestore.collection<Library>(environment.firebaseEndpoints.library).doc(userId).get().pipe(
        mergeMap(librarySnapshot => {
          if (librarySnapshot.exists) {
            const newLibrary: Library = deepCopy(librarySnapshot.data());
            newLibrary.books.push(bookId);

            return from(
              this.firestore.collection<Library>(environment.firebaseEndpoints.library).doc(userId).set(newLibrary).then(_ => newLibrary)
            );

          } else {
            const newLibrary: Library = {
              books: [bookId],
              id: this.uuidv4(),
              userId
            };

            return from(
              this.firestore.collection<Library>(environment.firebaseEndpoints.library).doc(userId).set(newLibrary).then(_ => newLibrary)
            );
          }
        })
      )
    );
  }

  public deleteBookFromLibrary(bookId: string, userId: string): Observable<Library> {
    return from(
      this.firestore.collection<Library>(environment.firebaseEndpoints.library).doc(userId).get().pipe(
        mergeMap(librarySnapshot => {
          if (librarySnapshot.exists) {
            const newLibrary: Library = librarySnapshot.data();
            newLibrary.books = newLibrary.books.filter(id => id !== bookId);

            return from(
              this.firestore.collection<Library>(environment.firebaseEndpoints.library).doc(userId).set(newLibrary).then(_ => newLibrary)
            );

          } else {
            const newLibrary: Library = {
              books: [],
              id: this.uuidv4(),
              userId
            };

            return from(
              this.firestore.collection<Library>(environment.firebaseEndpoints.library).doc(userId).set(newLibrary).then(_ => newLibrary)
            );
          }
        })
      )
    );
  }

  public loadLibrary(userId: string): Observable<Library> {
    return this.firestore.collection<Library>(environment.firebaseEndpoints.library).doc(userId).get().pipe(
      map(librarySnapshot => {
        if (librarySnapshot.exists) {
          return librarySnapshot.data();
        } else {
          const newLibrary: Library = { // TODO: can I get rid of it
            books: [],
            id: userId,
            userId
          };
          librarySnapshot.ref.set(newLibrary);
          return newLibrary;
        }
      })
    );
  }
}
