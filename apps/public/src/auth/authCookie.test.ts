import {
  isOrganizationMember,
  readOrganizationIdsCookie,
  readUsernameCookie
} from './authCookie';

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

  it('treats a malformed percent-encoding as no cookie instead of throwing', () => {
    document.cookie = 'gc_username=%; path=/';

    expect(readUsernameCookie()).toBeNull();
  });
});

describe('readOrganizationIdsCookie', () => {
  afterEach(() => {
    document.cookie = 'gc_organizations=; path=/; max-age=0';
  });

  it('returns an empty list when the cookie is not set', () => {
    expect(readOrganizationIdsCookie()).toEqual([]);
  });

  it('splits the comma separated ids', () => {
    document.cookie = 'gc_organizations=org1%2Corg2; path=/';

    expect(readOrganizationIdsCookie()).toEqual(['org1', 'org2']);
  });

  it('returns an empty list for an empty cookie value', () => {
    document.cookie = 'gc_organizations=; path=/';

    expect(readOrganizationIdsCookie()).toEqual([]);
  });

  it('treats a malformed percent-encoding as no cookie instead of throwing', () => {
    document.cookie = 'gc_organizations=%; path=/';

    expect(readOrganizationIdsCookie()).toEqual([]);
  });
});

describe('isOrganizationMember', () => {
  it('is true when the organization id is listed', () => {
    expect(isOrganizationMember(['org1', 'org2'], 'org2')).toBe(true);
  });

  it('is false when the organization id is not listed', () => {
    expect(isOrganizationMember(['org1'], 'org2')).toBe(false);
  });

  it('is false for an empty organization id', () => {
    expect(isOrganizationMember([''], '')).toBe(false);
  });
});
