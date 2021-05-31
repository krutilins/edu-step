import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookEditorRoutingModule } from './book-editor-routing.module';
import { SharedModule } from '../shared/shared.module';

import { BookListPageComponent } from './pages/book-list-page/book-list-page.component';
import { BookContentPageComponent } from './pages/book-content-page/book-content-page.component';
import { BookCreationDialogComponent } from './creation-dialogs/book-creation-dialog/book-creation-dialog.component';
import { QuestionCreationDialogComponent } from './creation-dialogs/question-creation-dialog/question-creation-dialog.component';
import { StepCreationDialogComponent } from './creation-dialogs/step-creation-dialog/step-creation-dialog.component';
import { UnitCreationDialogComponent } from './creation-dialogs/unit-creation-dialog/unit-creation-dialog.component';
import { StepEditorPageComponent } from './pages/step-editor-page/step-editor-page.component';
import { StepEditorActionsComponent } from './components/step-editor-actions/step-editor-actions.component';
import { UnitEditorActionsComponent } from './components/unit-editor-actions/unit-editor-actions.component';
import { BookEditorActionsComponent } from './components/book-editor-actions/book-editor-actions.component';
import { StepTextEditorComponent } from './components/step-text-editor/step-text-editor.component';
import { UnitEditorComponent } from './components/unit-editor/unit-editor.component';
import { EditorToolbarComponent } from './components/editor-toolbar/editor-toolbar.component';
import { QuizEditorComponent } from './components/quiz-editor/quiz-editor.component';
import { StepEditorComponent } from './components/step-editor/step-editor.component';
import { UnitEditorPageComponent } from './pages/unit-editor-page/unit-editor-page.component';
import { FileLoaderModule } from '../file-loader/file-loader.module';

@NgModule({
  declarations: [
    StepEditorPageComponent,
    BookListPageComponent,
    BookContentPageComponent,
    BookCreationDialogComponent,
    QuestionCreationDialogComponent,
    StepCreationDialogComponent,
    UnitCreationDialogComponent,
    StepEditorActionsComponent,
    UnitEditorActionsComponent,
    BookEditorActionsComponent,
    StepTextEditorComponent,
    UnitEditorComponent,
    EditorToolbarComponent,
    QuizEditorComponent,
    StepEditorComponent,
    UnitEditorPageComponent
  ],
  imports: [
    CommonModule,
    BookEditorRoutingModule,
    SharedModule,
    FileLoaderModule
  ]
})
export class BookEditorModule { }
