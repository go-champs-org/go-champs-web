import {
  deletePlayerStatsLogFailure,
  deletePlayerStatsLogStart,
  deletePlayerStatsLogSuccess,
  getPlayerStatsLogsByFilterFailure,
  getPlayerStatsLogsByFilterStart,
  getPlayerStatsLogsByFilterSuccess,
  patchPlayerStatsLogsFailure,
  patchPlayerStatsLogsStart,
  patchPlayerStatsLogsSuccess,
  postPlayerStatsLogsFailure,
  postPlayerStatsLogsStart,
  postPlayerStatsLogsSuccess
} from './actions';
import playerStatsLogReducer from './reducer';
import {
  DEFAULT_PLAYER_STATS_LOG,
  initialState,
  PlayerStatsLogState
} from './state';

describe('deletePlayerStatsLog', () => {
  const action = deletePlayerStatsLogStart();

  it('sets isLoadingDeletePlayerStatsLog to true', () => {
    expect(
      playerStatsLogReducer(initialState, action).isLoadingDeletePlayerStatsLog
    ).toBe(true);
  });
});

describe('deletePlayerStatsLogFailure', () => {
  const action = deletePlayerStatsLogFailure('error');

  it('sets isLoadingDeletePlayerStatsLog to false', () => {
    expect(
      playerStatsLogReducer(initialState, action).isLoadingDeletePlayerStatsLog
    ).toBe(false);
  });
});

