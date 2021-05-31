import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookContentPageComponent } from './pages/book-content-page/book-content-page.component';
import { BookListPageComponent } from './pages/book-list-page/book-list-page.component';
import { StepEditorPageComponent } from './pages/step-editor-page/step-editor-page.component';
import { UnitEditorPageComponent } from './pages/unit-editor-page/unit-editor-page.component';

const routes: Routes = [
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
    path: ':bookId/unit/:unitId',
    component: UnitEditorPageComponent
  },
  {
    path: ':bookId/step/:stepId',
    component: StepEditorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookEditorRoutingModule { }
