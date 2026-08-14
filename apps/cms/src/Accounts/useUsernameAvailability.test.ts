import accountHttpClient from './accountHttpClient';
import {
  buildUsernameValidator,
  validateUsernameAvailabilityFor,
  UsernameAvailabilityContext,
  UsernameStatus,
  USERNAME_TAKEN_MESSAGE
} from './useUsernameAvailability';

const availabilityResponse = (
  username: string,
  available: boolean,
  valid = true,
  reason: string | null = null
) => ({
  data: { username, valid, available, reason }
});

const buildContext = (
  overrides: Partial<UsernameAvailabilityContext> = {}
): UsernameAvailabilityContext & { statuses: UsernameStatus[] } => {
  const statuses: UsernameStatus[] = [];

  return {
    cache: { current: new Map<string, boolean>() },
    lastRequestId: { current: 0 },
    suggestedUsername: { current: null },
    onStatusChange: status => statuses.push(status),
    delayMs: 0,
    statuses,
    ...overrides
  };
};

describe('validateUsernameAvailabilityFor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not ask the api about a username the format rules already refuse', async () => {
    const check = jest.spyOn(accountHttpClient, 'checkUsernameAvailability');
    const context = buildContext();

    const error = await validateUsernameAvailabilityFor('ab', context);

    expect(error).toBeUndefined();
    expect(check).not.toHaveBeenCalled();
  });

  it('does not ask the api about the suggestion the form filled in', async () => {
    const check = jest.spyOn(accountHttpClient, 'checkUsernameAvailability');
    const context = buildContext({
      suggestedUsername: { current: 'joaosilva' }
    });

    const error = await validateUsernameAvailabilityFor('joaosilva', context);

    expect(error).toBeUndefined();
    expect(check).not.toHaveBeenCalled();
    expect(context.statuses).toContain('available');
  });

  it('returns no error for a free username', async () => {
    jest
      .spyOn(accountHttpClient, 'checkUsernameAvailability')
      .mockResolvedValue(availabilityResponse('freehandle', true));
    const context = buildContext();

    const error = await validateUsernameAvailabilityFor('freehandle', context);

    expect(error).toBeUndefined();
    expect(context.statuses).toEqual(['checking', 'available']);
  });

  it('returns the taken message for a username already in use', async () => {
    jest
      .spyOn(accountHttpClient, 'checkUsernameAvailability')
      .mockResolvedValue(availabilityResponse('takenhandle', false));
    const context = buildContext();

    const error = await validateUsernameAvailabilityFor('takenhandle', context);

    expect(error).toBe(USERNAME_TAKEN_MESSAGE);
  });

  it('reports the rule the api refused when it disagrees with the client', async () => {
    jest
      .spyOn(accountHttpClient, 'checkUsernameAvailability')
      .mockResolvedValue(
        availabilityResponse('weirdhandle', false, false, 'invalid_characters')
      );
    const context = buildContext();

    const error = await validateUsernameAvailabilityFor('weirdhandle', context);

    expect(error).toBe('usernameInvalidCharacters');
  });

  it('serves a username it already checked from the cache', async () => {
    const check = jest
      .spyOn(accountHttpClient, 'checkUsernameAvailability')
      .mockResolvedValue(availabilityResponse('freehandle', true));
    const context = buildContext();

    await validateUsernameAvailabilityFor('freehandle', context);
    await validateUsernameAvailabilityFor('freehandle', context);

    expect(check).toHaveBeenCalledTimes(1);
  });

  it('sends a single request for a burst of keystrokes', async () => {
    const check = jest
      .spyOn(accountHttpClient, 'checkUsernameAvailability')
      .mockResolvedValue(availabilityResponse('joaosilva', true));
    const context = buildContext({ delayMs: 10 });

    const results = await Promise.all([
      validateUsernameAvailabilityFor('joa', context),
      validateUsernameAvailabilityFor('joao', context),
      validateUsernameAvailabilityFor('joaos', context),
      validateUsernameAvailabilityFor('joaosilva', context)
    ]);

    expect(check).toHaveBeenCalledTimes(1);
    expect(check).toHaveBeenCalledWith('joaosilva');
    expect(results.every(error => error === undefined)).toBe(true);
  });

  it('discards a response that lost the race to a newer check', async () => {
    jest
      .spyOn(accountHttpClient, 'checkUsernameAvailability')
      .mockImplementation(username =>
        Promise.resolve(availabilityResponse(username, username === 'oldvalue'))
      );
    const context = buildContext();

    const stale = validateUsernameAvailabilityFor('oldvalue', context);
    const fresh = validateUsernameAvailabilityFor('newvalue', context);

    // The value the user moved on from says nothing, and the value they are
    // actually typing is the one that answers.
    expect(await stale).toBeUndefined();
    expect(await fresh).toBe(USERNAME_TAKEN_MESSAGE);
  });

  it('lets the form be submitted when the availability request fails', async () => {
    jest
      .spyOn(accountHttpClient, 'checkUsernameAvailability')
      .mockRejectedValue(new Error('network down'));
    const context = buildContext();

    const error = await validateUsernameAvailabilityFor('freehandle', context);

    expect(error).toBeUndefined();
    expect(context.statuses[context.statuses.length - 1]).toBe('idle');
  });
});

