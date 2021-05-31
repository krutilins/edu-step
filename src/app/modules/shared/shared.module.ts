import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';


import { RouterModule } from '@angular/router';
import { TitleGroupHeaderComponent } from './components/title-group-header/title-group-header.component';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [
    TitleGroupHeaderComponent,
    QuestionComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    OverlayModule,
    DragDropModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    OverlayModule,
    DragDropModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TitleGroupHeaderComponent,
    QuestionComponent,
  ]
})
export class SharedModule { }
