import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { BookCatalogActionsComponent } from './components/book-catalog-actions/book-catalog-actions.component';


@NgModule({
  declarations: [
    CatalogPageComponent,
    BookCatalogActionsComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule
  ]
})
export class CatalogModule { }
