import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { LibraryPageComponent } from './pages/library-page/library-page.component';
import { StepPageComponent } from './pages/step-page/step-page.component';
import { UnitPageComponent } from './pages/unit-page/unit-page.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryPageComponent,
    pathMatch: 'full'
  },
  {
    path: ':bookId',
    component: BookPageComponent
  },
  {
    path: ':bookId/step/:stepId',
    component: StepPageComponent
  },
  {
    path: ':bookId/unit/:unitId',
    component: UnitPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
