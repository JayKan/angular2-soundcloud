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
   
    <tracklist [layout]="layout"></tracklist>      
  </section>
  `
})
export class HomePageComponent {
  layout: string = 'compact';
  section: string = 'Spotlight';
  title: string = 'Featured Tracks';

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
    // console.log('----- Home Page CMP init() ----');
  }
}