import { getSport, getSports } from './effects';
import {
  getSportStart,
  getSportSuccess,
  getSportFailure,
  getSportsFailure,
  getSportsSuccess,
  getSportsStart
} from './actions';
import sportHttpClient from './sportHttpClient';

let dispatch: jest.Mock;

describe('getSport', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getSport('some-slug')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getSportStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(sportHttpClient, 'get').mockResolvedValue({
        name: 'some sport',
        slug: 'some-sport-slug',
        playerStatistics: []
      });

      getSport('some-slug')(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getSportSuccess({
          name: 'some sport',
          slug: 'some-sport-slug',
          playerStatistics: []
        })
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(sportHttpClient, 'get').mockRejectedValue(apiError);

      getSport('some-slug')(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getSport('some-slug')(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getSportFailure(apiError));
    });
  });
});

describe('getSports', () => {
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getSports()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(getSportsStart());
  });

  describe('on success', () => {
    beforeEach(() => {
      jest.spyOn(sportHttpClient, 'getAll').mockResolvedValue([
        {
          name: 'some sport',
          slug: 'some-sport-slug',
          playerStatistics: []
        }
      ]);

      getSports()(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getSportsSuccess([
          {
            name: 'some sport',
            slug: 'some-sport-slug',
            playerStatistics: []
          }
        ])
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest.spyOn(sportHttpClient, 'getAll').mockRejectedValue(apiError);

      getSports()(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getSports()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(getSportsFailure(apiError));
    });
  });
});
