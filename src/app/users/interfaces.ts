import { Map, Record } from 'immutable';

export interface UserData {
  avatar_url: string;
  city?: string;
  country?: string;
  followers_count?: number;
  followings_count?: number;
  full_name?: string;
  id: number;
  playlist_count?: number;
  public_favorites_count?: number;
  track_count?: number;
  username: string;
}