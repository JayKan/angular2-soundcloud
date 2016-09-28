import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html'),
  styles: [
    require('./app.scss')
  ]
})
export class AppComponent {}