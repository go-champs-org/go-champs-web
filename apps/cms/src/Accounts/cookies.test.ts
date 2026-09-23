import {
  USERNAME_COOKIE_NAME,
  setUsernameCookie,
  clearUsernameCookie
} from './cookies';

describe('cookies', () => {
  afterEach(() => {
    document.cookie = `${USERNAME_COOKIE_NAME}=; path=/; max-age=0`;
  });

  describe('setUsernameCookie', () => {
    it('sets the username cookie', () => {
      setUsernameCookie('someusername');

      expect(document.cookie).toContain(
        `${USERNAME_COOKIE_NAME}=someusername`
      );
    });

    it('url-encodes the username', () => {
      setUsernameCookie('some username');

      expect(document.cookie).toContain(
        `${USERNAME_COOKIE_NAME}=some%20username`
      );
    });
  });

  describe('clearUsernameCookie', () => {
    it('removes the username cookie', () => {
      setUsernameCookie('someusername');

      clearUsernameCookie();

      expect(document.cookie).not.toContain('someusername');
    });
  });
});
