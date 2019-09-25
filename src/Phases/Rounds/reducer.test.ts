import { HttpAction } from '../../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_PHASE_ROUND,
  DELETE_PHASE_ROUND_FAILURE,
  DELETE_PHASE_ROUND_SUCCESS,
  PATCH_PHASE_ROUND,
  PATCH_PHASE_ROUND_FAILURE,
  PATCH_PHASE_ROUND_SUCCESS,
  POST_PHASE_ROUND,
  POST_PHASE_ROUND_FAILURE,
  POST_PHASE_ROUND_SUCCESS
} from './actions';
import phaseRoundReducer from './reducer';
import { initialState, PhaseRoundEntity, PhaseRoundState } from './state';

describe('deletePhaseRound', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_ROUND,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeletePhaseRound to true', () => {
    const newState = phaseRoundReducer(initialState, action);
    expect(newState.isLoadingDeletePhaseRound).toBe(true);
  });
});

describe('deletePhaseRoundFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_ROUND_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeletePhaseRound to false', () => {
    const newState = phaseRoundReducer(initialState, action);
    expect(newState.isLoadingDeletePhaseRound).toBe(false);
  });
});

describe('deletePhaseRoundSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_ROUND_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    rounds: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        matches: []
      }
    }
  };

  it('sets isLoadingDeletePhaseRound to false', () => {
    const newState = phaseRoundReducer(initialState, action);
    expect(newState.isLoadingDeletePhaseRound).toBe(false);
  });

  it('remove entity', () => {
    const newState = phaseRoundReducer(deleteState, action);

    expect(newState.rounds['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: PhaseRoundState = {
      ...initialState,
      rounds: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          matches: []
        },
        ...deleteState.rounds
      }
    };

    const newState = phaseRoundReducer(someState, action);

    expect(newState.rounds['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      matches: []
    });
  });
});

describe('patchPhaseRound', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_PHASE_ROUND
  };

  it('sets isLoadingPatchPhaseRound to true', () => {
    const newState = phaseRoundReducer(initialState, action);
    expect(newState.isLoadingPatchPhaseRound).toBe(true);
  });
});

describe('patchPhaseRoundFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_PHASE_ROUND_FAILURE
  };

  it('sets isLoadingPatchPhaseRound to false', () => {
    const newState = phaseRoundReducer(initialState, action);
    expect(newState.isLoadingPatchPhaseRound).toBe(false);
  });
});

describe('patchPhaseRoundSuccess', () => {
  const action: HttpAction<ActionTypes, PhaseRoundEntity> = {
    type: PATCH_PHASE_ROUND_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'some-first-title',
      matches: []
    }
  };

  const updateState: PhaseRoundState = {
    ...initialState,
    rounds: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        matches: []
      }
    }
  };

  it('sets isLoadingPatchPhaseRound to false', () => {
    const newState = phaseRoundReducer(updateState, action);
    expect(newState.isLoadingPatchPhaseRound).toBe(false);
  });

  it('set entity', () => {
    const newState = phaseRoundReducer(updateState, action);

    expect(newState.rounds['first-id']).toEqual({
      id: 'first-id',
      title: 'some-first-title',
      matches: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseRoundState = {
      ...updateState,
      rounds: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          matches: []
        }
      }
    };

    const newState = phaseRoundReducer(someState, action);

    expect(newState.rounds['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      matches: []
    });
  });
});

describe('postPhaseRound', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_PHASE_ROUND
  };

  it('sets isLoadingPostPhaseRound to true', () => {
    const newState = phaseRoundReducer(initialState, action);
    expect(newState.isLoadingPostPhaseRound).toBe(true);
  });
});

describe('postPhaseRoundFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_PHASE_ROUND_FAILURE
  };

  it('sets isLoadingPostPhaseRound to false', () => {
    const newState = phaseRoundReducer(initialState, action);
    expect(newState.isLoadingPostPhaseRound).toBe(false);
  });
});

describe('postPhaseRoundSuccess', () => {
  const action: HttpAction<ActionTypes, PhaseRoundEntity> = {
    type: POST_PHASE_ROUND_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'first-title',
      matches: []
    }
  };

  it('sets isLoadingPostPhaseRound to false', () => {
    const newState = phaseRoundReducer(initialState, action);
    expect(newState.isLoadingPostPhaseRound).toBe(false);
  });

  it('set entity', () => {
    const newState = phaseRoundReducer(initialState, action);

    expect(newState.rounds['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
      matches: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseRoundState = {
      ...initialState,
      rounds: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          matches: []
        }
      }
    };

    const newState = phaseRoundReducer(someState, action);

    expect(newState.rounds['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      matches: []
    });
  });
});
