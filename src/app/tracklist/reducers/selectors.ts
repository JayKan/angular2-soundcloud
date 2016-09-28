import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { List } from 'immutable';
import { AppState } from '../../';
import { TRACKS_PER_PAGE } from '../../constants';
import { Selector } from '../../core';
import { Tracklist, Track } from '../models/tracklist.models';
import { TracklistsState } from './tracklists-reducer';
import { TracksState } from './tracks-reducer';

export function getTracklists(): Selector<AppState, TracklistsState> {
  return state$ => state$
    .map(state => state.tracklists)
    .distinctUntilChanged();
}

export function getTracks(): Selector<AppState, TracksState> {
  return state$ => state$
    .map(state => state.tracks)
    .distinctUntilChanged();
}

export function getCurrentTracklist(): Selector<AppState, Tracklist> {
  return state$ => state$
    .let(<any>getTracklists())
    .map((tracklists: any) => tracklists.get(tracklists.get('currentTracklistId')))
    .distinctUntilChanged();
}

export function getTracksForCurrentTracklist(): Selector<AppState, List<Track>> {
  return state$ => state$
    .let(<any>getCurrentTracklist())
    .distinctUntilChanged((previous: any, next: any) => {
      return previous.currentPage === next.currentPage &&
        previous.trackIds === next.trackIds;
    })
    .withLatestFrom(state$.let(<any>getTracks()), (tracklist, tracks: any) => {
      return tracklist.trackIds
        .slice(0, tracklist.currentPage * TRACKS_PER_PAGE)
        .map(id => tracks.get(id)) as List<Track>;
    });
}