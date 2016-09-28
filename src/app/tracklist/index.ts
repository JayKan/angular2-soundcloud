import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';

import { TrackCardComponent } from './components/tracklist-card';
import { TracklistComponent } from './components/tracklist';
import { TracklistItemsComponent } from './components/tracklist-items';
import { WaveformComponent } from './components/waveform';
import { WaveformTimelineComponent } from './components/waveform-timeline';

import { TracklistActions } from './tracklist-actions';
import { TracklistService } from './tracklist-service';

export { TracklistActions, TracklistService };
export { createTrack, Track, TrackData, TrackRecord, Tracklist, TracklistRecord } from './models/tracklist.models';
export { getCurrentTracklist, getTracks, getTracklists } from './reducers/selectors';
export { TracklistsState, tracklistsReducer } from './reducers/tracklists-reducer';
export { TracksState, tracksReducer } from './reducers/tracks-reducer';
export * from './models/tracklist.models';

@NgModule({
  declarations: [
    TracklistComponent,
    TrackCardComponent,
    TracklistItemsComponent,
    WaveformComponent,
    WaveformTimelineComponent
  ],
  exports: [
    TracklistComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ],
  providers: [
    TracklistActions,
    TracklistService
  ]
})
export class TracklistModule {}