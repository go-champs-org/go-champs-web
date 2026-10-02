import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localeCookieString
} from './localeCookie';

describe('localeCookieString', () => {
  it('writes the shared NEXT_LOCALE cookie for the whole site, for a year', () => {
    expect(LOCALE_COOKIE).toBe('NEXT_LOCALE');
    expect(LOCALE_COOKIE_MAX_AGE).toBe(31536000);
    expect(localeCookieString('en')).toBe(
      'NEXT_LOCALE=en; path=/; max-age=31536000; samesite=lax'
    );
  });
});
