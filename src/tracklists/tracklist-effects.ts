import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from 'src/app';
import { ApiService } from 'src/core';
import { getCurrentTracklist } from './reducers/selectors';
import { TracklistActions } from './tracklist-actions';

@Injectable()
export class TracklistEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store$: Store<AppState>,
    private tracklistActions: TracklistActions
  ) {}

  @Effect()
  loadNextTracks$: Observable<Action> = this.actions$
    .ofType(TracklistActions.LOAD_NEXT_TRACKS)
    .withLatestFrom(this.store$.let(getCurrentTracklist()), (action, tracklist) => tracklist)
    .filter(tracklist => tracklist.isPending)
    .switchMap(tracklist => {
      return this.api.fetch(tracklist.nextUrl)
        .map(data => this.tracklistActions.fetchTracksFulfilled(data, tracklist.id))
        .catch(error => Observable.of(this.tracklistActions.fetchTracksFailed(error)));
    });

  @Effect()
  loadUserLikes$: Observable<Action> = this.actions$
    .ofType(TracklistActions.LOAD_FEATURED_TRACKS)
    .withLatestFrom(this.store$.let(getCurrentTracklist()), (action, tracklist) => ({
      payload: action.payload,
      tracklist
    }))
    .filter(({ tracklist }) => tracklist.isNew)
    .switchMap(({ payload }) => {
      return this.api.fetchUserLikes(payload.userId)
        .map(data => {
          return this.tracklistActions.fetchTracksFulfilled(data, payload.tracklistId)
        })
        .catch(error => Observable.of(this.tracklistActions.fetchTracksFailed(error)));
    })
}