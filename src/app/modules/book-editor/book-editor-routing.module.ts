import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookEditorComponent } from './book-editor.component';
import { BookContentPageComponent } from './pages/book-content-page/book-content-page.component';
import { BookListPageComponent } from './pages/book-list-page/book-list-page.component';
import { StepEditorPageComponent } from './pages/step-editor-page/step-editor-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BookListPageComponent,
        pathMatch: 'full'
      },
      {
        path: ':bookId',
        component: BookContentPageComponent
      },
      {
        path: ':bookId/step/:stepId',
        component: StepEditorPageComponent
      }
    ],
    component: BookEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookEditorRoutingModule { }
