import { getPhaseSuccess } from '../Phases/actions';
import { PhaseTypes } from '../Phases/state';
import { ApiPhase } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_ELIMINATION,
  DELETE_ELIMINATION_FAILURE,
  DELETE_ELIMINATION_SUCCESS,
  PATCH_ELIMINATION,
  PATCH_ELIMINATION_FAILURE,
  PATCH_ELIMINATION_SUCCESS,
  POST_ELIMINATION,
  POST_ELIMINATION_FAILURE,
  POST_ELIMINATION_SUCCESS
} from './actions';
import eliminationReducer from './reducer';
import { EliminationEntity, EliminationState, initialState } from './state';

describe('deleteElimination', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_ELIMINATION,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteElimination to true', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingDeleteElimination).toBe(true);
  });
});

describe('deleteEliminationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_ELIMINATION_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingDeleteElimination).toBe(false);
  });
});

describe('deleteEliminationSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_ELIMINATION_SUCCESS,
    payload: 'first-id'
  };

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
  const action: HttpAction<ActionTypes> = {
    type: PATCH_ELIMINATION
  };

  it('sets isLoadingPatchElimination to true', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPatchElimination).toBe(true);
  });
});

describe('patchEliminationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_ELIMINATION_FAILURE
  };

  it('sets isLoadingPatchElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPatchElimination).toBe(false);
  });
});

describe('patchEliminationSuccess', () => {
  const action: HttpAction<ActionTypes, EliminationEntity> = {
    type: PATCH_ELIMINATION_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'some-first-title',
      teamStats: []
    }
  };

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
  const action: HttpAction<ActionTypes> = {
    type: POST_ELIMINATION
  };

  it('sets isLoadingPostElimination to true', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPostElimination).toBe(true);
  });
});

describe('postEliminationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_ELIMINATION_FAILURE
  };

  it('sets isLoadingPostElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPostElimination).toBe(false);
  });
});

describe('postEliminationSuccess', () => {
  const action: HttpAction<ActionTypes, EliminationEntity> = {
    type: POST_ELIMINATION_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'first-title',
      teamStats: []
    }
  };

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
