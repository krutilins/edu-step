import { Component, ChangeDetectionStrategy, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { TextMetadata } from 'src/app/core/models/metadata/text-metadata.model';
import { TextType } from 'src/app/core/models/types/text-type.model';
import { updateStepText } from 'src/app/core/store/actions/step-text.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';

@Component({
  selector: 'app-step-text-editor',
  templateUrl: './step-text-editor.component.html',
  styleUrls: ['./step-text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepTextEditorComponent implements OnChanges, OnDestroy {

  @Input()
  public textMetadata: TextMetadata;

  public TextType = TextType;

  public textMetadataForm: FormGroup;

  public subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  public ngOnChanges(): void {
    if (this.textMetadata) {
      this.textMetadataForm = this.formBuilder.group({
        id: this.textMetadata.id,
        content: this.textMetadata.content,
        type: this.textMetadata.type,
        title: this.textMetadata.title,
        subtitle: this.textMetadata.subtitle
      });

      if (this.subscription?.unsubscribe) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.textMetadataForm.valueChanges.pipe(
        debounceTime(700)
      ).subscribe({
        next: (textMetadata) => this.store.dispatch(updateStepText({ textMetadata }))
      });
    }

  }

  public ngOnDestroy(): void {
    if (this.subscription?.unsubscribe) {
      this.subscription.unsubscribe();
    }
  }

}
