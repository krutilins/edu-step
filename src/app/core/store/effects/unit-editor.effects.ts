import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UnitService } from '../../services/unit.service';
import * as UnitEditorActions from '../actions/unit-editor.actions';

@Injectable({
  providedIn: 'root'
})
export class UnitEditorEffects {

  public createUnit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UnitEditorActions.createUnit),
      mergeMap(({ bookId, pos, subtitle, title }) => this.unitService.createUnit({ bookId, pos, subtitle, title }).pipe(
        map(unitMetadata => UnitEditorActions.createUnitSuccess({ unitMetadata })),
        catchError(errorMessage => of(UnitEditorActions.createUnitFailed({ errorMessage })))
      ))
    );
  });

  public updateUnit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UnitEditorActions.updateUnit),
      mergeMap(action => this.unitService.updateUnit(action.unitMetadata).pipe(
        map(unitMetadata => UnitEditorActions.updateUnitSuccess({ unitMetadata })),
        catchError(errorMessage => of(UnitEditorActions.updateUnitFailed({ errorMessage })))
      ))
    );
  });

  public deleteUnit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UnitEditorActions.deleteUnit),
      mergeMap(action => this.unitService.deleteUnit(action.id).pipe(
        map(unitMetadata => UnitEditorActions.deleteUnitSuccess({ unitMetadata })),
        catchError(errorMessage => of(UnitEditorActions.deleteUnitFailed({ errorMessage })))
      ))
    );
  });

  public loadUnitById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UnitEditorActions.loadUnit),
      mergeMap(action => this.unitService.loadUnitById(action.id).pipe(
        map(unitMetadata => UnitEditorActions.loadUnitSuccess({ unitMetadata })),
        catchError(errorMessage => of(UnitEditorActions.loadUnitFailed({ errorMessage })))
      ))
    );
  });

  public loadUnitsByBookId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UnitEditorActions.loadUnits),
      mergeMap(action => this.unitService.loadUnitsByBookId(action.bookId).pipe(
        map(unitsMetadata => UnitEditorActions.loadUnitsSuccess({ unitsMetadata })),
        catchError(errorMessage => of(UnitEditorActions.loadUnitsFailed({ errorMessage })))
      ))
    );
  });

  constructor(private actions$: Actions, private unitService: UnitService) { }
}
