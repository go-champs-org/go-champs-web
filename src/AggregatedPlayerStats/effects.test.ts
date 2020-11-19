import { getAggregatedPlayerStatsLogsByFilter } from './effects';
import {
  getAggregatedPlayerStatsLogsByFilterFailure,
  getAggregatedPlayerStatsLogsByFilterStart,
  getAggregatedPlayerStatsLogsByFilterSuccess
} from './actions';
import aggregatedPlayerStatsHttpClient from './aggregatedPlayerStatsHttpClient';

let dispatch: jest.Mock;

describe('getAggregatedPlayerStatsLogsByFilter passing only where filter', () => {
  const requestFilter = { ['some-key']: 'some value' };
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getAggregatedPlayerStatsLogsByFilter(requestFilter)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      getAggregatedPlayerStatsLogsByFilterStart()
    );
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(aggregatedPlayerStatsHttpClient, 'getByFilter')
        .mockResolvedValue([
          {
            id: 'id',
            playerId: 'player-id',
            stats: {}
          }
        ]);

      getAggregatedPlayerStatsLogsByFilter(requestFilter)(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getAggregatedPlayerStatsLogsByFilterSuccess([
          {
            id: 'id',
            playerId: 'player-id',
            stats: {}
          }
        ])
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(aggregatedPlayerStatsHttpClient, 'getByFilter')
        .mockRejectedValue(apiError);

      getAggregatedPlayerStatsLogsByFilter(requestFilter)(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getAggregatedPlayerStatsLogsByFilter(requestFilter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        getAggregatedPlayerStatsLogsByFilterFailure(apiError)
      );
    });
  });
});

describe('getAggregatedPlayerStatsLogsByFilter passing where filter and sort', () => {
  const requestFilter = { ['some-key']: 'some value' };
  const sort = 'sort-info';

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('dispatches start get action', () => {
    getAggregatedPlayerStatsLogsByFilter(requestFilter, sort)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      getAggregatedPlayerStatsLogsByFilterStart()
    );
  });

  describe('on success', () => {
    beforeEach(() => {
      jest
        .spyOn(aggregatedPlayerStatsHttpClient, 'getByFilterAndSort')
        .mockResolvedValue([
          {
            id: 'id',
            playerId: 'player-id',
            stats: {}
          }
        ]);

      getAggregatedPlayerStatsLogsByFilter(requestFilter, sort)(dispatch);
    });

    it('dispatches get success action', () => {
      expect(dispatch).toHaveBeenCalledWith(
        getAggregatedPlayerStatsLogsByFilterSuccess([
          {
            id: 'id',
            playerId: 'player-id',
            stats: {}
          }
        ])
      );
    });
  });

  describe('on failure', () => {
    const apiError = new Error('some-error');

    beforeEach(() => {
      dispatch.mockReset();

      jest
        .spyOn(aggregatedPlayerStatsHttpClient, 'getByFilterAndSort')
        .mockRejectedValue(apiError);

      getAggregatedPlayerStatsLogsByFilter(requestFilter, sort)(dispatch);
    });

    it('dispatches get failure action', async () => {
      await getAggregatedPlayerStatsLogsByFilter(requestFilter, sort)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(
        getAggregatedPlayerStatsLogsByFilterFailure(apiError)
      );
    });
  });
});
