import 'rxjs/add/operator/let';
import 'rxjs/add/operator/pluck';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PLAYER_INITIAL_VOLUME } from '../constants'
import { Track, TracklistCursor } from '../tracklist'
import { PlayerState, TimesState } from './interfaces';

import { AudioService } from './audio-service';
import { AudioSource } from './audio-source';
import { PlayerActions } from './player-actions';
import { playerStorage } from './player-storage';


@Injectable()
export class PlayerService extends AudioService {
  currentTime$: Observable<number>;
  cursor$: Observable<TracklistCursor>;
  player$: Observable<PlayerState>;
  times$: Observable<TimesState>;
  track$: Observable<Track>;

  constructor(private actions: PlayerActions, audio: AudioSource, private store$: Store<any>) {
    super(actions, audio);

    this.events$.subscribe(action => store$.dispatch(action));
    this.volume = playerStorage.volume || PLAYER_INITIAL_VOLUME;

    // this.cursor$ = store$.let(<any>)

  }
}