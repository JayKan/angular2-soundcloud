import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[click-target]',
  host: {
    // Track mouse events at the global level.
    "(document: click)": "compareEvent( $event )",
    "(document: mousedown)": "compareEvent( $event )",
    "(document: mouseup)": "compareEvent( $event )",
    // Track mouse events at the host (component) level.
    "(click)": "trackEvent( $event )",
    "(mousedown)": "trackEvent( $event )",
    "(mouseup)": "trackEvent( $event )"
  }
})
export class ClickTargetDirective {

  hostEvent: any = null;

  @Output() clickOutside: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() mousedownOutside: EventEmitter<any> = new EventEmitter<any>(false);
  @Output() mouseupOutside: EventEmitter<any> = new EventEmitter<any>(false);

  compareEvent(globalEvent: any): void {
    // If the last known host event and the given global event are
    // the same reference, we know that the event originated within
    // the host (and then bubbled up out of the host and eventually
    // hit the global binding). As such, it can't be an "outside"
    // event and therefore we should ignore it.
    if (this.hostEvent === globalEvent ) {
      return;
    }

    // Now that we know the event was initiated outside of the host,
    // we can emit the output event. By convention above, we know
    // that we can simply use the event type to reference the
    // correct output event stream.
    this[ globalEvent.type + "Outside" ].emit( globalEvent );
  }

  trackEvent(event: any): void {
    this.hostEvent = event;
  }
}