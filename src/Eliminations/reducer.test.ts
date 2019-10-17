import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_PHASE_STANDINGS,
  DELETE_PHASE_STANDINGS_FAILURE,
  DELETE_PHASE_STANDINGS_SUCCESS,
  PATCH_PHASE_STANDINGS,
  PATCH_PHASE_STANDINGS_FAILURE,
  PATCH_PHASE_STANDINGS_SUCCESS,
  POST_PHASE_STANDINGS,
  POST_PHASE_STANDINGS_FAILURE,
  POST_PHASE_STANDINGS_SUCCESS
} from './actions';
import eliminationReducer from './reducer';
import { EliminationEntity, EliminationState, initialState } from './state';

describe('deleteElimination', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_STANDINGS,
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
    type: DELETE_PHASE_STANDINGS_FAILURE,
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
    type: DELETE_PHASE_STANDINGS_SUCCESS,
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
    type: PATCH_PHASE_STANDINGS
  };

  it('sets isLoadingPatchElimination to true', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPatchElimination).toBe(true);
  });
});

describe('patchEliminationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_PHASE_STANDINGS_FAILURE
  };

  it('sets isLoadingPatchElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPatchElimination).toBe(false);
  });
});

describe('patchEliminationSuccess', () => {
  const action: HttpAction<ActionTypes, EliminationEntity> = {
    type: PATCH_PHASE_STANDINGS_SUCCESS,
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
    type: POST_PHASE_STANDINGS
  };

  it('sets isLoadingPostElimination to true', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPostElimination).toBe(true);
  });
});

describe('postEliminationFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_PHASE_STANDINGS_FAILURE
  };

  it('sets isLoadingPostElimination to false', () => {
    const newState = eliminationReducer(initialState, action);
    expect(newState.isLoadingPostElimination).toBe(false);
  });
});

describe('postEliminationSuccess', () => {
  const action: HttpAction<ActionTypes, EliminationEntity> = {
    type: POST_PHASE_STANDINGS_SUCCESS,
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
