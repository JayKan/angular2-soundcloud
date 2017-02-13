import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { AppState } from 'src/app';
import { Selector } from 'src/core';
import { User } from '../models/user';
import { UsersState } from './users-reducer';

//================================================================
//  Users Selectors (v1)
//----------------------------------------------------------------
export function getCurrentUser(): Selector<AppState, User> {
  return state$ => state$
    .let(getUsers())
    .map(users => users.get(users.get('currentUserId')))
    .distinctUntilChanged();
}

export function getUsers(): Selector<AppState, UsersState> {
  return state$ => state$
    .map(state => state.users)
    .distinctUntilChanged();
}

//================================================================
//  Users Selectors (v2)
//----------------------------------------------------------------
export function getCurrentUsersState(state$: Observable<AppState>): Observable<UsersState> {
  return state$.select(state => state.users);
}
export function getCurrentUserV2(state$: Observable<AppState>): Observable<User> {
  return state$.let(getCurrentUsersState)
    .map((users: UsersState) => users.get(users.get('currentUserId')))
    .distinctUntilChanged();
}