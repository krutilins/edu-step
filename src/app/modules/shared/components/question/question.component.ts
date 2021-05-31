import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { QuestionCreationDialogData } from 'src/app/core/models/components/question-creation-dialog-data.model';
import { QuestionMetadata } from 'src/app/core/models/metadata/question-metadata.model';
import { UserAnswer } from 'src/app/core/models/metadata/user-answer-metadata.model';
import { AnswerType } from 'src/app/core/models/types/answer-type.model';
import { deleteQuestion, updateQuestion } from 'src/app/core/store/actions/question.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { QuestionCreationDialogComponent } from '../../../book-editor/creation-dialogs/question-creation-dialog/question-creation-dialog.component';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionComponent implements OnInit {

  public readonly answerId = uuidv4();

  @Input()
  public questionMetadata: QuestionMetadata;

  @Input()
  public disabled = false;

  @Input()
  public changeable = true;

  @Output()
  public answer: EventEmitter<UserAnswer> = new EventEmitter<UserAnswer>();

  public AnswerType = AnswerType;

  public questionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private store: Store<AppState>) { }

  public onUserAnswerChange(): void {
    this.answer.emit({
      id: this.answerId,
      answer: this.questionForm.value,
      question: this.questionMetadata
    });
  }

  public ngOnInit(): void {
    if (this.questionMetadata) {
      switch (this.questionMetadata.answerType) {
        case AnswerType.Text: {
          this.questionForm = this.formBuilder.group({
            userAnswer: { value: '', disabled: this.disabled }
          });
          break;
        }
        case AnswerType.Multiple: {
          this.questionForm = this.formBuilder.group({
            userAnswer: this.formBuilder.array(this.questionMetadata.options.map(option => this.formBuilder.group({
              id: [option.id],
              content: { value: option.content, disabled: this.disabled },
              state: { value: false, disabled: this.disabled }
            })))
          });
          break;
        }
        case AnswerType.Radio: {
          this.questionForm = this.formBuilder.group({
            userAnswer: { value: '', disabled: this.disabled },
          });
          break;
        }
      }
    }
  }

  public get userAnswer(): FormControl {
    return this.questionForm.get('userAnswer') as FormControl;
  }

  public onUpdateQuestion(): void {
    this.dialog.open<QuestionCreationDialogComponent, QuestionCreationDialogData>(QuestionCreationDialogComponent, {
      width: '500px',
      minWidth: '300px',
      data: {
        answerType: this.questionMetadata.answerType,
        id: this.questionMetadata.id,
        options: this.questionMetadata.options,
        question: this.questionMetadata.question,
        quizId: this.questionMetadata.quizId,
        required: this.questionMetadata.required,
        type: updateQuestion.type
      }
    });
  }

  public onDeleteQuestion(): void {
    this.store.dispatch(deleteQuestion({
      id: this.questionMetadata.id
    }));
  }


}
