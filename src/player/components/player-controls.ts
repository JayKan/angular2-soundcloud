import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Track, TracklistCursor } from '../../../tracklist';
import { PlayerState } from '../reducers/player-state';

@Component({
  selector: 'player-controls',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <div class="player-controls">
    <div>
      <icon-button [icon]="'skip-previous'" (onClick)="previous()"></icon-button>
      <icon-button [icon]="player.isPlaying ? 'pause' : 'play'" (onClick)="player.isPlaying ? pause.emit() : play.emit()"></icon-button>
      <icon-button [icon]="'skip-next'" (onClick)="next()"></icon-button>
    </div>
    
    <div class="player-controls-time">{{ currentTime | async | formatTime }} / {{ track?.duration | formatTime:'ms' }}</div>
    <div class="player-controls-title">{{ track?.title }}</div>
    
    <div class="player-controls-volume">
      <icon-button [icon]="'remove'" (onClick)="decreaseVolume.emit()"></icon-button>
      <span>{{ player.volume | formatVolume }}</span>
      <icon-button [icon]="'add'" (onClick)="increaseVolume.emit()"></icon-button>
    </div>
  </div>
  `,
  styles: [
    require('./player-controls.scss')
  ]
})
export class PlayerControlsComponent {
  @Input() currentTime: Observable<number>;
  @Input() cursor: TracklistCursor;
  @Input() player: PlayerState;
  @Input() track: Track;

  @Output() decreaseVolume: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() increaseVolume: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() pause: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() play: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() select: EventEmitter<any> = new EventEmitter<any>(false);

  next(): void {
    if (this.cursor.nextTrackId) {
      this.select.emit(this.cursor.nextTrackId);
    }
  }

  previous(): void {
    if (this.cursor.previousTrackId) {
      this.select.emit(this.cursor.previousTrackId);
    }
  }
}