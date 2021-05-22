import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookEditorComponent { }
