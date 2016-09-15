import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  template:`
  <header class="header">   
    <div class="g-row g-cont">
      <div class="g-col">
        <h1 class="header__title"><a>Angular2 • SoundCloud</a></h1>
        <ul class="header__actions">
          <li>
            <!--<icon-button icon="search-alt" (onClick)="toggleOpen()"></icon-button>-->
          </li>
          <li>
            <!--<icon-button icon="soundcloud"></icon-button>-->
          </li>
          <li>
            <a class="link link--github" href="https://github.com/r-park/soundcloud-ngrx">
              <!--<icon name="github"></icon>-->
            </a>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="g-row g-cont">
      <div class="g-col">
        <!--<search-bar [open]="open"></search-bar>-->
      </div>
    </div>
  </header>
  `,
  styles: [
    require('./header.scss')
  ]
})
export class AppHeaderComponent {
  open: boolean = false;

  constructor(private _router: Router) {

  }
}