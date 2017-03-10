import { Action, ActionReducer } from '@ngrx/store';
import { Map } from 'immutable';
import { Track, TrackData, createTrack } from '../models/track';
import { TracklistActions } from '../tracklist-actions';

export type TracksState = Map<number, Track>;
const initialState: TracksState = Map<number, Track>();

export const tracksReducer: ActionReducer<TracksState> = (state: TracksState = initialState, { type, payload }: Action): TracksState => {
  switch (type) {
    case TracklistActions.FETCH_TRACKS_FULFILLED:
      return state.withMutations(tracks => {
        payload.collection.forEach((data: TrackData) => {
          tracks.set(data.id, createTrack(data));
        });
      });


    default:
      return state;
  }
};