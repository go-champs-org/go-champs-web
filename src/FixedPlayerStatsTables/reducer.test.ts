import {
  deleteFixedPlayerStatsTableFailure,
  deleteFixedPlayerStatsTableStart,
  deleteFixedPlayerStatsTableSuccess,
  patchFixedPlayerStatsTableFailure,
  patchFixedPlayerStatsTableStart,
  patchFixedPlayerStatsTableSuccess,
  postFixedPlayerStatsTableFailure,
  postFixedPlayerStatsTableStart,
  postFixedPlayerStatsTableSuccess
} from './actions';
import fixedPlayerStatsTableReducer from './reducer';
import { initialState, FixedPlayerStatsTableState } from './state';

describe('deleteFixedPlayerStatsTable', () => {
  const action = deleteFixedPlayerStatsTableStart();

  it('sets isLoadingDeleteFixedPlayerStatsTable to true', () => {
    expect(
      fixedPlayerStatsTableReducer(initialState, action)
        .isLoadingDeleteFixedPlayerStatsTable
    ).toBe(true);
  });
});

describe('deleteFixedPlayerStatsTableFailure', () => {
  const action = deleteFixedPlayerStatsTableFailure('error');

  it('sets isLoadingDeleteFixedPlayerStatsTable to false', () => {
    expect(
      fixedPlayerStatsTableReducer(initialState, action)
        .isLoadingDeleteFixedPlayerStatsTable
    ).toBe(false);
  });
});

describe('deleteFixedPlayerStatsTableSuccess', () => {
  const action = deleteFixedPlayerStatsTableSuccess('first-id');

  const deleteState = {
    ...initialState,
    fixedPlayerStatsTables: {
      'first-id': {
        id: 'first-id',
        statId: 'first-stat-id',
        playerStats: []
      }
    }
  };

  it('sets isLoadingDeleteFixedPlayerStatsTable to false', () => {
    expect(
      fixedPlayerStatsTableReducer(deleteState, action)
        .isLoadingDeleteFixedPlayerStatsTable
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = fixedPlayerStatsTableReducer(deleteState, action);

    expect(newState.fixedPlayerStatsTables['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: FixedPlayerStatsTableState = {
      ...initialState,
      fixedPlayerStatsTables: {
        'some-id': {
          id: 'some-id',
          statId: 'some-stat-id',
          playerStats: []
        },
        ...deleteState.fixedPlayerStatsTables
      }
    };

    const newState = fixedPlayerStatsTableReducer(someState, action);

    expect(newState.fixedPlayerStatsTables['some-id']).toEqual({
      id: 'some-id',
      statId: 'some-stat-id',
      playerStats: []
    });
  });
});

describe('patchFixedPlayerStatsTable', () => {
  const action = patchFixedPlayerStatsTableStart();

  it('sets isLoadingPatchFixedPlayerStatsTable to true', () => {
    expect(
      fixedPlayerStatsTableReducer(initialState, action)
        .isLoadingPatchFixedPlayerStatsTable
    ).toBe(true);
  });
});

describe('patchFixedPlayerStatsTableFailure', () => {
  const action = patchFixedPlayerStatsTableFailure('error');

  it('sets isLoadingPatchFixedPlayerStatsTable to false', () => {
    expect(
      fixedPlayerStatsTableReducer(initialState, action)
        .isLoadingPatchFixedPlayerStatsTable
    ).toBe(false);
  });
});

describe('patchFixedPlayerStatsTableSuccess', () => {
  const action = patchFixedPlayerStatsTableSuccess({
    id: 'first-id',
    player_stats: [],
    stat_id: 'some-stat-id',
    tournament_id: 'some-tournament-id'
  });

  const updateState: FixedPlayerStatsTableState = {
    ...initialState,
    fixedPlayerStatsTables: {
      'first-id': {
        id: 'first-id',
        statId: 'first-name',
        playerStats: []
      }
    }
  };

  it('sets isLoadingPatchFixedPlayerStatsTable to false', () => {
    expect(
      fixedPlayerStatsTableReducer(updateState, action)
        .isLoadingPatchFixedPlayerStatsTable
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = fixedPlayerStatsTableReducer(updateState, action);

    expect(newState.fixedPlayerStatsTables['first-id']).toEqual({
      id: 'first-id',
      playerStats: [],
      statId: 'some-stat-id'
    });
  });

  it('keeps others entities in other', () => {
    const someState: FixedPlayerStatsTableState = {
      ...updateState,
      fixedPlayerStatsTables: {
        'some-id': {
          id: 'some-id',
          playerStats: [],
          statId: 'some-stat-id'
        }
      }
    };

    const newState = fixedPlayerStatsTableReducer(someState, action);

    expect(newState.fixedPlayerStatsTables['some-id']).toEqual({
      id: 'some-id',
      playerStats: [],
      statId: 'some-stat-id'
    });
  });
});

describe('postFixedPlayerStatsTable', () => {
  const action = postFixedPlayerStatsTableStart();

  it('sets isLoadingPostFixedPlayerStatsTable to true', () => {
    expect(
      fixedPlayerStatsTableReducer(initialState, action)
        .isLoadingPostFixedPlayerStatsTable
    ).toBe(true);
  });
});

describe('postFixedPlayerStatsTableFailure', () => {
  const action = postFixedPlayerStatsTableFailure('error');

  it('sets isLoadingPostFixedPlayerStatsTable to false', () => {
    expect(
      fixedPlayerStatsTableReducer(initialState, action)
        .isLoadingPostFixedPlayerStatsTable
    ).toBe(false);
  });
});

describe('postFixedPlayerStatsTableSuccess', () => {
  const action = postFixedPlayerStatsTableSuccess({
    id: 'first-id',
    player_stats: [],
    stat_id: 'first-stat-id',
    tournament_id: 'tournament-id'
  });

  it('sets isLoadingPostFixedPlayerStatsTable to false', () => {
    expect(
      fixedPlayerStatsTableReducer(initialState, action)
        .isLoadingPostFixedPlayerStatsTable
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = fixedPlayerStatsTableReducer(initialState, action);

    expect(newState.fixedPlayerStatsTables['first-id']).toEqual({
      id: 'first-id',
      statId: 'first-stat-id',
      playerStats: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: FixedPlayerStatsTableState = {
      ...initialState,
      fixedPlayerStatsTables: {
        'some-id': {
          id: 'some-id',
          statId: 'some-stat-id',
          playerStats: []
        }
      }
    };

    const newState = fixedPlayerStatsTableReducer(someState, action);

    expect(newState.fixedPlayerStatsTables['some-id']).toEqual({
      id: 'some-id',
      statId: 'some-stat-id',
      playerStats: []
    });
  });
});
