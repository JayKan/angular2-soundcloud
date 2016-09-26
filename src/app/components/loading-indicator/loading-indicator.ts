import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'loading-indicator',
  encapsulation: ViewEncapsulation.None,
  template:`
  <div class="loading-indicator">
    <div class="circle circle--1"></div>
    <div class="circle circle--2"></div>
    <div class="circle circle--3"></div>
  </div>
  `,
  styles: [
    require('./loading-indicator.scss')
  ]
})
export class LoadingIndicatorComponent { }