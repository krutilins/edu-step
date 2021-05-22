import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { BookEditorService } from '../../services/book-editor.service';
import * as BookEditorActions from '../actions/book-editor.actions';

@Injectable({
  providedIn: 'root'
})
export class BookEditorEffects {

  public loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookEditorActions.loadBooksPreviews),
      mergeMap(action => this.bookEditorService.loadBooks(action.userId).pipe(
        map(booksMetadata => BookEditorActions.loadBooks({ booksMetadata })),
        catchError(errorMessage => of(BookEditorActions.loadBooksFailed({ errorMessage })))
      ))
    );
  });

  public createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookEditorActions.createBook),
      mergeMap(action => this.bookEditorService.createBook(action.title, action.subtitle, action.owner).pipe(
        map(bookMetadata => BookEditorActions.createBookSuccess({
          bookMetadata
        })),
        catchError(errorMessage => of(BookEditorActions.createBookFailed({ errorMessage })))
      ))
    );
  });

  public deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookEditorActions.deleteBook),
      mergeMap(action => this.bookEditorService.deleteBook(action.id).pipe(
        map(bookMetadata => BookEditorActions.deleteBookSuccess({ bookMetadata })),
        catchError(errorMessage => of(BookEditorActions.deleteBookFailed({ errorMessage })))
      ))
    );
  });

  public loadBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookEditorActions.loadBook),
      mergeMap(action => this.bookEditorService.loadBook(action.id).pipe(
        map(bookMetadata => BookEditorActions.loadBookSuccess({ bookMetadata })),
        catchError(errorMessage => of(BookEditorActions.loadBookFailed({ errorMessage })))
      ))
    );
  });

  public updateBookHeading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookEditorActions.updateBookHeading),
      mergeMap(action => this.bookEditorService.updateBook(action.bookId, action.title, action.subtitle).pipe(
        map(bookMetadata => BookEditorActions.updateBookHeadingSuccess({ bookMetadata })),
        catchError(errorMessage => of(BookEditorActions.updateBookHeadingFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private bookEditorService: BookEditorService) { }
}
