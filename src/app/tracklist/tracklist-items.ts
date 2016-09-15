import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { Tracklist, Track } from './tracklist.models';

@Component({
  selector: 'tracklist-items',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: require('./tracklist-items.html'),
  styles: [
    require('./tracklist-items.scss')
  ]
})
export class TracklistItemsComponent {
  @Input() layout: string;

  get hasLineClamp(): boolean {
    return '-webkit-line-clamp' in document.body.style;
  }

}