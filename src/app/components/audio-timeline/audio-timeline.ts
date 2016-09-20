import { Component, ViewEncapsulation, ChangeDetectionStrategy, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TimesState } from '../../player';

@Component({
  selector: 'audio-timeline',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template:`
    <div class="bar bar-buffered"
        [ngClass]="{'bar-animated': times?.bufferedTime !== 0}"
        [ngStyle]="{'width': times?.percentBuffered}">        
    </div>
    
    <div class="bar bar-elapsed"
        [ngStyle]="{'width': times?.percentCompleted}">   
    </div>            
  `,
  styles: [
    require('./audio-timeline.scss')
  ]
})
export class AudioTimelineComponent {
  @Input() times: TimesState;
  @Output() seek: EventEmitter<any> = new EventEmitter<any>(false);

  @HostListener('click', ['$event'])
  onClick(event: any): void {
    const { currentTarget, pageX } = event;
    this.seek.emit(
      (pageX - currentTarget.getBoundingClientRect().left) / currentTarget.offsetWidth * this.times.duration
    );
  }
}