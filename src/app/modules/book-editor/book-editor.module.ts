import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookEditorRoutingModule } from './book-editor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BookCreationDialogComponent } from './components/book-creation-dialog/book-creation-dialog.component';
import { BookListPageComponent } from './pages/book-list-page/book-list-page.component';
import { BookEditorComponent } from './book-editor.component';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BookHeadingEditorComponent } from './components/book-heading-editor/book-heading-editor.component';
import { UnitCreationDialogComponent } from './components/unit-creation-dialog/unit-creation-dialog.component';
import { UnitPreviewComponent } from './components/unit-preview/unit-preview.component';
import { StepCreationDialogComponent } from './components/step-creation-dialog/step-creation-dialog.component';
import { StepPreviewComponent } from './components/step-preview/step-preview.component';
import { BookContentComponent } from './components/book-content/book-content.component';
import { BookContentPageComponent } from './pages/book-content-page/book-content-page.component';
import { StepEditorPageComponent } from './pages/step-editor-page/step-editor-page.component';
import { StepEditorComponent } from './components/step-editor/step-editor.component';
import { StepEditorToolbarComponent } from './components/step-editor-toolbar/step-editor-toolbar.component';
import { QuizEditorComponent } from './components/quiz-editor/quiz-editor.component';
import { QuestionEditorComponent } from './components/question-editor/question-editor.component';
import { UnitComponent } from './components/unit/unit.component';


@NgModule({
  declarations: [
    BookCreationDialogComponent,
    BookListPageComponent,
    BookEditorComponent,
    BookPreviewComponent,
    BookHeadingEditorComponent,
    UnitCreationDialogComponent,
    UnitPreviewComponent,
    StepCreationDialogComponent,
    StepPreviewComponent,
    BookContentComponent,
    BookContentPageComponent,
    StepEditorPageComponent,
    StepEditorComponent,
    StepEditorToolbarComponent,
    QuizEditorComponent,
    QuestionEditorComponent,
    UnitComponent
  ],
  imports: [
    CommonModule,
    BookEditorRoutingModule,
    SharedModule
  ]
})
export class BookEditorModule { }
