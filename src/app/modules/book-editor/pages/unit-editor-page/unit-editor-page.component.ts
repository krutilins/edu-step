import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, mergeMap, skipWhile, tap } from 'rxjs/operators';
import { UnitMetadata } from 'src/app/core/models/metadata/unit-metadata.model';
import { loadUnit } from 'src/app/core/store/actions/unit-editor.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectSidebarOpen } from 'src/app/core/store/selectors/sidebar.selectors';
import { selectUnitById } from 'src/app/core/store/selectors/unit-editor.selectors';

@Component({
  selector: 'app-unit-editor-page',
  templateUrl: './unit-editor-page.component.html',
  styleUrls: ['./unit-editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitEditorPageComponent implements OnInit {
  public open$ = this.store.select(selectSidebarOpen);
  public unitMetadata$: Observable<UnitMetadata>;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.unitMetadata$ = this.activatedRoute.params.pipe(
      map(params => params.unitId),
      tap(unitId => this.store.dispatch(loadUnit({ id: unitId }))),
      mergeMap(unitId => this.store.select(selectUnitById, { id: unitId })),
      skipWhile(unit => !unit)
    );
  }
}
