import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from 'src/app';
import { User } from './models/user';
import { getCurrentUser, getCurrentUserV2 } from './reducers/selectors';
import { UserActions } from './user-actions';

@Injectable()
export class UserService {
  currentUser$: Observable<User>;

  constructor(private actions: UserActions, private store$: Store<AppState>) {
    // this.currentUser$ = store$.let(getCurrentUser());
    this.currentUser$ = getCurrentUserV2(store$);
  }

  loadResource(userId: number|string, resource: string): void {
    switch (resource) {
      case 'likes':
        this.loadUserLikes(userId);
        break;

      case 'tracks':
        this.loadUserTracks(userId);
        break;

      case 'followers':
        this.loadUserFollowers(userId);
        break;

      case 'following':
        this.loadUserFollowing(userId);
        break;
    }
  }

  loadUser(userId: number|string): void {
    // console.log('Fire load_user() action');
    this.store$.dispatch(
      this.actions.loadUser(userId)
    );
  }

  loadUserLikes(userId: number|string): void {
    // console.log('Fire load_user_likes() action');
    this.store$.dispatch(
      this.actions.loadUserLikes(userId)
    );
  }

  loadUserTracks(userId: number|string): void {
    // console.log('Fire load_user_tracks() action');
    this.store$.dispatch(
      this.actions.loadUserTracks(userId)
    );
  }

  loadUserFollowers(userId: number|string): void {

  }

  loadUserFollowing(userId: number|string): void {

  }
}