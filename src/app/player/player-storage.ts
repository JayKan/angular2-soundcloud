import { PLAYER_STORAGE_KEY } from '../constants';

export const localStorageAdapter = {
  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  },

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
};

export const playerStorage = {
  clear(): void {
    localStorageAdapter.removeItem(PLAYER_STORAGE_KEY);
  },

  get data(): any {
    return localStorageAdapter.getItem(PLAYER_STORAGE_KEY) || {};
  },

  set data(value: any) {
    localStorageAdapter.setItem(PLAYER_STORAGE_KEY, value);
  },

  get volume(): number {
    return playerStorage.data.volume;
  },

  set volume(value: number) {
    let data = playerStorage.data;
    data.volume = value;
    playerStorage.data = data;
  }
};
