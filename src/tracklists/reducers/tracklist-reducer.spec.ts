import { is, List } from 'immutable';
import { TRACKS_PER_PAGE } from 'src/constants';
import { SearchActions } from 'src/search/serach-actions';
import { testUtils } from 'src/utils/test';
import { Tracklist, TracklistRecord } from '../models/tracklist';
import { TracklistActions } from '../tracklist-actions';
import { tracklistReducer } from './tracklist-reducer';

describe('tracklists', () => {
  describe('tracklistReducer', () => {
    let actions: TracklistActions;
    let tracklistId: string;
    let tracksPerPage: number;
    let expectedTracklist: any;
    let initialTracklist: any;

    beforeEach(() => {
      actions = new TracklistActions();
      tracklistId = 'tracklist/1';
      tracksPerPage = 3;
      expectedTracklist = new TracklistRecord({ id: tracklistId, tracksPerPage }) as Tracklist;
      initialTracklist = new TracklistRecord({ id: tracklistId, tracksPerPage }) as Tracklist;
    });

    describe('default case', () => {
      it('should return default state', () => {
        let tracklist = tracklistReducer(undefined, { type: 'UNDEFINED' });
        expect(is(tracklist, new TracklistRecord())).toBe(true);
      });
    });

    describe('FETCH_TRACKS_FULFILLED action', () => {
      it('should set tracklist.isNew to false', () => {
        initialTracklist = initialTracklist.set('isNew', true);
        // let tracklist = tracklistReducer(
        //   initialTracklist,
        //   actions.fetchTracksFulfilled({ collections: [] }, tracklistId)
        // );
        // expect(tracklist.isNew).toBe(false);
      });

      it('should set tracklist.isPending to false', () => {

      });

      it('should set tracklist.trackIds with unique ids', () => {

      });

      it('should NOT update tracklist.trackIds if there are no unique ids', () => {

      });

      it('should update tracklist when number of tracks received is zero', () => {

      });

      it('should update tracklist when number of tracks received is less than tracksPerPage', () => {});

      it('should update tracklist when number of tracks received is equals to tracklist.tracksPerPage', () => {});
    });

    describe('LOAD_NEXT_TRACKS action', () => {

    });

    describe('LOAD_SEARCH_RESULTS', () => {

    });
  });
});