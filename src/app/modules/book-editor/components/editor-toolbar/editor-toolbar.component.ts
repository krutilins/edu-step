import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorToolbarComponent {

  @Input()
  public bookId: string;

  constructor(private router: Router) { }

  public backToContent(): void {
    this.router.navigate(['dashboard', 'editor', this.bookId]);
  }
}
