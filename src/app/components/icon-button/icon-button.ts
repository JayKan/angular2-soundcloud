import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'icon-button',
  encapsulation: ViewEncapsulation.None,
  template:`
    <button type="button"
      [attr.aria-label]="label"
      class="btn btn-icon btn-{{ icon }} {{ className }}"
      (click)="onClick.emit($event)">
      <icon [name]="icon"></icon>
    </button>
  `,
  styles: [
    require('./icon-button.scss')
  ]
})
export class IconButtonComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() className: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>(false);
}