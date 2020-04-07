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
  postEliminationSuccess,
  batchPatchEliminationSuccess
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
        info: 'first info',
        order: 1,
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
          info: 'some info',
          order: 1,
          title: 'some-title',
          teamStats: []
        },
        ...deleteState.eliminations
      }
    };

    const newState = eliminationReducer(someState, action);

    expect(newState.eliminations['some-id']).toEqual({
      id: 'some-id',
      info: 'some info',
      order: 1,
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
    info: 'first info',
    order: 2,
    title: 'some-first-title',
    teamStats: []
  });

  const updateState: EliminationState = {
    ...initialState,
    eliminations: {
      'first-id': {
        id: 'first-id',
        info: 'first info',
        order: 1,
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
      info: 'first info',
      order: 2,
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
          info: 'some info',
          order: 1,
          title: 'some-title',
          teamStats: []
        }
      }
    };

    const newState = eliminationReducer(someState, action);

    expect(newState.eliminations['some-id']).toEqual({
      id: 'some-id',
      info: 'some info',
      order: 1,
      title: 'some-title',
      teamStats: []
    });
  });
});

describe('batchPatchEliminationSuccess', () => {
  const action = batchPatchEliminationSuccess({
    'first-id': {
      id: 'first-id',
      info: 'first updated info',
      order: 1,
      title: 'first-updated-title',
      team_stats: []
    },
    'second-id': {
      id: 'second-id',
      info: 'second updated info',
      order: 2,
      title: 'second-updated-title',
      team_stats: []
    }
  });

  const updateState: EliminationState = {
    ...initialState,
    eliminations: {
      'first-id': {
        id: 'first-id',
        info: 'first info',
        order: 2,
        title: 'first-title',
        teamStats: []
      },
      'second-id': {
        id: 'second-id',
        info: 'second info',
        order: 1,
        title: 'second-title',
        teamStats: []
      }
    }
  };

  it('sets isLoadingPatchElimination to false', () => {
    expect(
      eliminationReducer(updateState, action).isLoadingPatchElimination
    ).toBe(false);
  });

  it('set entities', () => {
    const newState = eliminationReducer(updateState, action);

    expect(newState.eliminations['first-id']).toEqual({
      id: 'first-id',
      info: 'first updated info',
      order: 1,
      title: 'first-updated-title',
      teamStats: []
    });
    expect(newState.eliminations['second-id']).toEqual({
      id: 'second-id',
      info: 'second updated info',
      order: 2,
      title: 'second-updated-title',
      teamStats: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: EliminationState = {
      ...updateState,
      eliminations: {
        'some-id': {
          id: 'some-id',
          info: 'some updated info',
          order: 1,
          title: 'some-updated-title',
          teamStats: []
        }
      }
    };

    const newState = eliminationReducer(someState, action);

    expect(newState.eliminations['some-id']).toEqual({
      id: 'some-id',
      info: 'some updated info',
      order: 1,
      title: 'some-updated-title',
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
    info: 'first info',
    order: 1,
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
      info: 'first info',
      order: 1,
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
          info: 'some info',
          order: 1,
          title: 'some-title',
          teamStats: []
        }
      }
    };

    const newState = eliminationReducer(someState, action);

    expect(newState.eliminations['some-id']).toEqual({
      id: 'some-id',
      info: 'some info',
      order: 1,
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
    is_in_progress: false,
    eliminations: [
      {
        id: 'first-id',
        info: 'first info',
        order: 1,
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

  const apiPhaseWithPlaceholder: ApiPhase = {
    id: 'phase-id',
    title: 'phase-title',
    order: 0,
    type: PhaseTypes.elimination,
    is_in_progress: true,
    eliminations: [
      {
        id: 'first-id',
        info: 'first info',
        order: 1,
        title: 'first-title',
        team_stats: [
          {
            id: 'first-team-stat-id',
            placeholder: 'first placeholder',
            stats: {
              'first-stat-id': 'first-team-stat-value'
            }
          },
          {
            id: 'second-team-stat-id',
            placeholder: 'second placeholder',
            stats: {
              'first-stat-id': 'second-team-stat-value'
            }
          }
        ]
      }
    ]
  };

  it('maps api elimination to elimination', () => {
    const action = getPhaseSuccess(apiPhase);
    const eliminationState = eliminationReducer(initialState, action);

    expect(eliminationState.eliminations).toEqual({
      'first-id': {
        id: 'first-id',
        info: 'first info',
        order: 1,
        title: 'first-title',
        teamStats: [
          {
            id: 'first-team-stat-id',
            placeholder: '',
            stats: {
              'first-stat-id': 'first-team-stat-value'
            },
            teamId: 'first-team-id'
          },
          {
            id: 'second-team-stat-id',
            placeholder: '',
            stats: {
              'first-stat-id': 'second-team-stat-value'
            },
            teamId: 'second-team-id'
          }
        ]
      }
    });
  });

  it('maps api elimination to elimination with placeholder', () => {
    const action = getPhaseSuccess(apiPhaseWithPlaceholder);
    const eliminationState = eliminationReducer(initialState, action);

    expect(eliminationState.eliminations).toEqual({
      'first-id': {
        id: 'first-id',
        info: 'first info',
        order: 1,
        title: 'first-title',
        teamStats: [
          {
            id: 'first-team-stat-id',
            placeholder: 'first placeholder',
            stats: {
              'first-stat-id': 'first-team-stat-value'
            },
            teamId: ''
          },
          {
            id: 'second-team-stat-id',
            placeholder: 'second placeholder',
            stats: {
              'first-stat-id': 'second-team-stat-value'
            },
            teamId: ''
          }
        ]
      }
    });
  });
});
