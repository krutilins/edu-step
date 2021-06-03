import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { v4 } from 'uuid';
import { BookMetadata } from '../models/metadata/book-metadata.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firestore: AngularFirestore, private uuidv4: v4) { }

  public createBook(bookMetadata: Omit<BookMetadata, 'id'>): Observable<BookMetadata> {
    const newBook: BookMetadata = {
      ...bookMetadata,
      id: this.uuidv4()
    };

    return from(
      this.firestore.collection<BookMetadata>(environment.firebaseEndpoints.books).doc(newBook.id).set(newBook).then(_ => newBook)
    );
  }

  public loadAllBooks(): Observable<BookMetadata[]> {
    return this.firestore.collection<BookMetadata>(environment.firebaseEndpoints.books).get().pipe(
      map(bookQuery => bookQuery.docs.map(bookData => bookData.data()))
    );
  }

  public loadBook(id: string): Observable<BookMetadata> {
    return this.firestore.collection<BookMetadata>(environment.firebaseEndpoints.books).doc(id).get().pipe(
      map(bookMetadataSnapshot => bookMetadataSnapshot.data())
    );
  }

  public loadBooksByUserId(userId: string): Observable<BookMetadata[]> {
    return this.firestore.collection<BookMetadata>(
      environment.firebaseEndpoints.books,
      (ref) => ref.where('owner', '==', userId)
    ).get().pipe(
      map(bookQuery => bookQuery.docs.map(bookData => bookData.data()))
    );
  }

  public loadBooksByIds(ids: string[]): Observable<BookMetadata[]> {
    if (ids.length === 0) {
      return of([]);
    }

    return this.firestore.collection<BookMetadata>(environment.firebaseEndpoints.books, ref => ref.where('id', 'in', ids)).get().pipe(
      map(bookMetadataQuery => bookMetadataQuery.docs.map(bookMetadataSnapshot => bookMetadataSnapshot.data()))
    );
  }

  public updateBook(bookMetadataUpdate: BookMetadata): Observable<BookMetadata> {
    const collectionRef = this.firestore.collection<BookMetadata>(environment.firebaseEndpoints.books);
    const documentRef = collectionRef.doc(bookMetadataUpdate.id);
    return from(documentRef.update(bookMetadataUpdate).then(_ => bookMetadataUpdate));
  }

  public deleteBook(id: string): Observable<BookMetadata> {
    return this.firestore.collection<BookMetadata>(environment.firebaseEndpoints.books).doc(id).get().pipe(
      mergeMap(bookSnapshot => from(bookSnapshot.ref.delete().then(() => bookSnapshot.data())))
    );
  }
}
