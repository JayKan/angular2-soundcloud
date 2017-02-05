import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';
import { AppState } from 'src/app';
import { Selector } from 'src/core';
import { SearchState } from './search-state';

//================================================================
//  Search Selectors (v1)
//----------------------------------------------------------------
export function getSearchQuery(): Selector<AppState, string> {
  return state$ => state$
    .map((state: AppState) => state.search.query)
    .distinctUntilChanged();
}

//================================================================
//  Search Selectors (v2)
//----------------------------------------------------------------
export function getSearchState(state$: Observable<AppState>): Observable<SearchState> {
  return state$.select(state => state.search)
}
export function getQuery(state$: Observable<SearchState>): Observable<string> {
  return state$.select(state => state.query)
}
export const getSearchQueryV2 = compose(getQuery, getSearchState);