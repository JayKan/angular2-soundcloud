import { Component, ViewEncapsulation, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimesState } from 'src/player/reducers/times-state';
import { Track } from '../models/track';
import './tracklist-card.scss';

@Component({
  selector: 'track-card',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <article class="track-card" [ngClass]="{'track-card-compact': compact, 'track-card-full': !compact}">
    <div class="track-card-image">
      <img [src]="track.artworkUrl">
    </div>

    <div class="track-card-main">
      <div class="track-card-timeline" *ngIf="compact">
        <audio-timeline
          *ngIf="isSelected"
          [times]="times | async"
          (seek)="seek.emit($event)">            
        </audio-timeline>      
      </div>
  
      <a class="track-card-username" [routerLink]="['/users', track.userId, 'tracks']">{{ track.username }}</a>
      <h1 class="track-card-title">{{ track.title }}</h1>
            
      <waveform-timeline
        *ngIf="!compact"
        [isActive]="isSelected"
        [times]="times"
        [waveformUrl]="track.waveformUrl"
        (seek)="seek.emit($event)">          
      </waveform-timeline>
      
      <div class="track-card-actions" *ngIf="track.streamable">
        <div class="cell">
          <icon-button
              [icon]="isPlaying ? 'fa-pause' : 'fa-play'"
              (onClick)="isPlaying ? pause.emit() : play.emit()"></icon-button>
          <span class="meta-duration">{{ track.duration | formatTime:'ms' }}</span>
        </div>
  
        <div class="cell" *ngIf="!compact">
          <!--<icon [name]="'headset'" [className]="'icon&#45;&#45;small'"></icon>-->
          <i class="fa fa-headphones" aria-hidden="true"></i>
          <span class="meta-playback-count">{{ track.playbackCount | formatInteger }}</span>
        </div>
  
        <div class="cell" *ngIf="!compact">
          <!--<icon [name]="'favorite-border'" [className]="'icon&#45;&#45;small'"></icon>-->
          <i class="fa fa-heart-o" aria-hidden="true"></i>
          <span class="meta-likes-count">{{ track.likesCount | formatInteger }}</span>
        </div>
  
        <div class="cell">
          <a [href]="track.userPermalinkUrl" target="_blank" rel="noopener noreferrer">
            <!--<icon [name]="'launch'" [className]="'icon&#45;&#45;small'"></icon>-->
            <i class="fa fa-external-link" aria-hidden="true"></i>
          </a>
            
        </div>
      </div>
    </div>
  </article>
  `
})
export class TrackCardComponent {
  @Input() compact: boolean = false;
  @Input() isPlaying: boolean = false;
  @Input() isSelected: boolean = false;
  @Input() times: Observable<TimesState>;
  @Input() track: Track;

  @Output() pause: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() play: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() seek: EventEmitter<any> = new EventEmitter<any>(false);
}