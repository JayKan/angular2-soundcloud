import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { TracklistModule } from '../tracklist';

import { UserActions } from './user-actions';


export { UserActions };
export { UsersState } from './reducers/users-state';
export { UserData } from './interfaces';

@NgModule({

})
export class UsersModule {}

