import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-title-group-header',
  templateUrl: './title-group-header.component.html',
  styleUrls: ['./title-group-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleGroupHeaderComponent {

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

}
