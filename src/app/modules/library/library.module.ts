import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryPageComponent } from './pages/library-page/library-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { SharedModule } from '../shared/shared.module';
import { StepPageComponent } from './pages/step-page/step-page.component';
import { BookLibraryActionsComponent } from './components/book-library-actions/book-library-actions.component';
import { UnitComponent } from './components/unit/unit.component';
import { StepComponent } from './components/step/step.component';
import { LibraryToolbarComponent } from './components/library-toolbar/library-toolbar.component';
import { StepContentComponent } from './components/step-content/step-content.component';
import { BookContentComponent } from './components/book-content/book-content.component';
import { StepTextComponent } from './components/step-text/step-text.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { UnitPageComponent } from './pages/unit-page/unit-page.component';
import { FileLoaderModule } from '../file-loader/file-loader.module';


@NgModule({
  declarations: [
    LibraryPageComponent,
    BookPageComponent,
    StepPageComponent,
    BookLibraryActionsComponent,
    UnitComponent,
    StepComponent,
    LibraryToolbarComponent,
    StepContentComponent,
    BookContentComponent,
    StepTextComponent,
    QuizComponent,
    UnitPageComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule,
    FileLoaderModule
  ]
})
export class LibraryModule { }
