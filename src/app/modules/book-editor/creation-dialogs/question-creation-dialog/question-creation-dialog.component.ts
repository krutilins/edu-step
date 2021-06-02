import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Store } from '@ngrx/store';
import { ErrorMatcher } from 'src/app/core/classes/error-matcher.class';
import { QuestionCreationDialogData } from 'src/app/core/models/components/question-creation-dialog-data.model';
import { QuestionMetadata } from 'src/app/core/models/metadata/question-metadata.model';
import { AnswerType } from 'src/app/core/models/types/answer-type.model';
import { createQuestion, deleteQuestion, updateQuestion } from 'src/app/core/store/actions/question.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-question-creation-dialog',
  templateUrl: './question-creation-dialog.component.html',
  styleUrls: ['./question-creation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCreationDialogComponent {

  public readonly AnswerType = AnswerType;

  public questionMetadata: QuestionMetadata;

  public questionForm: FormGroup;
  public errorMatcher = new ErrorMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QuestionCreationDialogData,
    public dialogRef: MatDialogRef<QuestionCreationDialogComponent>,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.questionForm = this.formBuilder.group({
      id: this.data.id,
      question: [this.data.question],
      required: [String(this.data.required)],
      answerType: [this.data.answerType],
      options: this.formBuilder.array(this.data.options.map(item => this.newOption(item.content)))
    });

    if (this.options.value.length === 0) {
      this.addOption();
    }
  }

  public get question(): FormControl {
    return this.questionForm.get('question') as FormControl;
  }

  public get required(): FormControl {
    return this.questionForm.get('question') as FormControl;
  }

  public get answerType(): FormControl {
    return this.questionForm.get('answerType') as FormControl;
  }

  public get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  public newOption(optionContent: string = 'empty option'): FormGroup {
    return this.formBuilder.group({
      content: [optionContent, Validators.required],
      id: uuidv4()
    });
  }

  public addOption(optionContent: string = 'empty option'): void {
    this.options.push(this.newOption(optionContent));
  }

  public removeOption(id: number): void {
    this.options.removeAt(id);
  }

  public handleModalAction(): void {
    if (this.data.dialogType === createQuestion.type) {
      this.handleCreateQuestion();
    } else {
      this.handleUpdateQuestion();
    }
  }

  public handleCreateQuestion(): void {
    this.store.dispatch(createQuestion({
      question: {
        quizId: this.data.quizId,
        ...this.questionForm.value
      }
    }));

    this.onClose();
  }

  public handleUpdateQuestion(): void {
    this.store.dispatch(updateQuestion({
      metadata: {
        ...this.questionForm.value
      }
    }));

    this.onClose();
  }

  public handleDeleteQuestion(): void {
    this.store.dispatch(deleteQuestion({
      id: this.data.id
    }));

    this.onClose();
  }

  public handleDisableSaveButton(): boolean {
    return this.data.question === '';
  }

  public handleDisableDeleteButton(): boolean {
    return this.data.dialogType === createQuestion.type;
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onInputChange(field: 'question', target: EventTarget | null): void {
    this.data[field] = (target as HTMLInputElement).value.trim();
  }

  public onTypeChange(event$: MatRadioChange): void {
    this.data.answerType = event$.value;
  }

}
