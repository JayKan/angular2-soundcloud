import { Map, Record } from 'immutable';

export interface PlayerState extends Map<string, any> {
  isPlaying: boolean;
  trackId: number;
  tracklistId: string;
  volume: number;
}

export const PlayerStateRecord = Record({
  isPlaying: false,
  trackId: null,
  tracklistId: null,
  volume: null
});

export interface Times {
  bufferedTime: number;
  currentTime: number;
  duration: number;
  percentBuffered: string;
  percentCompleted: string;
}

export interface TimesState extends Times, Map<string, number|string> { }

export const TimesStateRecord = Record({
  bufferedTime: 0,
  currentTime: 0,
  duration: 0,
  percentBuffered: '0%',
  percentCompleted: '0%'
});



