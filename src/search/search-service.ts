import 'rxjs/add/operator/let';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app';
import { getSearchQuery, getSearchQueryV2 } from './reducers/selectors';
import { SearchActions } from './serach-actions';

@Injectable()
export class SearchService {
  query$: Observable<string>;

  constructor(private actions: SearchActions, private store$: Store<AppState>) {
    // this.query$ = store$.let(getSearchQuery());
    this.query$ = getSearchQueryV2(store$);
  }

  loadSearchResults(query: string): void {
    if (typeof query === 'string' && query.length) {
      console.log('Firing loadSearchQuery() action...');
      this.store$.dispatch(
        this.actions.loadSearchResults(query)
      );
    }
  }
}