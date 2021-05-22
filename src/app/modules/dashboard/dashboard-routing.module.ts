import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'library',
        loadChildren: () => import('../library/library.module').then(m => m.LibraryModule),
        pathMatch: 'full'
      },
      {
        path: 'catalog',
        loadChildren: () => import('../catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'editor',
        loadChildren: () => import('../book-editor/book-editor.module').then(m => m.BookEditorModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
      }
    ],
    component: DashboardPageComponent
  },
  {
    path: '**',
    redirectTo: 'library'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
