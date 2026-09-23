import { readUsernameCookie } from './authCookie';

describe('readUsernameCookie', () => {
  afterEach(() => {
    document.cookie = 'gc_username=; path=/; max-age=0';
  });

  it('returns null when the cookie is not set', () => {
    expect(readUsernameCookie()).toBeNull();
  });

  it('returns the username when the cookie is set', () => {
    document.cookie = 'gc_username=someusername; path=/';

    expect(readUsernameCookie()).toEqual('someusername');
  });

  it('decodes a url-encoded username', () => {
    document.cookie = 'gc_username=some%20username; path=/';

    expect(readUsernameCookie()).toEqual('some username');
  });

  it('ignores other cookies', () => {
    document.cookie = 'theme=dark; path=/';

    expect(readUsernameCookie()).toBeNull();
  });
});
