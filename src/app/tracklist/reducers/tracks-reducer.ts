import { Action, ActionReducer } from '@ngrx/store';
import { Map } from 'immutable';
import { Track, TrackData, createTrack } from '../models/tracklist.models';
import { TracklistActions } from '../tracklist-actions';

export type TracksState = Map<number, Track>;
const initialState: TracksState = Map<number, Track>();

export const tracksReducer: ActionReducer<TracksState> = (state: TracksState = initialState, action: Action): TracksState => {
  switch (action.type) {
    case TracklistActions.FETCH_TRACKS_FULFILLED:
      return state.withMutations(tracks => {
        action.payload.collection.forEach((data: TrackData) => {
          tracks.set(data.id, createTrack(data));
        });
      });

    default:
      return state;
  }
};



