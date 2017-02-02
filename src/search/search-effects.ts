import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../app';
import { ApiService } from '../core';
import { getCurrentTracklist, getCurrentTracklistV2 } from 'src/tracklists';
import { TracklistActions } from 'src/tracklists/tracklist-actions';
import { SearchActions } from './serach-actions';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store$: Store<AppState>,
    private tracklistActions: TracklistActions
  ) {}

  @Effect()
  loadSearchResults = this.actions$
    .ofType(SearchActions.LOAD_SEARCH_RESULTS)
    .withLatestFrom(getCurrentTracklistV2(this.store$), (action, tracklist) => ({
      payload: action.payload,
      tracklist
    }))
    .filter(({ tracklist }) => tracklist.isNew)
    .switchMap(({ payload }) => {
      return this.api.fetchSearchResults(payload.query)
        .map(data => {
          return this.tracklistActions.fetchTracksFulfilled(data, payload.tracklistId)
        })
        .catch(error => Observable.of(this.tracklistActions.fetchTracksFailed(error)));
    });
}