import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'home-page',
  encapsulation: ViewEncapsulation.None,
  template:`
  <section>
    <content-header 
      [section]="section" 
      [title]="title">      
    </content-header>
    
    
  </section>
  `
})
export class HomePageComponent {
  layout: string = 'compact';
  section: string = 'Spotlight';
  title: string = 'Featured Tracks';

  constructor() {
    console.log('----- Home Page CMP init() ----');
  }
}