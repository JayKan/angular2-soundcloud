import 'rxjs/add/operator/let';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../';
import { Tracklist, Track } from './models/tracklist.models';
import { getCurrentTracklist, getTracksForCurrentTracklist } from './reducers/selectors';
import { TracklistActions } from './tracklist-actions';

@Injectable()
export class TracklistService {
  tracklist$: Observable<Tracklist>;
  tracks$: Observable<Track>;

  constructor(private actions: TracklistActions, private store$: Store<AppState>) {
    this.tracklist$ = store$.let(<any>getCurrentTracklist());
    this.tracks$ = store$.let(<any>getTracksForCurrentTracklist());
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