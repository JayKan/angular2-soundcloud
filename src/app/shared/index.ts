import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from '../components/icon';
import { IconButtonComponent } from '../components/icon-button';
import { ContentHeaderComponent } from '../components/content-header';
import { LoadingIndicatorComponent } from '../components/loading-indicator';
import { AudioTimelineComponent } from '../components/audio-timeline';

import { FormatIntegerPipe } from '../pipes/format-integer';
import { FormatTimePipe } from '../pipes/format-time';

@NgModule({
  declarations: [
    // components
    IconComponent,
    IconButtonComponent,
    LoadingIndicatorComponent,
    ContentHeaderComponent,
    AudioTimelineComponent,

    // pipes
    FormatIntegerPipe,
    FormatTimePipe

  ],
  exports: [
    // components
    IconComponent,
    IconButtonComponent,
    LoadingIndicatorComponent,
    ContentHeaderComponent,
    AudioTimelineComponent,

    // pipes
    FormatIntegerPipe,
    FormatTimePipe,

    // modules
    CommonModule
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule {}