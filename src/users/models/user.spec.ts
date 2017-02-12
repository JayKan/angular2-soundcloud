import { is, Record } from 'immutable';
import { createUser, User, UserRecord } from './user';

describe('users', () => {
  describe('User', () => {
    let user: any;

    beforeEach(() => {
      user = new UserRecord();
    });

    it('should be an instance of Immutable.Record', () => {
      expect(user instanceof Record).toBe(true);
    });

    it('should contain default properties', () => {
      expect(user.avatarUrl).toBe(null);
      expect(user.city).toBe(null);
      expect(user.country).toBe(null);
      expect(user.followersCount).toBe(0);
      expect(user.followingsCount).toBe(0);
      expect(user.fullName).toBe(null);
      expect(user.id).toBe(null);
      expect(user.likesCount).toBe(0);
      expect(user.playlistCount).toBe(0);
      expect(user.profile).toBe(false);
      expect(user.trackCount).toBe(0);
      expect(user.username).toBe(null);
    });

    describe('createUser() factory function', () => {
      it('should create a UserRecord instance from provided default user data', () => {
        let userData = {
          avatar_url: 'www.goolge.com',
          city: 'City Name',
          country: 'Country Name',
          followers_count: 88888,
          followings_count: 88,
          full_name: 'Full Name',
          id: 12345678,
          playlist_count: 8,
          public_favorites_count: 88,
          profile: true,
          track_count: 88,
          username: 'Username'
        };

        let expectedUser = new UserRecord({
          avatarUrl: userData.avatar_url,
          city: userData.city,
          country: userData.country,
          followersCount: userData.followers_count,
          followingsCount: userData.followings_count,
          fullName: userData.full_name,
          id: userData.id,
          likesCount: userData.public_favorites_count,
          playlistCount: userData.playlist_count,
          profile: userData.profile,
          trackCount: userData.track_count,
          username: userData.username
        });

        expect(is(createUser(userData, true), expectedUser)).toBe(true);
      });
    });
  });
});