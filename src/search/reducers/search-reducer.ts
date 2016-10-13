import { Action, ActionReducer } from '@ngrx/store';
import { SearchActions } from '../serach-actions';
import { SearchState, SearchStateRecord } from './search-state';

const initialState: SearchState = new SearchStateRecord as SearchState;

export const searchReducer: ActionReducer<SearchState> = (state: SearchState = initialState, { payload, type }: Action): SearchState => {
  switch (type) {
    case SearchActions.LOAD_SEARCH_RESULTS:
      return state.set('query', payload.query) as SearchState;

    default:
      return state;
  }
};