import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `  
  <app-header></app-header>

  <main class="main">
    <router-outlet></router-outlet>
  </main>
  
  <player></player>
  `,
  styles: [
    require('./app.scss')
  ]
})
export class AppComponent { }