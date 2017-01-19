import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import './app-header.scss';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  template:`
  <header class="header">
    <div class="g-row g-cont">
      <div class="g-col">
        <h1 class="header-title"><a [routerLink]="['/']">A2 • SoundCloud</a></h1>
        <ul class="header-actions">
          <li>
            <icon-button [icon]="'fa-search'" (onClick)="toggleOpen()"></icon-button>
          </li>
          <li>
            <icon-button [icon]="'fa-soundcloud'"></icon-button>
          </li>
          <li>
            <a class="link link-github" href="https://github.com/JayKan/angular2-soundcloud">
              <i class="fa fa-github" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  
    <div class="g-row g-cont">
      <div class="g-col">
        <search-bar [open]="open"></search-bar>
      </div>
    </div>
  </header>
  `
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