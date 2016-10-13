import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { MediaQueryResults } from '../../core';
import { PlayerState, TimesState } from '../../player';
import { Tracklist } from '../models/tracklist';
import { Track } from '../models/track';

@Component({
  selector: 'tracklist-items',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <div *ngIf="media && tracklist" class="g-row g-cont tracklist-items" [ngClass]="{'has-line-clamp': hasLineClamp }">
      <track-card
          *ngFor="let track of tracks2"
          class="g-col"
          [ngClass]="{'sm-2/4 md-1/3 lg-1/4': !media.large || layout === 'compact'}"
          [compact]="!media.large || layout === 'compact'"
          [isPlaying]="track.id === player.trackId && player.isPlaying"
          [isSelected]="track.id === player.trackId"
          [times]="times"
          [track]="track"
          (pause)="pause.emit()"
          (play)="track.id === player.trackId ? play.emit() : select.emit({trackId: track.id, tracklistId: tracklist.id})"
          (seek)="seek.emit($event)">          
      </track-card>             
    </div>   
    <loading-indicator *ngIf="tracklist.isPending || tracklist.hasNextPage"></loading-indicator>   
  `,
  styles: [
    require('./tracklist-items.scss')
  ]
})
export class TracklistItemsComponent {
  @Input() layout: string;
  @Input() media: MediaQueryResults;
  @Input() player: PlayerState;
  @Input() times: Observable<TimesState>;
  @Input() tracklist: Tracklist;
  @Input() tracks: Observable<List<Track>>;

  tracks2: List<Track>;
  @Output() pause: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() play: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() seek: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() select: EventEmitter<any> = new EventEmitter<any>(false);

  ngOnInit(): void {
    console.log('isPending: ', this.tracklist.isPending);
    console.log('hasNextPage: ', this.tracklist.hasNextPage);
    this.tracks.subscribe(data => {
      this.tracks2 = data;
      // console.log('2. Total Number of tracks: ', this.tracks2.size);
    })
  }

  get hasLineClamp(): boolean {
    return '-webkit-line-clamp' in document.body.style;
  }
}