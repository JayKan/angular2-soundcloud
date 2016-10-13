import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `  
  <app-header></app-header>

  <section class="main">
    <router-outlet></router-outlet>
  </section>
  
  <player></player>
  `,
  styles: [
    require('./app.scss')
  ]
})
export class AppComponent { }