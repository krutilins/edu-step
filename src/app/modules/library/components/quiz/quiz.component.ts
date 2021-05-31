import { Component, ChangeDetectionStrategy, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { deepCopy } from 'src/app/core/functions/deep-copy.function';
import { QuestionMetadata } from 'src/app/core/models/metadata/question-metadata.model';
import { QuizMetadata } from 'src/app/core/models/metadata/quiz-metadata.model';
import { QuizResult } from 'src/app/core/models/metadata/quiz-result-metadata.model';
import { UserAnswer } from 'src/app/core/models/metadata/user-answer-metadata.model';
import { loadQuestionByQuizId } from 'src/app/core/store/actions/question.actions';
import { sendQuizResult } from 'src/app/core/store/actions/quiz-result.actions';
import { AppState } from 'src/app/core/store/models/app-state.model';
import { selectQuestionByQuizId } from 'src/app/core/store/selectors/question.selectors';
import { selectUserMetadata } from 'src/app/core/store/selectors/user.selectors';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnChanges {

  @Input()
  public quizMetadata: QuizMetadata;

  public questions$: Observable<QuestionMetadata[]>;

  public quizHeadingForm: FormGroup;

  private quizResult: QuizResult = {
    id: '',
    quizId: '',
    userAnswers: [],
    userId: ''
  };

  public resultIsSent = false;


  constructor(private store: Store<AppState>, private changeDetectorRef: ChangeDetectorRef) { }

  public ngOnChanges(): void {
    if (this.quizMetadata) {
      this.store.select(selectUserMetadata).pipe(
        take(1),
      ).subscribe(userMetadata => {
        this.quizResult.quizId = this.quizMetadata.id;
        this.quizResult.userId = userMetadata.id;
      });

      this.store.dispatch(loadQuestionByQuizId({ id: this.quizMetadata.id }));

      this.questions$ = this.store.select(selectQuestionByQuizId, { quizId: this.quizMetadata.id });
    }
  }

  public updateAnswers($event: UserAnswer): void {
    const changedAnswer = this.quizResult.userAnswers.find(answer => $event.id === answer.id);

    if (changedAnswer) {
      changedAnswer.answer = deepCopy($event.answer);
    } else {
      this.quizResult.userAnswers.push(deepCopy($event));
    }
  }

  public sendQuizResults(): void {
    this.store.dispatch(sendQuizResult({ quizResult: this.quizResult }));
    this.resultIsSent = true;
    this.changeDetectorRef.detectChanges()
  }

}
