import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import './icon-button.scss';

@Component({
  selector: 'icon-button',
  encapsulation: ViewEncapsulation.None,
  template:`
    <button type="button"
      [attr.aria-label]="label"
      class="btn btn-icon btn-{{ icon }} {{ className }}"
      (click)="onClick.emit($event)">
      <!--<icon [name]="icon"></icon>-->
      <i class="fa {{ icon }}" aria-hidden="true"></i>
    </button>
  `
})
export class IconButtonComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() className: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>(false);
}