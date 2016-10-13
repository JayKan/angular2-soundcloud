import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { TracklistModule } from '../tracklist';

import { UserCardComponent } from './components/user-card';
import { UserPageComponent } from './pages/user-page';

import { UserActions } from './user-actions';
import { UserEffects } from './user-effects';
import { UserService } from './user-service';

export { UserActions, UserService };
export { User, UserData, UserRecord } from './models/user';
export { usersReducer, UsersState } from './reducers/users-reducer';

const routes: Routes = [
  { path: 'users/:id/:resource', component: UserPageComponent }
];

@NgModule({
  declarations: [
    UserCardComponent,
    UserPageComponent
  ],
  imports: [
    SharedModule,
    TracklistModule,
    RouterModule.forChild(routes),
    EffectsModule.run(UserEffects)
  ],
  providers: [
    UserActions,
    UserService
  ]
})
export class UsersModule {}