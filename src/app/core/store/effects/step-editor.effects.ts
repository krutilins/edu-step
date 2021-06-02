import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BookEditorService } from '../../services/book-editor.service';
import * as StepEditorActions from '../actions/step-editor.action';

@Injectable({
  providedIn: 'root'
})
export class StepEditorEffects {

  public loadStepsByBookId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.loadStepsByBookId),
      mergeMap(action => this.bookEditorService.loadStepsByBookId(action.bookId).pipe(
        map(stepsMetadata => StepEditorActions.loadStepsByBookIdSuccess({ stepsMetadata })),
        catchError(errorMessage => of(StepEditorActions.loadStepsByBookIdFailed({ errorMessage })))
      ))
    );
  });

  public loadStepsByUnitId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.loadStepsByUnitId),
      mergeMap(action => this.bookEditorService.loadStepsByUnitId(action.unitId).pipe(
        map(stepsMetadata => StepEditorActions.loadStepsByUnitIdSuccess({ stepsMetadata })),
        catchError(errorMessage => of(StepEditorActions.loadStepsByUnitIdFailed({ errorMessage })))
      ))
    );
  });

  public loadStep$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.loadStep),
      mergeMap(action => this.bookEditorService.loadStep(action.stepId).pipe(
        map(stepMetadata => StepEditorActions.loadStepSuccess({ stepMetadata })),
        catchError(errorMessage => of(StepEditorActions.loadStepFailed({ errorMessage })))
      ))
    );
  });

  public deleteStep$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.deleteStep),
      mergeMap(action => this.bookEditorService.deleteStep(action.id).pipe(
        map(stepMetadata => StepEditorActions.deleteStepSuccess({ stepMetadata })),
        catchError(errorMessage => of(StepEditorActions.deleteStepFailed({ errorMessage })))
      ))
    );
  });

  public updateStepHeading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.updateStep),
      mergeMap(action => this.bookEditorService.updateStep(action.stepMetadataUpdate).pipe(
        map(stepMetadata => StepEditorActions.updateStepSuccess({ stepMetadata })),
        catchError(errorMessage => of(StepEditorActions.updateStepFailed({ errorMessage })))
      ))
    );
  });

  public createStep$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.createStep),
      mergeMap(({ unitId, blockType, bookId, pos, subtitle, title }) => this.bookEditorService.createStep({
        unitId, blockType, bookId, pos, subtitle, title
      }).pipe(
        map(stepMetadata => StepEditorActions.createStepSuccess({ stepMetadata })),
        catchError(errorMessage => of(StepEditorActions.createStepFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private bookEditorService: BookEditorService) { }
}
