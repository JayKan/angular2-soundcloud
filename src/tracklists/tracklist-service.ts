import 'rxjs/add/operator/let';

import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app';
import { Tracklist } from './models/tracklist';
import { Track } from './models/track';
import { getCurrentTracklist, getTracksForCurrentTracklist, getTracksForCurrentTracklistV2, getCurrentTracklistV2 } from './reducers/selectors';
import { TracklistActions } from './tracklist-actions';

@Injectable()
export class TracklistService {
  tracklist$: Observable<Tracklist>;
  tracks$: Observable<List<Track>>;

  constructor(private actions: TracklistActions, private store$: Store<AppState>) {
    // this.tracklist$ = store$.let(getCurrentTracklist());
    // this.tracks$ = store$.let(getTracksForCurrentTracklist());
    this.tracklist$ = getCurrentTracklistV2(store$);
    // this.tracklist$.subscribe(data => console.log('Tracklist: ', JSON.stringify(data)));
    this.tracks$ = getTracksForCurrentTracklistV2(store$);
  }

  loadFeaturedTracks(): void {
    this.store$.dispatch(
      this.actions.loadFeaturedTracks()
    );
  }

  loadNextTracks(): void {
    // console.log('##### loaded next tracks() ######');
    let action: Action = this.actions.loadNextTracks();
    this.store$.dispatch(action);
  }
}