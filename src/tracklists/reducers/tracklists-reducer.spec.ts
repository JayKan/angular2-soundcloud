import { Map } from 'immutable';
import { SearchActions } from 'src/search/serach-actions';
import { TracklistRecord, Tracklist } from '../models/tracklist';
import { TracklistActions } from '../tracklist-actions';
import { tracklistsReducer } from './tracklists-reducer';

describe('tracklists', () => {
  describe('tracklistReducer', () => {
    let actions: TracklistActions;
    let data: any;
    let initialState: Map<string, any>;

    beforeEach(() => {
      actions = new TracklistActions();
      data = {
        collection: [ { id: 1 } ],
        next_href: 'http://next/2'
      };
      initialState = Map({
        currentTracklistId: 'tracklist/1',
        'tracklist/1': new TracklistRecord({ id: 'tracklist/1' }),
        'tracklist/2': new TracklistRecord({ id: 'tracklist/2' })
      });
    });

    describe('default state case', () => {
      it('should return the initial state', () => {
        let tracklists = tracklistsReducer(undefined, { type: 'UNDEFINED' });
        expect(tracklists instanceof Map).toBe(true);
        expect(tracklists.get('currentTracklistId')).toBe(null);
      });
    });

    describe('FETCH_TRACKS_FULFILLED action', () => {
      it('should update current tracklist with provided payload', () => {
        let tracklists = tracklistsReducer(initialState, actions.fetchTracksFulfilled(data, 'tracklist/2'));
        let tracklist: Tracklist = tracklists.get('tracklist/2');
        expect(tracklist.trackIds.size).toBe(1);
      });
    });

    describe('LOAD_NEXT_TRACKS action', () => {
      it('should update current tracklist', () => {
        let tracklist = initialState.get('tracklist/1');
        let tracklists = tracklistsReducer(initialState, actions.loadNextTracks());
        expect(tracklists.get('tracklist/1')).not.toBe(tracklist);
      });
    });

    describe('LOAD_SEARCH_RESULTS action', () => {
      let action: any;
      let query: any;
      let tracklistId: any;

      beforeEach(() => {
        query = 'query';
        tracklistId = `search/${query}`;
        action = {
          type: SearchActions.LOAD_SEARCH_RESULTS,
          payload: {
            tracklistId
          }
        };
      });

      it('should set currentTracklistId with payload.tracklistId', () => {
        let tracklists = tracklistsReducer(initialState, action);
        expect(tracklists.get('currentTracklistId')).toBe(tracklistId);
      });

      it('should add a new tracklist if tracklist does not exist', () => {
        let tracklists = tracklistsReducer(initialState, action);
        expect(tracklists.has(tracklistId)).toBe(true);
      });
    });

    describe('MOUNT_TRACKLIST action', () => {
      it('should mount tracklist with payload.tracklistId', () => {
        let tracklists = tracklistsReducer(undefined, actions.mountTracklist('tracklist/1'));
        expect(tracklists.get('currentTracklistId')).toBe('tracklist/1');
      });
    });
  });
});