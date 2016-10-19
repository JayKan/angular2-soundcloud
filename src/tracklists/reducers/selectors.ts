import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/combineLatest';

import { List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { AppState } from 'src/app';
import { TRACKS_PER_PAGE } from '../../constants';
import { Selector } from 'src/core';
import { Tracklist } from '../models/tracklist';
import { Track } from '../models/track';
import { TracklistsState } from './tracklists-reducer';
import { TracksState } from './tracks-reducer';


//================================================================
//  Tracklists Selectors (v1)
//----------------------------------------------------------------
export function getTracklists(): Selector<AppState, TracklistsState> {
  return state$ => state$
    .map((state: AppState) => state.tracklists)
    .distinctUntilChanged();
}
export function getTracks(): Selector<AppState, TracksState> {
  return state$ => state$
    .map((state: AppState) => state.tracks)
    .distinctUntilChanged();
}
export function getCurrentTracklist(): Selector<AppState, Tracklist> {
  return state$ => state$
    .let(getTracklists())
    .map(tracklists => {
      let currentTracklistId = tracklists.get('currentTracklistId');
      return tracklists.get(currentTracklistId);
    });
}
export function getTracksForCurrentTracklist(): Selector<AppState, List<Track>> {
  return state$ => state$
    .let(<any>getCurrentTracklist())
    .distinctUntilChanged((previous: any, next: any) => {
      return previous.currentPage === next.currentPage &&
        previous.trackIds === next.trackIds;
    })
    .withLatestFrom(state$.let(<any>getTracks()), (tracklist, tracks: any) => {
      console.log('Tracklist: ', tracklist);
      return tracklist.trackIds
        .slice(0, tracklist.currentPage * TRACKS_PER_PAGE)
        .map(id => tracks.get(id)) as List<Track>;
    });
}

//================================================================
//  Tracklists Selectors (v2)
//----------------------------------------------------------------
export function getTracklistsState(state$: Observable<AppState>) {
  return state$.select(state => state.tracklists);
}

export function getTracksState(state$: Observable<AppState>) {
  return state$.select(state => state.tracks);
}

export const getCurrentTracklistV2 = (state$: Observable<AppState>): Observable<Tracklist> => {
  return state$.let(getTracklistsState)
    .map(tracklists => {
      const currentTracklistId = tracklists.get('currentTracklistId');
      return tracklists.get(currentTracklistId)
    })
    .distinctUntilChanged();
};

export function getTracksForCurrentTracklistV2(state$: Observable<AppState>): Observable<List<Track>> {
  return state$.let(getCurrentTracklistV2)
    .distinctUntilChanged((previous: Tracklist, next: Tracklist) => {
      return previous.currentPage === next.currentPage &&
        previous.trackIds === next.trackIds;
    })
    .withLatestFrom(state$.let(getTracksState), (tracklist: Tracklist, tracks: TracksState) => {
      return tracklist.trackIds
        .slice(0, tracklist.currentPage * TRACKS_PER_PAGE)
        .map(id => tracks.get(id)) as List<Track>;
    });
}
