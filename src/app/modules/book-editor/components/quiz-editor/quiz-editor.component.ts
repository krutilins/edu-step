import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { QuestionCreationDialogData } from 'src/app/core/models/components/question-creation-dialog-data.model';
import { QuestionMetadata } from 'src/app/core/models/metadata/question-metadata.model';
import { QuizMetadata } from 'src/app/core/models/metadata/quiz-metadata.model';
import { AnswerType } from 'src/app/core/models/types/answer-type.model';
import { createQuestion, loadQuestionByQuizId } from 'src/app/core/store/actions/question.actions';
import { updateQuiz } from 'src/app/core/store/actions/quiz.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectQuestionByQuizId } from 'src/app/core/store/selectors/question.selectors';
import { QuestionCreationDialogComponent } from 'src/app/modules/book-editor/creation-dialogs/question-creation-dialog/question-creation-dialog.component';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizEditorComponent implements OnChanges {

  @Input()
  public quizMetadata: QuizMetadata;

  public questionsMetadata$: Observable<QuestionMetadata[]>;

  public quizHeadingForm: FormGroup;

  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private dialog: MatDialog) { }

  public ngOnChanges(): void {
    if (this.quizMetadata) {
      this.quizHeadingForm = this.formBuilder.group({
        id: this.quizMetadata.id,
        title: this.quizMetadata.title,
        subtitle: this.quizMetadata.subtitle
      });

      if (this.subscription?.unsubscribe) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.quizHeadingForm.valueChanges.pipe(
        debounceTime(700)
      ).subscribe({
        next: (quizMetadata) => this.store.dispatch(updateQuiz({ quizMetadata }))
      });

      this.store.dispatch(loadQuestionByQuizId({ id: this.quizMetadata.id }));

      this.questionsMetadata$ = this.store.select(selectQuestionByQuizId, { quizId: this.quizMetadata.id });
    }
  }

  public addQuestion(): void {
    this.dialog.open<QuestionCreationDialogComponent, QuestionCreationDialogData>(QuestionCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        answerType: AnswerType.Text,
        id: '',
        options: [],
        question: 'Empty question',
        quizId: this.quizMetadata.id,
        required: true,
        type: createQuestion.type
      }
    });
  }

}
