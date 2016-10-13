import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TimesState } from '../../player';

@Component({
  selector: 'waveform-timeline',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
  <div class="waveform-timeline" [ngClass]="{'waveform-timeline-ready': ready}">
    <audio-timeline 
      *ngIf="isActive"
      [times]="times | async"
      (seek)="seek.emit($event)">      
    </audio-timeline>
    
    <waveform
      [src]="waveformUrl"
      (ready)="ready = $event">    
    </waveform>
  </div>
  `,
  styles: [
    require('./waveform-timeline.scss')
  ]
})
export class WaveformTimelineComponent {
  @Input() isActive: boolean = false;
  @Input() times: Observable<TimesState>;
  @Input() waveformUrl: string;

  @Output() seek: EventEmitter<any> = new EventEmitter<any>(false);

  ready: boolean = false;
}