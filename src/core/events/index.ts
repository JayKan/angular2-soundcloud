import { CustomEventPlugin } from './custom-event-plugin';
import { EventManagerPlugin } from '@angular/platform-browser/src/dom/events/event_manager';

export { CustomEventPlugin } from './custom-event-plugin';

export const CUSTOM_EVENT_PROVIDER: any[] = [
  {
    provide: EventManagerPlugin,
    useClass: CustomEventPlugin,
    multi: true
  }
];