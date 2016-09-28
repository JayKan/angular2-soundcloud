import { Map } from 'immutable';

export type UsersState = Map<any, any>;
export const initialState: UsersState = Map<any, any>({
  currentUserId: null
});