describe('deletePlayerStatsLogSuccess', () => {
  const action = deletePlayerStatsLogSuccess('first-id');

  const deleteState = {
    ...initialState,
    playerStatsLogs: {
      'first-id': {
        ...DEFAULT_PLAYER_STATS_LOG,
        id: 'first-id'
      }
    }
  };

  it('sets isLoadingDeletePlayerStatsLog to false', () => {
    expect(
      playerStatsLogReducer(deleteState, action).isLoadingDeletePlayerStatsLog
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = playerStatsLogReducer(deleteState, action);

    expect(newState.playerStatsLogs['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: PlayerStatsLogState = {
      ...initialState,
      playerStatsLogs: {
        'some-id': {
          ...DEFAULT_PLAYER_STATS_LOG,
          id: 'some-id'
        },
        ...deleteState.playerStatsLogs
      }
    };

    const newState = playerStatsLogReducer(someState, action);

    expect(newState.playerStatsLogs['some-id']).toEqual({
      ...DEFAULT_PLAYER_STATS_LOG,
      id: 'some-id'
    });
  });
});

describe('patchPlayerStatsLogs', () => {
  const action = patchPlayerStatsLogsStart();

  it('sets isLoadingPatchPlayerStatsLog to true', () => {
    expect(
      playerStatsLogReducer(initialState, action).isLoadingPatchPlayerStatsLog
    ).toBe(true);
  });
});

describe('patchPlayerStatsLogsFailure', () => {
  const action = patchPlayerStatsLogsFailure('error');

  it('sets isLoadingPatchPlayerStatsLog to false', () => {
    expect(
      playerStatsLogReducer(initialState, action).isLoadingPatchPlayerStatsLog
    ).toBe(false);
  });
});

describe('patchPlayerStatsLogsSuccess', () => {
  const action = patchPlayerStatsLogsSuccess([
    {
      gameId: 'updated-game-id',
      id: 'first-id',
      phaseId: 'updated-phase-id',
      playerId: 'updated-player-id',
      stats: {},
      teamId: 'updated-team-id',
      tournamentId: 'updated-tournament-id'
    }
  ]);

  const updateState: PlayerStatsLogState = {
    ...initialState,
    playerStatsLogs: {
      'first-id': {
        gameId: 'game-id',
        id: 'first-id',
        phaseId: 'phase-id',
        playerId: 'player-id',
        stats: {},
        teamId: 'team-id',
        tournamentId: 'tournament-id'
      }
    }
  };

  it('sets isLoadingPatchPlayerStatsLog to false', () => {
    expect(
      playerStatsLogReducer(updateState, action).isLoadingPatchPlayerStatsLog
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = playerStatsLogReducer(updateState, action);

    expect(newState.playerStatsLogs['first-id']).toEqual({
      gameId: 'updated-game-id',
      id: 'first-id',
      phaseId: 'updated-phase-id',
      playerId: 'updated-player-id',
      stats: {},
      teamId: 'updated-team-id',
      tournamentId: 'updated-tournament-id'
    });
  });

  it('keeps others entities in other', () => {
    const someState: PlayerStatsLogState = {
      ...updateState,
      playerStatsLogs: {
        'some-id': {
          gameId: 'game-id',
          id: 'some-id',
          phaseId: 'phase-id',
          playerId: 'player-id',
          stats: {},
          teamId: 'team-id',
          tournamentId: 'tournament-id'
        }
      }
    };

    const newState = playerStatsLogReducer(someState, action);

    expect(newState.playerStatsLogs['some-id']).toEqual({
      gameId: 'game-id',
      id: 'some-id',
      phaseId: 'phase-id',
      playerId: 'player-id',
      stats: {},
      teamId: 'team-id',
      tournamentId: 'tournament-id'
    });
  });
});

describe('postPlayerStatsLogs', () => {
  const action = postPlayerStatsLogsStart();

  it('sets isLoadingPostPlayerStatsLog to true', () => {
    expect(
      playerStatsLogReducer(initialState, action).isLoadingPostPlayerStatsLog
    ).toBe(true);
  });
});

describe('postPlayerStatsLogsFailure', () => {
  const action = postPlayerStatsLogsFailure('error');

  it('sets isLoadingPostPlayerStatsLog to false', () => {
    expect(
      playerStatsLogReducer(initialState, action).isLoadingPostPlayerStatsLog
    ).toBe(false);
  });
});

describe('postPlayerStatsLogsSuccess', () => {
  const action = postPlayerStatsLogsSuccess([
    {
      gameId: 'posted-game-id',
      id: 'first-id',
      phaseId: 'posted-phase-id',
      playerId: 'posted-player-id',
      stats: {},
      teamId: 'posted-team-id',
      tournamentId: 'posted-tournament-id'
    }
  ]);

  it('sets isLoadingPostPlayerStatsLog to false', () => {
    expect(
      playerStatsLogReducer(initialState, action).isLoadingPostPlayerStatsLog
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = playerStatsLogReducer(initialState, action);

    expect(newState.playerStatsLogs['first-id']).toEqual({
      gameId: 'posted-game-id',
      id: 'first-id',
      phaseId: 'posted-phase-id',
      playerId: 'posted-player-id',
      stats: {},
      teamId: 'posted-team-id',
      tournamentId: 'posted-tournament-id'
    });
  });

  it('keeps others entities in other', () => {
    const someState: PlayerStatsLogState = {
      ...initialState,
      playerStatsLogs: {
        'some-id': {
          gameId: 'game-id',
          id: 'some-id',
          phaseId: 'phase-id',
          playerId: 'player-id',
          stats: {},
          teamId: 'team-id',
          tournamentId: 'tournament-id'
        }
      }
    };

    const newState = playerStatsLogReducer(someState, action);

    expect(newState.playerStatsLogs['some-id']).toEqual({
      gameId: 'game-id',
      id: 'some-id',
      phaseId: 'phase-id',
      playerId: 'player-id',
      stats: {},
      teamId: 'team-id',
      tournamentId: 'tournament-id'
    });
  });
});

describe('getPlayerStatsLogsByFilter', () => {
  const action = getPlayerStatsLogsByFilterStart();

  it('sets isLoadingRequestPlayerStatsLogs to true', () => {
    expect(
      playerStatsLogReducer(initialState, action)
        .isLoadingRequestPlayerStatsLogs
    ).toBe(true);
  });
});

describe('getPlayerStatsLogsByFilterFailure', () => {
  const action = getPlayerStatsLogsByFilterFailure('error');

  it('sets isLoadingRequestPlayerStatsLogs to false', () => {
    expect(
      playerStatsLogReducer(initialState, action)
        .isLoadingRequestPlayerStatsLogs
    ).toBe(false);
  });
});

describe('getPlayerStatsLogsByFilterSuccess', () => {
  const action = getPlayerStatsLogsByFilterSuccess([
    {
      gameId: 'first-game-id',
      id: 'first-id',
      phaseId: 'first-phase-id',
      playerId: 'first-player-id',
      stats: {},
      teamId: 'first-team-id',
      tournamentId: 'first-tournament-id'
    },
    {
      gameId: 'second-game-id',
      id: 'second-id',
      phaseId: 'second-phase-id',
      playerId: 'second-player-id',
      stats: {},
      teamId: 'second-team-id',
      tournamentId: 'second-tournament-id'
    }
  ]);

  it('sets isLoadingRequestPlayerStatsLogs to false', () => {
    expect(
      playerStatsLogReducer(initialState, action)
        .isLoadingRequestPlayerStatsLogs
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = playerStatsLogReducer(initialState, action);

    expect(newState.playerStatsLogs['first-id']).toEqual({
      gameId: 'first-game-id',
      id: 'first-id',
      phaseId: 'first-phase-id',
      playerId: 'first-player-id',
      stats: {},
      teamId: 'first-team-id',
      tournamentId: 'first-tournament-id'
    });
    expect(newState.playerStatsLogs['second-id']).toEqual({
      gameId: 'second-game-id',
      id: 'second-id',
      phaseId: 'second-phase-id',
      playerId: 'second-player-id',
      stats: {},
      teamId: 'second-team-id',
      tournamentId: 'second-tournament-id'
    });
  });
});
