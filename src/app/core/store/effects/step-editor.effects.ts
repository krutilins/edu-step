import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StepService } from '../../services/step.service';
import * as StepEditorActions from '../actions/step-editor.action';

@Injectable({
  providedIn: 'root'
})
export class StepEditorEffects {

  public loadStepsByBookId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.loadStepsByBookId),
      mergeMap(action => this.stepService.loadStepsByBookId(action.bookId).pipe(
        map(stepsMetadata => StepEditorActions.loadStepsByBookIdSuccess({ stepsMetadata })),
        catchError(errorMessage => of(StepEditorActions.loadStepsByBookIdFailed({ errorMessage })))
      ))
    );
  });

  public loadStepsByUnitId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.loadStepsByUnitId),
      mergeMap(action => this.stepService.loadStepsByUnitId(action.unitId).pipe(
        map(stepsMetadata => StepEditorActions.loadStepsByUnitIdSuccess({ stepsMetadata })),
        catchError(errorMessage => of(StepEditorActions.loadStepsByUnitIdFailed({ errorMessage })))
      ))
    );
  });

  public loadStep$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.loadStep),
      mergeMap(action => this.stepService.loadStep(action.stepId).pipe(
        map(stepMetadata => StepEditorActions.loadStepSuccess({ stepMetadata })),
        catchError(errorMessage => of(StepEditorActions.loadStepFailed({ errorMessage })))
      ))
    );
  });

  public deleteStep$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.deleteStep),
      mergeMap(action => this.stepService.deleteStep(action.id).pipe(
        map(stepMetadata => StepEditorActions.deleteStepSuccess({ stepMetadata })),
        catchError(errorMessage => of(StepEditorActions.deleteStepFailed({ errorMessage })))
      ))
    );
  });

  public updateStepHeading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.updateStep),
      mergeMap(action => this.stepService.updateStep(action.stepMetadataUpdate).pipe(
        map(stepMetadata => StepEditorActions.updateStepSuccess({ stepMetadata })),
        catchError(errorMessage => of(StepEditorActions.updateStepFailed({ errorMessage })))
      ))
    );
  });

  public createStep$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepEditorActions.createStep),
      mergeMap(({ unitId, blockType, bookId, pos, subtitle, title }) => this.stepService.createStep({
        unitId, blockType, bookId, pos, subtitle, title
      }).pipe(
        map(stepMetadata => StepEditorActions.createStepSuccess({ stepMetadata })),
        catchError(errorMessage => of(StepEditorActions.createStepFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private stepService: StepService) { }
}
