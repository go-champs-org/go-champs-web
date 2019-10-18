import { getPhaseSuccess } from '../Phases/actions';
import { PhaseTypes } from '../Phases/state';
import { ApiPhase } from '../Shared/httpClient/apiTypes';
import {
  deleteEliminationFailure,
  deleteEliminationStart,
  deleteEliminationSuccess,
  patchEliminationFailure,
  patchEliminationStart,
  patchEliminationSuccess,
  postEliminationFailure,
  postEliminationStart,
  postEliminationSuccess
} from './actions';
import eliminationReducer from './reducer';
import { EliminationState, initialState } from './state';

describe('deleteElimination', () => {
  const action = deleteEliminationStart();

  it('sets isLoadingDeleteElimination to true', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingDeleteElimination).toBe(true);
  });
});

describe('deleteEliminationFailure', () => {
  const action = deleteEliminationFailure('error');

  it('sets isLoadingDeleteElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingDeleteElimination).toBe(false);
  });
});

describe('deleteEliminationSuccess', () => {
  const action = deleteEliminationSuccess('first-id');

  const deleteState = {
    ...initialState,
    eliminations: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        teamStats: []
      }
    }
  };

  it('sets isLoadingDeleteElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingDeleteElimination).toBe(false);
  });

  it('remove entity', () => {
    const newState = eliminationReducer(deleteState, action);

    expect(newState.eliminations['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: EliminationState = {
      ...initialState,
      eliminations: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          teamStats: []
        },
        ...deleteState.eliminations
      }
    };

    const newState = eliminationReducer(someState, action);

    expect(newState.eliminations['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      teamStats: []
    });
  });
});

describe('patchElimination', () => {
  const action = patchEliminationStart();

  it('sets isLoadingPatchElimination to true', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPatchElimination).toBe(true);
  });
});

describe('patchEliminationFailure', () => {
  const action = patchEliminationFailure('error');

  it('sets isLoadingPatchElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPatchElimination).toBe(false);
  });
});

describe('patchEliminationSuccess', () => {
  const action = patchEliminationSuccess({
    id: 'first-id',
    title: 'some-first-title',
    teamStats: []
  });

  const updateState: EliminationState = {
    ...initialState,
    eliminations: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        teamStats: []
      }
    }
  };

  it('sets isLoadingPatchElimination to false', () => {
    const newState = eliminationReducer(updateState, action);
    expect(newState.isLoadingPatchElimination).toBe(false);
  });

  it('set entity', () => {
    const newState = eliminationReducer(updateState, action);

    expect(newState.eliminations['first-id']).toEqual({
      id: 'first-id',
      title: 'some-first-title',
      teamStats: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: EliminationState = {
      ...updateState,
      eliminations: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          teamStats: []
        }
      }
    };

    const newState = eliminationReducer(someState, action);

    expect(newState.eliminations['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      teamStats: []
    });
  });
});

describe('postElimination', () => {
  const action = postEliminationStart();

  it('sets isLoadingPostElimination to true', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPostElimination).toBe(true);
  });
});

describe('postEliminationFailure', () => {
  const action = postEliminationFailure('error');

  it('sets isLoadingPostElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPostElimination).toBe(false);
  });
});

describe('postEliminationSuccess', () => {
  const action = postEliminationSuccess({
    id: 'first-id',
    title: 'first-title',
    teamStats: []
  });

  it('sets isLoadingPostElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPostElimination).toBe(false);
  });

  it('set entity', () => {
    const newState = eliminationReducer(initialState, action);

    expect(newState.eliminations['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
      teamStats: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: EliminationState = {
      ...initialState,
      eliminations: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          teamStats: []
        }
      }
    };

    const newState = eliminationReducer(someState, action);

    expect(newState.eliminations['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      teamStats: []
    });
  });
});

describe('getPhaseSuccess', () => {
  const apiPhase: ApiPhase = {
    id: 'phase-id',
    title: 'phase-title',
    order: 0,
    type: PhaseTypes.elimination,
    eliminations: [
      {
        id: 'first-id',
        title: 'first-title',
        team_stats: [
          {
            id: 'first-team-stat-id',
            stats: {
              'first-stat-id': 'first-team-stat-value'
            },
            team_id: 'first-team-id'
          },
          {
            id: 'second-team-stat-id',
            stats: {
              'first-stat-id': 'second-team-stat-value'
            },
            team_id: 'second-team-id'
          }
        ]
      }
    ]
  };
  const action = getPhaseSuccess(apiPhase);

  it('maps api elimination to elimination', () => {
    const eliminationState = eliminationReducer(initialState, action);

    expect(eliminationState.eliminations).toEqual({
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        teamStats: [
          {
            id: 'first-team-stat-id',
            stats: {
              'first-stat-id': 'first-team-stat-value'
            },
            teamId: 'first-team-id'
          },
          {
            id: 'second-team-stat-id',
            stats: {
              'first-stat-id': 'second-team-stat-value'
            },
            teamId: 'second-team-id'
          }
        ]
      }
    });
  });
});