const buildValidator = (
  validateAvailability: (username: string) => Promise<string | undefined>,
  statuses: UsernameStatus[]
) =>
  buildUsernameValidator({
    validateAvailability,
    onStatusChange: status => statuses.push(status),
    getStatus: () => statuses[statuses.length - 1] || 'idle',
    pendingRuns: { current: 0 }
  });

describe('buildUsernameValidator', () => {
  it('reports the format error and stops the checking state', async () => {
    const validateAvailability = jest.fn();
    const statuses: UsernameStatus[] = [];
    const validate = buildValidator(validateAvailability, statuses);

    const errors = await validate('ab');

    expect(errors).toEqual(['usernameTooShort']);
    expect(validateAvailability).not.toHaveBeenCalled();
    expect(statuses).toEqual(['idle']);
  });

  it('stops the checking state when the field is emptied', async () => {
    const validateAvailability = jest.fn();
    const statuses: UsernameStatus[] = [];
    const validate = buildValidator(validateAvailability, statuses);

    const errors = await validate('');

    expect(errors).toEqual(["Can't be blank", 'usernameTooShort']);
    expect(validateAvailability).not.toHaveBeenCalled();
    expect(statuses).toEqual(['idle']);
  });

  it('checks availability of a well formed username', async () => {
    const validateAvailability = jest.fn().mockResolvedValue(undefined);
    const validate = buildValidator(validateAvailability, []);

    await validate('freehandle');

    expect(validateAvailability).toHaveBeenCalledWith('freehandle');
  });
});

describe('a check that never answers', () => {
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('stops waiting and lets the user carry on', async () => {
    jest
      .spyOn(accountHttpClient, 'checkUsernameAvailability')
      .mockReturnValue(new Promise(() => undefined));
    const context = buildContext({ delayMs: 0, timeoutMs: 10 });

    const error = await validateUsernameAvailabilityFor('freehandle', context);

    expect(error).toBeUndefined();
    expect(context.statuses[context.statuses.length - 1]).toBe('idle');
  });
});

describe('the checking state', () => {
  it('never outlives the validation that published it', async () => {
    const statuses: UsernameStatus[] = [];
    // A check that leaves the field checking — the shape of every run
    // abandoned as stale — must not leave the spinner behind once no
    // validation is running any more.
    const validate = buildValidator(async () => {
      statuses.push('checking');
      return undefined;
    }, statuses);

    await validate('freehandle');

    expect(statuses[statuses.length - 1]).toBe('idle');
  });
});
