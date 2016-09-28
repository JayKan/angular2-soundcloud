import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MediaQueryService } from '../../core';


@Component({
  selector: 'tracklist',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <div class="g-row g-cont">
    <div class="g-col sm md lg">      
      <article class="track-card track-card-compact">
        <div class="track-card-image">
          <img src="https://i1.sndcdn.com/artworks-000178703554-46oh2h-t500x500.jpg">
        </div>
                  
        <div class="track-card-main">
          <div class="track-card-timeline"></div>
          <a class="track-card-username">XLR8R</a>
          <h1 class="track-card-title">Download: Galtier – Charm Complex</h1>
        </div>                    
      </article>
    </div>
      
    <div class="g-col sm md lg">           
    <article class="track-card track-card-compact">
      <div class="track-card-image">
        <img src="https://i1.sndcdn.com/artworks-000178703554-46oh2h-t500x500.jpg">
      </div>
                
      <div class="track-card-main">
        <div class="track-card-timeline"></div>
        <a class="track-card-username">XLR8R</a>
        <h1 class="track-card-title">Download: Galtier – Charm Complex</h1>
      </div>                    
    </article>    
  </div>
    
    <div class="g-col sm md lg">      
      <article class="track-card track-card-compact">
        <div class="track-card-image">
          <img src="https://i1.sndcdn.com/artworks-000178703554-46oh2h-t500x500.jpg">
        </div>
                  
        <div class="track-card-main">
          <div class="track-card-timeline"></div>
          <a class="track-card-username">XLR8R</a>
          <h1 class="track-card-title">Download: Galtier – Charm Complex</h1>
        </div>                    
      </article>
    </div>
         
    <div class="g-col sm md lg">
        <article class="track-card track-card-compact">
          <div class="track-card-image">
            <img src="https://i1.sndcdn.com/artworks-000178703554-46oh2h-t500x500.jpg">
          </div>
                    
          <div class="track-card-main">
            <div class="track-card-timeline"></div>
            <a class="track-card-username">XLR8R</a>
            <h1 class="track-card-title">Download: Galtier – Charm Complex</h1>
          </div>                    
        </article>
      </div>    
  </div>
  `,
  styles: [
    require('./tracklist.scss')
  ]
})
export class TracklistComponent implements OnInit {
  @Input() layout: string;

  tracks: [
    {
      artworkUrl: 'https://i1.sndcdn.com/artworks-000178703554-46oh2h-t500x500.jpg',
      username: 'XLR8R',
      title: 'Download: Galtier – Charm Complex'
    },
    {
      artworkUrl: 'https://i1.sndcdn.com/artworks-000071780846-4lirn4-t500x500.jpg',
      username: 'Raffertie'
      title: 'Raffertie – Rain (Alvin Lee Ryan Remix)'
    },
    {
      artworkUrl: 'https://i1.sndcdn.com/artworks-000111433010-uvg8j5-t500x500.jpg'
      username: 'Vessels',
      title: 'Glass Lake'
    },
    {
      artworkUrl: 'https://i1.sndcdn.com/artworks-000156998058-086xro-t500x500.jpg'
      username: 'GrimeDisciple II',
      title: 'Hefu X Eski Myth – Untitled'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
    console.log('Tracklist Constructor()....', this.tracks, this.layout);
  }

}