import { PlayerActions } from './player-actions';
import { TimesStateRecord, TimesState } from './interfaces';

describe('player', () => {
  describe('PlayerActions', () => {
    let actions: PlayerActions;

    beforeEach(() => {
      actions = new PlayerActions();
    });

    describe('audioEnded()', () => {
      it('should create an AUDIO_ENDED action', () => {
        expect(actions.audioEnded())
          .toEqual({
            type: PlayerActions.AUDIO_ENDED
          });
      });
    });

    describe('audioPaused()', () => {
      it('should create an AUDIO_PAUSED action', () => {
        expect(actions.audioPaused())
          .toEqual({
            type: PlayerActions.AUDIO_PAUSED
          });
      });
    });

    describe('audioPlaying()', () => {
      it('should create an AUDIO_PLAYING action', () => {
        expect(actions.audioPlaying())
          .toEqual({
            type: PlayerActions.AUDIO_PLAYING
          });
      });
    });

    describe('audioTimeUpdated()', () => {
      it('should create an AUDIO_TIME_UPDATED action', () => {
        let times: TimesState = new TimesStateRecord({
          bufferedTime: 200,
          currentTime: 100,
          duration: 400,
          percentBuffered: '50%',
          percentCompleted: '25%'
        }) as TimesState;

        expect(actions.audioTimeUpdated(times))
          .toEqual({
            type: PlayerActions.AUDIO_TIME_UPDATED,
            payload: times
          });
      });
    });

    describe('audioVolumeChanged()', () => {
      it('should create an AUDIO_VOLUME_CHANGED action', () => {
        let volume = 5;
        expect(actions.audioVolumeChanged(volume))
          .toEqual({
            type: PlayerActions.AUDIO_VOLUME_CHANGED,
            payload: {
              volume
            }
          });
      });
    });

    describe('playSelectedTrack()', () => {
      it('should create an PLAY_SELECTED_TRACK action when trackId and tracklistId are provided', () => {
        let trackId = 123;
        let tracklistId = 'tracklist/1';

        expect(actions.playSelectedTrack(trackId, tracklistId))
          .toEqual({
            type: PlayerActions.PLAY_SELECTED_TRACK,
            payload: {
              trackId: trackId,
              tracklistId: tracklistId
            }
          });
      });

      it('should create an PLAY_SELECTED_TRACK type action when trackId is provided', () => {
        let trackId = 123;

        expect(actions.playSelectedTrack(trackId))
          .toEqual({
            type: PlayerActions.PLAY_SELECTED_TRACK,
            payload: {
              trackId,
              tracklistId: undefined
            }
          });
      });
    });
  });
});