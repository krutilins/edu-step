import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { StepTextService } from '../../services/step-text.service';
import * as StepTextActions from '../actions/step-text.actions';

@Injectable({
  providedIn: 'root'
})
export class StepTextEffects {

  public loadStepText = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepTextActions.loadStepText),
      mergeMap(action => this.stepTextService.loadStepText(action.stepMetadata).pipe(
        map(textMetadata => StepTextActions.loadStepTextSuccess({ textMetadata })),
        catchError(errorMessage => of(StepTextActions.loadStepTextFailed({ errorMessage })))
      ))
    );
  });

  public updateStepText = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepTextActions.updateStepText),
      mergeMap(action => this.stepTextService.updateStepText(action.textMetadata).pipe(
        // map(textMetadata => StepTextActions.updateStepTextSuccess({ textMetadata })),
        catchError(errorMessage => of(StepTextActions.updateStepTextFailed({ errorMessage })))
      ))
    );
  });

  public deleteStepText = createEffect(() => {
    return this.actions$.pipe(
      ofType(StepTextActions.deleteStepText),
      mergeMap(action => this.stepTextService.deleteStepText(action.id).pipe(
        map(textMetadata => StepTextActions.deleteStepTextSuccess({ textMetadata })),
        catchError(errorMessage => of(StepTextActions.deleteStepTextFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private stepTextService: StepTextService) { }
}
