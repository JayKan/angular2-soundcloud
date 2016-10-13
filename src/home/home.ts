import { Component, ViewEncapsulation } from '@angular/core';
import { TracklistService } from '../../tracklist';

@Component({
  selector: 'home-page',
  encapsulation: ViewEncapsulation.None,
  template:`
  <section>
    <content-header 
      [section]="section" 
      [title]="title">      
    </content-header>
   
    <tracklist [layout]="layout"></tracklist>
        
  </section>
  `
})
export class HomePageComponent {
  layout: string  = 'compact';
  section: string = 'Spotlight';
  title: string   = 'Featured Tracks';

  constructor(public tracklist: TracklistService) {
    tracklist.loadFeaturedTracks();
  }
}