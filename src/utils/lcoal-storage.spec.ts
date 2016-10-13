import { localStorageAdapter } from './local-storage';

describe('Utils Module', () => {
  describe('localStorageAdapter', () => {
    let data;
    let storageKey;

    beforeEach(() => {
      data = { "foo": "bar", "baz": 123 }; // tslint:disable-line:quotemark
      storageKey = 'angular2-soundclound:test';
    });

    afterEach(() => {
      localStorage.removeItem(storageKey);
    });

    it('should set serialized object into localStorage store', () => {
      localStorageAdapter.setItem(storageKey, data);
      let storeData = localStorage.getItem(storageKey);
      expect(storeData).toEqual(JSON.stringify(data));
    });

    it('should get serialized object from localStorage store', () => {
      localStorageAdapter.setItem(storageKey, JSON.stringify(data));
      let storeData = localStorageAdapter.getItem(storageKey);
      expect(storeData).toEqual(JSON.stringify(data));
    });

    it('should return null if serialized object is not found in localStorage store', () => {
      let storeData = localStorageAdapter.getItem(storageKey);
      expect(storeData).toEqual(null);
    });

    it('should remove key and corresponding value from localStorage store', () => {
      localStorageAdapter.setItem(storageKey, JSON.stringify(data));
      localStorageAdapter.removeItem(storageKey);
      let storeData = localStorage.getItem(storageKey);
      expect(storeData).toEqual(null);
    });
  });
});