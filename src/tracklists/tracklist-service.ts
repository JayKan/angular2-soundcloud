import 'rxjs/add/operator/let';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { AppState } from 'src/app';
import { Tracklist } from './models/tracklist';
import { Track } from './models/track';
import { getTracksForCurrentTracklistV2, getCurrentTracklistV2 } from './reducers/selectors';
import { TracklistActions } from './tracklist-actions';

@Injectable()
export class TracklistService {
  tracklist$: Observable<Tracklist>;
  tracks$: Observable<List<Track>>;

  constructor(private actions: TracklistActions, private store$: Store<AppState>) {
    this.tracklist$ = getCurrentTracklistV2(store$);
    this.tracks$ = getTracksForCurrentTracklistV2(store$);
  }

  loadFeaturedTracks(): void {
    this.store$.dispatch(
      this.actions.loadFeaturedTracks()
    );
  }

  loadNextTracks(): void {
    this.store$.dispatch(
      this.actions.loadNextTracks()
    );
  }
}