import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';
import { loadStep } from 'src/app/core/store/actions/step-editor.action';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectSidebarOpen } from 'src/app/core/store/selectors/sidebar.selectors';
import { selectStepById } from 'src/app/core/store/selectors/step-editor.selectors';

@Component({
  selector: 'app-step-editor-page',
  templateUrl: './step-editor-page.component.html',
  styleUrls: ['./step-editor-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepEditorPageComponent implements OnInit {
  public open$ = this.store.select(selectSidebarOpen);
  public stepMetadata$: Observable<StepMetadata>;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.stepMetadata$ = this.activatedRoute.params.pipe(
      map(params => params.stepId),
      tap(stepId => this.store.dispatch(loadStep({ stepId }))),
      mergeMap(stepId => this.store.select(selectStepById, { id: stepId }))
    );
  }


}
