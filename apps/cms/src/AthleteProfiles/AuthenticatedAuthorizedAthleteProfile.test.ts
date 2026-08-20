import { canAccessAthleteProfile } from './AuthenticatedAuthorizedAthleteProfile';

describe('canAccessAthleteProfile', () => {
  it('allows a user to access their own athlete profile', () => {
    expect(canAccessAthleteProfile('jane-doe', 'jane-doe')).toEqual(true);
  });

  it('denies access to another user athlete profile', () => {
    expect(canAccessAthleteProfile('jane-doe', 'john-doe')).toEqual(false);
  });

  it('denies access when there is no signed in username', () => {
    expect(canAccessAthleteProfile('jane-doe', null)).toEqual(false);
    expect(canAccessAthleteProfile('jane-doe', '')).toEqual(false);
  });

  it('denies access when the requested username is empty', () => {
    expect(canAccessAthleteProfile('', 'jane-doe')).toEqual(false);
  });
});
