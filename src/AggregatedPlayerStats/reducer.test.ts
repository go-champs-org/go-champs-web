import {
  getAggregatedPlayerStatsLogsByFilterFailure,
  getAggregatedPlayerStatsLogsByFilterStart,
  getAggregatedPlayerStatsLogsByFilterSuccess
} from './actions';
import aggregatedPlayerStatsLogReducer from './reducer';
import { initialState } from './state';

describe('getAggregatedPlayerStatsLogsByFilter', () => {
  const action = getAggregatedPlayerStatsLogsByFilterStart();

  it('sets isLoadingRequestPlayerStatsLogs to true', () => {
    expect(
      aggregatedPlayerStatsLogReducer(initialState, action)
        .isLoadingRequestPlayerStatsLogs
    ).toBe(true);
  });
});

describe('getAggregatedPlayerStatsLogsByFilterFailure', () => {
  const action = getAggregatedPlayerStatsLogsByFilterFailure('error');

  it('sets isLoadingRequestPlayerStatsLogs to false', () => {
    expect(
      aggregatedPlayerStatsLogReducer(initialState, action)
        .isLoadingRequestPlayerStatsLogs
    ).toBe(false);
  });
});

describe('getAggregatedPlayerStatsLogsByFilterSuccess', () => {
  const action = getAggregatedPlayerStatsLogsByFilterSuccess([
    {
      id: 'first-id',
      playerId: 'first-player-id',
      stats: {
        ['first-stat-id']: '1'
      }
    },
    {
      id: 'second-id',
      playerId: 'second-player-id',
      stats: {
        ['first-stat-id']: '2'
      }
    }
  ]);

  it('sets isLoadingRequestPlayerStatsLogs to false', () => {
    expect(
      aggregatedPlayerStatsLogReducer(initialState, action)
        .isLoadingRequestPlayerStatsLogs
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = aggregatedPlayerStatsLogReducer(initialState, action);

    expect(newState.aggregatedPlayerStatsLogs['first-id'].id).toEqual(
      'first-id'
    );
    expect(newState.aggregatedPlayerStatsLogs['first-id'].playerId).toEqual(
      'first-player-id'
    );
    expect(newState.aggregatedPlayerStatsLogs['first-id'].stats).toEqual({
      ['first-stat-id']: '1'
    });
    expect(newState.aggregatedPlayerStatsLogs['second-id'].id).toEqual(
      'second-id'
    );
    expect(newState.aggregatedPlayerStatsLogs['second-id'].playerId).toEqual(
      'second-player-id'
    );
    expect(newState.aggregatedPlayerStatsLogs['second-id'].stats).toEqual({
      ['first-stat-id']: '2'
    });
  });
});
