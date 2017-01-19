import { Component, ViewEncapsulation } from '@angular/core';
import './app.scss';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `  
  <app-header></app-header>

  <main class="main">
    <router-outlet></router-outlet>
  </main>
  
  <player></player>
  `
})
export class AppComponent {}