import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BookEditorService } from '../../services/book-editor.service';
import * as LibraryActions from '../actions/library.actions';

@Injectable({
  providedIn: 'root'
})
export class LibraryEffects {

  public loadLibrary$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LibraryActions.loadLibrary),
      mergeMap(action => this.bookEditorService.loadLibrary(action.userId).pipe(
        map(liblary => LibraryActions.loadLibrarySuccess({ library: liblary })),
        catchError(errorMessage => of(LibraryActions.loadLibraryFailed({ errorMessage })))
      ))
    );
  });

  public addBookToLibrary$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LibraryActions.addBookToLibrary),
      mergeMap(action => this.bookEditorService.addBookToLibrary(action.bookId, action.userId).pipe(
        map(library => LibraryActions.addBookToLibrarySuccess({ library })),
        catchError(errorMessage => of(LibraryActions.addBookToLibraryFailed({ errorMessage })))
      ))
    );
  });

  public deleteBookFromLibrary = createEffect(() => {
    return this.actions$.pipe(
      ofType(LibraryActions.deleteBookFromLibrary),
      mergeMap(action => this.bookEditorService.deleteBookFromLibrary(action.bookId, action.userId).pipe(
        map(library => LibraryActions.deleteBookFromLibrarySuccess({ library })),
        catchError(errorMessage => of(LibraryActions.deleteBookFromLibraryFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private bookEditorService: BookEditorService) { }
}
