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

  public loadBooksByUserId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookEditorActions.loadBooksByUserId),
      mergeMap(action => this.bookEditorService.loadBooksByUserId(action.userId).pipe(
        map(booksMetadata => BookEditorActions.loadBooksByUserIdSuccess({ booksMetadata })),
        catchError(errorMessage => of(BookEditorActions.loadBooksByUserIdFailed({ errorMessage })))
      ))
    );
  });

  public loadBooksByIds = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookEditorActions.loadBooksByIds),
      mergeMap(action => this.bookEditorService.loadBooksByIds(action.ids).pipe(
        map(booksMetadata => BookEditorActions.loadBooksByIdsSuccess({ booksMetadata })),
        catchError(errorMessage => of(BookEditorActions.loadBooksByIdsFailed({ errorMessage })))
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
      ofType(BookEditorActions.updateBook),
      mergeMap(action => this.bookEditorService.updateBook(action.bookId, action.title, action.subtitle).pipe(
        map(bookMetadata => BookEditorActions.updateBookSuccess({ bookMetadata })),
        catchError(errorMessage => of(BookEditorActions.updateBookFailed({ errorMessage })))
      ))
    );
  });

  public loadAllBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookEditorActions.loadAllBooks),
      mergeMap(action => this.bookEditorService.loadAllBooks().pipe(
        map(booksMetadata => BookEditorActions.loadAllBooksSuccess({ booksMetadata })),
        catchError(errorMessage => of(BookEditorActions.loadAllBooksFailed({ errorMessage })))
      ))
    )
  })

  constructor(private actions$: Actions, private bookEditorService: BookEditorService) { }
}
