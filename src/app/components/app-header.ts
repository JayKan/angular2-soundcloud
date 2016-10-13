import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  template: require('./app-header.html'),
  styles: [
    require('./app-header.scss')
  ]
})
export class AppHeaderComponent {
  open: boolean = false;

  constructor(private _router: Router) {
    this._router.events.subscribe(() => {
      if (this.open) this.toggleOpen();
    });
  }

  toggleOpen(): void {
    this.open = !this.open;
  }
}