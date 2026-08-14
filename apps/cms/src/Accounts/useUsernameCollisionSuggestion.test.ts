import accountHttpClient from './accountHttpClient';
import {
  isUsernameTakenError,
  requestCollisionSuggestion
} from './useUsernameCollisionSuggestion';

describe('isUsernameTakenError', () => {
  it('recognizes the uniqueness error account creation answers with', () => {
    expect(isUsernameTakenError(['has already been taken'])).toBe(true);
    expect(isUsernameTakenError('Has already been taken')).toBe(true);
    expect(isUsernameTakenError(['Este username já está em uso'])).toBe(true);
  });

  it('ignores any other submit error', () => {
    expect(isUsernameTakenError(undefined)).toBe(false);
    expect(isUsernameTakenError([])).toBe(false);
    expect(isUsernameTakenError(['is invalid'])).toBe(false);
  });
});

describe('requestCollisionSuggestion', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('offers the handle the suggestion endpoint returns', async () => {
    const getSuggestion = jest
      .spyOn(accountHttpClient, 'getUsernameSuggestion')
      .mockResolvedValue({ data: { username: 'joaosilva1' } });
    const onSuggestion = jest.fn();

    await requestCollisionSuggestion(' joao@exemplo.com ', onSuggestion);

    expect(getSuggestion).toHaveBeenCalledWith('joao@exemplo.com');
    expect(onSuggestion).toHaveBeenCalledWith('joaosilva1');
  });

  it('offers nothing when the suggestion request fails', async () => {
    jest
      .spyOn(accountHttpClient, 'getUsernameSuggestion')
      .mockRejectedValue(new Error('network down'));
    const onSuggestion = jest.fn();

    await requestCollisionSuggestion('joao@exemplo.com', onSuggestion);

    expect(onSuggestion).not.toHaveBeenCalled();
  });
});
