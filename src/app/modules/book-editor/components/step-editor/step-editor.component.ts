import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-step-editor',
  templateUrl: './step-editor.component.html',
  styleUrls: ['./step-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepEditorComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private store: Store<AppState>) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.pipe(
        map(params => params.stepId),
        mergeMap(step => {
          return this.store.dispatch()
        })
      ).subscribe()
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      if (subscription && subscription.unsubscribe) {
        subscription.unsubscribe();
      }
    });
  }

}
