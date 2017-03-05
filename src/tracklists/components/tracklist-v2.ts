import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MediaQueryService } from 'src/core';
import { PlayerService } from 'src/player/player-service';
import { TracklistService } from '../tracklist-service';
import { TracklistScrollService } from '../tracklist-scroll-service';

@Component({
  selector: 'tracklist',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TracklistScrollService
  ],
  template:`
  <tracklist-items
    [layout]="layout"
    [media]="mediaQuery.matches$ | async"
    [player]="player.player$ | async"
    [times]="player.times$"
    [tracklist]="tracklist.tracklist$ | async"
    [tracks]="tracklist.tracks$"
    (pause)="player.pause()"
    (play)="player.play()"
    (seek)="player.seek($event)"
    (select)="player.select($event)">    
  </tracklist-items>
  `,
  styles: [`
  tracklist {
    display: block;
    position: relative;
  }
  `]
})
export class TracklistComponent implements OnInit, OnDestroy {
  @Input() layout: string;
  ngOnDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public mediaQuery: MediaQueryService,
    public player: PlayerService,
    public scroll: TracklistScrollService,
    public tracklist: TracklistService
  ) {}

  ngOnInit(): void {
    this.scroll.infinite(this.ngOnDestroy$);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}