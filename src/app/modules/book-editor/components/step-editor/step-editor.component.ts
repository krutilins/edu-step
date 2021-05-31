import { Component, ChangeDetectionStrategy, Input, OnInit, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { QuizMetadata } from 'src/app/core/models/metadata/quiz-metadata.model';
import { StepMetadata } from 'src/app/core/models/metadata/step-metadata.model';
import { TextMetadata } from 'src/app/core/models/metadata/text-metadata.model';
import { BlockType } from 'src/app/core/models/types/block-type.model';
import { loadQuiz } from 'src/app/core/store/actions/quiz.actions';
import { loadStepText } from 'src/app/core/store/actions/step-text.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectQuizById } from 'src/app/core/store/selectors/quiz.selectors';
import { selectStepTextById } from 'src/app/core/store/selectors/step-text.selector';

@Component({
  selector: 'app-step-editor',
  templateUrl: './step-editor.component.html',
  styleUrls: ['./step-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepEditorComponent implements OnChanges {
  @Input()
  public stepMetadata: StepMetadata;

  public text$: Observable<TextMetadata>;
  public quiz$: Observable<QuizMetadata>;

  public blockType = BlockType;

  constructor(private store: Store<AppState>) { }

  public ngOnChanges(): void {
    if (Boolean(this.stepMetadata)) {
      if (this.stepMetadata.blockType === BlockType.Quiz) {
        this.store.dispatch(loadQuiz({ stepMetadata: this.stepMetadata }));
        this.quiz$ = this.store.select(selectQuizById, { id: this.stepMetadata.contentId });
      } else if (this.stepMetadata.blockType === BlockType.Text) {
        this.store.dispatch(loadStepText({ stepMetadata: this.stepMetadata }));
        this.text$ = this.store.select(selectStepTextById, { id: this.stepMetadata.contentId });
      }
    }
  }

}
