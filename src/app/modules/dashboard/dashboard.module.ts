import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    DashboardPageComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
