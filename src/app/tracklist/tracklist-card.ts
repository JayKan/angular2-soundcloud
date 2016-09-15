import { Component, ViewEncapsulation, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimesState, Track } from './tracklist.models';

@Component({
  selector: 'track-card',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./tracklist-card.html'),
  styles: [
    require('./tracklist-card.scss')
  ]
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

