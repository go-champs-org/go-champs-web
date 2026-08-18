import { canAccessOfficialProfile } from './AuthenticatedAuthorizedOfficialProfile';

describe('canAccessOfficialProfile', () => {
  it('allows a user to access their own official profile', () => {
    expect(canAccessOfficialProfile('jane-doe', 'jane-doe')).toEqual(true);
  });

  it('denies access to another user official profile', () => {
    expect(canAccessOfficialProfile('jane-doe', 'john-doe')).toEqual(false);
  });

  it('denies access when there is no signed in username', () => {
    expect(canAccessOfficialProfile('jane-doe', null)).toEqual(false);
    expect(canAccessOfficialProfile('jane-doe', '')).toEqual(false);
  });

  it('denies access when the requested username is empty', () => {
    expect(canAccessOfficialProfile('', 'jane-doe')).toEqual(false);
  });
});
