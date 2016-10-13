import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { AppState } from '../..';
import { Selector } from '../../core';

export function getSearchQuery(): Selector<AppState, string> {
  return state$ => state$
    .map((state: AppState) => state.search.query)
    .distinctUntilChanged();
}