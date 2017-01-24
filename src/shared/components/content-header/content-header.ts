import { Component, ViewEncapsulation, Input } from '@angular/core';
import './content-header.scss';

@Component({
  selector: 'content-header',
  encapsulation: ViewEncapsulation.None,
  template:`
  <header class="content-header">
    <div class="g-row g-cont">
      <div class="g-col">
        <div class="content-header-section">{{ section }} /</div>
        <h1 class="content-header-title">{{ title }}</h1>
      </div>
    </div>
  </header>  
  `
})
export class ContentHeaderComponent {
  @Input() section: string;
  @Input() title: string;
}