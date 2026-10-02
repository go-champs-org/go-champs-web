import {
  USERNAME_COOKIE_NAME,
  setUsernameCookie,
  clearUsernameCookie,
  ORGANIZATIONS_COOKIE_NAME,
  setOrganizationIdsCookie,
  clearOrganizationIdsCookie
} from './cookies';

describe('cookies', () => {
  afterEach(() => {
    document.cookie = `${USERNAME_COOKIE_NAME}=; path=/; max-age=0`;
    document.cookie = `${ORGANIZATIONS_COOKIE_NAME}=; path=/; max-age=0`;
  });

  describe('setUsernameCookie', () => {
    it('sets the username cookie', () => {
      setUsernameCookie('someusername');

      expect(document.cookie).toContain(`${USERNAME_COOKIE_NAME}=someusername`);
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

  describe('setOrganizationIdsCookie', () => {
    it('stores the ids comma separated', () => {
      setOrganizationIdsCookie(['org1', 'org2']);

      expect(document.cookie).toContain(
        `${ORGANIZATIONS_COOKIE_NAME}=org1%2Corg2`
      );
    });
  });

  describe('clearOrganizationIdsCookie', () => {
    it('removes the organizations cookie', () => {
      setOrganizationIdsCookie(['org1']);

      clearOrganizationIdsCookie();

      expect(document.cookie).not.toContain('org1');
    });
  });
});
