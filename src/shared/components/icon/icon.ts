import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy } from '@angular/core';
import './icon.scss';

@Component({
  selector: 'icon',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <svg [attr.class]="'icon icon--' + name + ' ' + className">
      <use [attr.xlink:href]="'#icon-' + name"></use>
    </svg>
  `
})
export class IconComponent {
  @Input() className: string = '';
  @Input() name: string;

}