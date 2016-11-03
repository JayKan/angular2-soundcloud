import { PlayerState, TimesState } from 'src/player';
import { SearchState } from 'src/search';
import { TracklistsState, TracksState } from 'src/tracklists';
import { UsersState } from 'src/users';

export interface AppState {
  player: PlayerState;
  search: SearchState;
  times: TimesState;
  tracklists: TracklistsState;
  tracks: TracksState;
  users: UsersState;
}
