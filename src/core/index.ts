import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { ApiService } from './api';
import { CUSTOM_EVENT_PROVIDER } from './events';
import { MEDIA_QUERY_PROVIDERS, MediaQueryResults, MediaQueryService } from './media-query';

export { ApiService, MediaQueryResults, MediaQueryService };
export { CUSTOM_EVENT_PROVIDER };
export * from './interfaces';

@NgModule({
  imports: [
    HttpModule
  ],
  providers: [
    ApiService,
    MEDIA_QUERY_PROVIDERS,
    CUSTOM_EVENT_PROVIDER
  ]
})
export class CoreModule {}