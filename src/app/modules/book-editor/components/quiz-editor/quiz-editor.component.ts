import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuizMetadata } from 'src/app/core/models/metadata/quiz-metadata.model';

@Component({
  selector: 'app-quiz-editor',
  templateUrl: './quiz-editor.component.html',
  styleUrls: ['./quiz-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizEditorComponent implements OnInit {

  @Input()
  public quiz: QuizMetadata;

  public quizHeadingForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.quizHeadingForm = this.formBuilder.group({
      title: this.quiz.title,
      subtitle: this.quiz.subtitle
    });
  }

}
