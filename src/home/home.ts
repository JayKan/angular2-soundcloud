import { Component, ViewEncapsulation } from '@angular/core';
import { TracklistService } from 'src/tracklists';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app';

@Component({
  selector: 'home-page',
  encapsulation: ViewEncapsulation.None,
  template:`
  <section>
    <content-header 
      [section]="section" 
      [title]="title">      
    </content-header>
    
    <!--<div style="background: white">-->
      <!--<pre>-->
        <!--{{ store | async | json }}-->
      <!--</pre>-->
    <!--</div>-->
    <tracklist [layout]="layout"></tracklist>
        
  </section>
  `
})
export class HomePageComponent {
  layout: string  = 'compact';
  section: string = 'Spotlight';
  title: string   = 'Featured Tracks';

  constructor(public tracklist: TracklistService, public store: Store<AppState>) {
    tracklist.loadFeaturedTracks();
  }
}