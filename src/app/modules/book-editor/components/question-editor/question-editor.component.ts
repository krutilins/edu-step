import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuestionMetadata } from 'src/app/core/models/metadata/question-metadata.model';
import { AnswerType } from 'src/app/core/models/types/answer-type.model';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionEditorComponent implements OnInit {

  @Input()
  public question: QuestionMetadata;

  public answerType = AnswerType;


  questionForm: FormGroup;
  items: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      question: this.question.question,
      options: this.formBuilder.array([this.createItem()])
    });
  }

  public createItem(): FormGroup {
    return this.formBuilder.group({
      option: '',
    });
  }

  public addItem(): void {
    this.items = this.questionForm.get('options') as FormArray;
    this.items.push(this.createItem());
  }
}
