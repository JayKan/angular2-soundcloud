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
import { AppState } from '../';
import { ApiService } from '../core';
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

}