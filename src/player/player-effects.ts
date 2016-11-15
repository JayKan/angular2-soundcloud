import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { AppState } from '../app';
import { getPlayerTracklistCursor } from './reducers/selectors';
import { PlayerActions } from './player-actions';
import { playerStorage } from './player-storage';

@Injectable()
export class PlayerEffects {
  constructor(
    private actions$: Actions,
    private playerActions: PlayerActions,
    private store$: Store<AppState>
  ) {}

  @Effect()
  audioEnded$: Observable<Action> = this.actions$
    .ofType(PlayerActions.AUDIO_ENDED)
    .withLatestFrom(this.store$.let(getPlayerTracklistCursor(false)), (action, cursor) => cursor)
    .filter(cursor => !!cursor.nextTrackId)
    .map(cursor => this.playerActions.playSelectedTrack(cursor.nextTrackId));

  @Effect()
  audioVolumeChanged$: Observable<Action> = this.actions$
    .ofType(PlayerActions.AUDIO_VOLUME_CHANGED)
    .do(action => playerStorage.volume = action.payload.volume)
    .ignoreElements();
}