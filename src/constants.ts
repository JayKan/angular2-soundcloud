
export const APP_NAME = 'angular2-soundcloud';
export const API_BASE_URL = 'https://api.soundcloud.com';
export const API_TRACKS_URL = `${API_BASE_URL}/tracks`;
export const API_USERS_URL = `${API_BASE_URL}/users`;

export const CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID || 'f4323c6f7c0cd73d2d786a2b1cdae80c';
export const CLIENT_ID_PARAM = `client_id=${CLIENT_ID}`;

export const PAGINATION_LIMIT = 60;
export const PAGINATION_PARAMS = `limit=${PAGINATION_LIMIT}&linked_partitioning=1`;

export const IMAGE_DEFAULT_SIZE = 'large.jpg';
export const IMAGE_XLARGE_SIZE = 't500x500.jpg';

export const PLAYER_INITIAL_VOLUME = 10;
export const PLAYER_MAX_VOLUME = 100;
export const PLAYER_VOLUME_INCREMENT = 5;
export const PLAYER_STORAGE_KEY = `${APP_NAME}:player`;

//=====================================
//  TRACKLISTS
//-------------------------------------
export const FEATURED_TRACKLIST_USER_ID = 185676792;
export const TRACKS_PER_PAGE = 12;
export const FEATURED_TRACKLIST_ID = 'featured';

//=====================================
//  WAVEFORMS
//-------------------------------------
export const WAVEFORM_IMAGE_HOST = 'w1.sndcdn.com';
export const WAVEFORM_JSON_HOST = 'wis.sndcdn.com';