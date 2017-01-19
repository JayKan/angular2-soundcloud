import { Injectable } from '@angular/core';
import { EventManagerPlugin } from '@angular/platform-browser/src/dom/events/event_manager';

@Injectable()
export class CustomEventPlugin extends EventManagerPlugin {

  private _eventMap: Object = {
    'clickOutside'    : 'click',
    'mousedownOutside': 'mousedown',
    'mouseupOutside'  : 'mouseup',
    'mousemoveOutside': 'mousemove'
  };

  supports(eventName: string): boolean {
    console.log('Event name: ', eventName);
    return this._eventMap.hasOwnProperty(eventName);
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const zone = this.manager.getZone();
    const documentEvent = this._eventMap[eventName];
    const triggerEventInZone = (event: any) => zone.run(() => handler(event));

    const checkEventTarget = (event: any) => {
      let current = event.target;
      do {
        if (current === element)
          return;
      } while (current.parentNode && (current = current.parentNode));

      triggerEventInZone(event);
    };

    const addDocumentEventListener = () => document.addEventListener(documentEvent, checkEventTarget, true);
    const removeDocumentEventListener = () => document.removeEventListener(documentEvent, checkEventTarget, true);

    zone.runOutsideAngular(addDocumentEventListener);
    return removeDocumentEventListener;
  }

  addGlobalEventListener(target: string, eventName: string, handler: Function): Function {
    if ((target === 'document') || (target === 'window')) {
      return;
    }
    return this.addEventListener(document.body, eventName, handler);
  }
}