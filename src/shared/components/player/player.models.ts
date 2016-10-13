import { Map, Record } from 'immutable';

export interface PlayerState extends Map<string, any> {
  isPlaying: boolean;
  trackId: number;
  tracklistId: string;
  volume: number;
}

export const PlayStateRecord = Record({
  isPlaying: false,
  trackId: null,
  tracklistId: null,
  volume: null
});
