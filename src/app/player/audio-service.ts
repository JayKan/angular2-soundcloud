import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PLAYER_MAX_VOLUME,  PLAYER_VOLUME_INCREMENT } from '../constants';
import { Times } from './interfaces';
import { AudioSource } from './audio-source';
import { PlayerActions } from './player-actions';

@Injectable()
export class AudioService {
  events$: Observable<Action>;

  constructor(actions: PlayerActions, protected audio: AudioSource) {
    this.events$ = Observable.merge(
      Observable.fromEvent(audio, 'ended').map(actions.audioEnded),
      Observable.fromEvent(audio, 'pause').map(actions.audioPaused),
      Observable.fromEvent(audio, 'playing').map(actions.audioPlaying),
      Observable.fromEvent(audio, 'timeupdate', this.getTimes).map(actions.audioTimeUpdated),
      Observable.fromEvent(audio, 'volumechange').map(() => actions.audioVolumeChanged(this.volume))
    )
  }

  get volume(): number {
    return Math.floor(this.audio.volume * 100);
  }

  set volume(volume: number) {
    this.audio.volume = volume / 100;
  }

  decreaseVolume(): void {
    let volume: number = this.volume - PLAYER_VOLUME_INCREMENT;
    if (volume >= 0) this.volume = volume;
  }

  increaseVolume(): void {
    let volume: number = this.volume + PLAYER_VOLUME_INCREMENT;
    if (volume <= PLAYER_MAX_VOLUME) this.volume = volume;
  }

  pause(): void {
    this.audio.pause();
  }

  play(url?: string): void {
    if (url) this.audio.src = url;
    let promise: any = this.audio.play();
    // tslint:disable-line:no-empty
    if (promise && promise.catch) promise.catch(() => {});
  }

  seek(time: number): void {
    this.audio.currentTime = time;
  }

  private getTimes(event: Event): Times {
    const { buffered, currentTime, duration }  = event.target as HTMLAudioElement;
    const bufferedTime = buffered.length ? buffered.end(0) : 0;
    return {
      bufferedTime,
      currentTime,
      duration,
      percentBuffered: `${(bufferedTime / duration * 100) || 0}%`,
      percentCompleted: `${(currentTime / duration * 100) || 0}%`
    };
  }
}


