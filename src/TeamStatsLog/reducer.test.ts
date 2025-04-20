import {
  getTeamStatsLogsByFilterFailure,
  getTeamStatsLogsByFilterStart,
  getTeamStatsLogsByFilterSuccess
} from './actions';
import { initialState } from './state';
import teamStatsLogReducer from './reducer';

describe('getTeamStatsLogsByFilter', () => {
  const action = getTeamStatsLogsByFilterStart();

  it('sets isLoadingRequestTeamStatsLogs to true', () => {
    expect(
      teamStatsLogReducer(initialState, action).isLoadingRequestTeamStatsLogs
    ).toBe(true);
  });
});

describe('getTeamStatsLogsByFilterFailure', () => {
  const action = getTeamStatsLogsByFilterFailure('error');

  it('sets isLoadingRequestTeamStatsLogs to false', () => {
    expect(
      teamStatsLogReducer(initialState, action).isLoadingRequestTeamStatsLogs
    ).toBe(false);
  });
});

describe('getTeamStatsLogsByFilterSuccess', () => {
  const action = getTeamStatsLogsByFilterSuccess([
    {
      gameId: 'first-game-id',
      id: 'first-id',
      phaseId: 'first-phase-id',
      teamId: 'first-team-id',
      stats: {},
      tournamentId: 'first-tournament-id',
      againstTeamId: 'first-against-team-id'
    },
    {
      gameId: 'second-game-id',
      id: 'second-id',
      phaseId: 'second-phase-id',
      teamId: 'second-team-id',
      stats: {},
      tournamentId: 'second-tournament-id',
      againstTeamId: 'second-against-team-id'
    }
  ]);

  it('sets isLoadingRequestTeamStatsLogs to false', () => {
    expect(
      teamStatsLogReducer(initialState, action).isLoadingRequestTeamStatsLogs
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = teamStatsLogReducer(initialState, action);

    expect(newState.teamStatsLogs['first-id']).toEqual({
      gameId: 'first-game-id',
      id: 'first-id',
      phaseId: 'first-phase-id',
      teamId: 'first-team-id',
      stats: {},
      tournamentId: 'first-tournament-id',
      againstTeamId: 'first-against-team-id'
    });
    expect(newState.teamStatsLogs['second-id']).toEqual({
      gameId: 'second-game-id',
      id: 'second-id',
      phaseId: 'second-phase-id',
      teamId: 'second-team-id',
      stats: {},
      tournamentId: 'second-tournament-id',
      againstTeamId: 'second-against-team-id'
    });
  });
});
