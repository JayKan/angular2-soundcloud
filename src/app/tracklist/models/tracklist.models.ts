import { Map, List, Record } from 'immutable';
import { formatTrackTitle, streamUrl, trackImageUrl, waveformUrl } from '../utils';

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
export const TracklistRecord = Record({
  currentPage: 0,
  hasNextPage: null,
  hasNextPageInStore: null,
  id: null,
  isNew: null,
  isPending: false,
  nextUrl: null,
  pageCount: 0,
  trackIds: List()
});

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

export const TrackRecord = Record({
  artworkUrl: null,
  duration: null,
  id: null,
  liked: null,
  likesCount: null,
  permalinkUrl: null,
  playbackCount: null,
  streamable: null,
  streamUrl: null,
  title: null,
  userId: null,
  username: null,
  userPermalinkUrl: null,
  waveformUrl: null
});

export interface TrackData {
  artwork_url: string;
  duration: number;
  favoritings_count?: number;
  id: number;
  likes_count?: number;
  permalink_url: string;
  playback_count: number;
  stream_url: string;
  streamable: boolean;
  title: string;
  user: {
    avatar_url: string;
    id: number;
    permalink_url: string;
    username: string;
  };
  user_favorite?: boolean;
  waveform_url: string;
}

export function createTrack(data: TrackData): Track {
  return new TrackRecord({
    artworkUrl: trackImageUrl(data),
    duration: data.duration,
    id: data.id,
    liked: !!data.user_favorite,
    likesCount: data.favoritings_count || data.likes_count || 0,
    permalinkUrl: data.permalink_url,
    playbackCount: data.playback_count || 0,
    streamable: data.streamable,
    streamUrl: data.streamable ? streamUrl(data.stream_url) : null,
    title: formatTrackTitle(data.title),
    userId: data.user.id,
    username: data.user.username,
    userPermalinkUrl: data.user.permalink_url,
    waveformUrl: waveformUrl(data.waveform_url)
  }) as Track;
}

export interface TracklistCursor extends Map<string, number> {
  currentTrackId: number;
  nextTrackId: number;
  previousTrackId: number;
}

export const TracklistCursorRecord = Record({
  currentTrackId: null,
  nextTrackId: null,
  previousTrackId: null
});

export function getTracklistCursor(trackId: number, { trackIds }: Tracklist): TracklistCursor {
  let index: number = trackIds.indexOf(trackId);
  let nextTrackId = null;
  let previousTrackId = null;

  if (index !== -1) {
    if (index > trackIds.size - 1) {
      nextTrackId = trackIds.get(index + 1);
    }

    if (index > 0) {
      previousTrackId = trackIds.get(index - 1);
    }
  }

  return new TracklistCursorRecord({
    currentTrackId: trackId,
    nextTrackId,
    previousTrackId
  }) as TracklistCursor;
}



