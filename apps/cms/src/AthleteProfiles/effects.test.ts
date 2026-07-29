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
});
