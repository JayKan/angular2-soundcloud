import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'icon',
  encapsulation: ViewEncapsulation.None,
  template:`
    <svg [attr.class]="'icon icon--' + name + ' ' + className">
      <use [attr.xlink:href]="'#icon-' + name"></use>
    </svg>
  `,
  styles:[
    require('./icon.scss')
  ]
})
export class IconComponent {
  @Input() className: string = '';
  @Input() name: string;
}