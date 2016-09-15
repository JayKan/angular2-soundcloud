import { Map, List } from 'immutable';

export interface Times {
  bufferedTime: number;
  currentTime: number;
  duration: number;
  percentBuffered: string;
  percentCompleted: string;
}

export interface TimesState extends Times, Map<string,number|string> { }

export interface Tracklist extends Map<string, any> {
  currentPage: number;
  hasNextPage: boolean;
  hasNextPageInStore: boolean;
  id: string;
  isNew: boolean;
  isPending: boolean;
  nextUrl: string;
  pageCount: number;
  trackIds: List<number>;
}

export interface Track extends Map<string, any> {
  artworkUrl: string;
  duration: number;
  id: number;
  liked: boolean;
  likesCount: number;
  permalinkUrl: string;
  playbackCount: number;
  streamable: boolean;
  streamUrl: string;
  title: string;
  userId: number;
  username: string;
  userPermalinkUrl: string;
  waveformUrl: string;
}

