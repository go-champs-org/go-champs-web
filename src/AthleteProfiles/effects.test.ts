import { requestAthleteProfile } from './effects';
import {
  requestAthleteProfileStart,
  requestAthleteProfileSuccess,
  requestAthleteProfileFailure
} from './actions';
import athleteProfileHttpClient from './athleteProfileHttpClient';

let dispatch: jest.Mock;

describe('requestAthleteProfile', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(athleteProfileHttpClient, 'get').mockResolvedValue({
        data: {
          username: 'test-athlete',
          name: 'Test Athlete'
        }
      });
    });

    it('dispatches start and success actions', async () => {
      await requestAthleteProfile('test-athlete')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(requestAthleteProfileStart());
      expect(dispatch).toHaveBeenCalledWith(
        requestAthleteProfileSuccess(
          expect.objectContaining({ username: 'test-athlete' })
        )
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      jest.spyOn(athleteProfileHttpClient, 'get').mockRejectedValue(apiError);
    });

    it('dispatches failure action', async () => {
      await requestAthleteProfile('test-athlete')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        requestAthleteProfileFailure(apiError)
      );
    });
  });

  describe('when called multiple times concurrently for the same username', () => {
    let getSpy: jest.SpyInstance;

    beforeEach(() => {
      getSpy = jest.spyOn(athleteProfileHttpClient, 'get').mockResolvedValue({
        data: { username: 'test-athlete', name: 'Test Athlete' }
      });
    });

    it('only issues a single HTTP request', async () => {
      await Promise.all([
        requestAthleteProfile('test-athlete')(dispatch),
        requestAthleteProfile('test-athlete')(dispatch)
      ]);

      expect(getSpy).toHaveBeenCalledTimes(1);
    });

    it('only dispatches the start action once', async () => {
      await Promise.all([
        requestAthleteProfile('test-athlete')(dispatch),
        requestAthleteProfile('test-athlete')(dispatch)
      ]);

      const startDispatches = dispatch.mock.calls.filter(
        ([action]) => action.type === requestAthleteProfileStart().type
      );
      expect(startDispatches).toHaveLength(1);
    });

    it('issues a new request once the previous one has resolved', async () => {
      await requestAthleteProfile('test-athlete')(dispatch);
      await requestAthleteProfile('test-athlete')(dispatch);

      expect(getSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('when called concurrently for different usernames', () => {
    it('issues a request for each username', async () => {
      const getSpy = jest
        .spyOn(athleteProfileHttpClient, 'get')
        .mockResolvedValue({ data: { username: 'irrelevant' } });

      await Promise.all([
        requestAthleteProfile('athlete-a')(dispatch),
        requestAthleteProfile('athlete-b')(dispatch)
      ]);

      expect(getSpy).toHaveBeenCalledTimes(2);
      expect(getSpy).toHaveBeenCalledWith('athlete-a');
      expect(getSpy).toHaveBeenCalledWith('athlete-b');
    });
  });
});
