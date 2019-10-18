import { HttpAction } from '../Shared/store/interfaces';
import {
  GET_TOURNAMENT,
  GET_TOURNAMENT_FAILURE,
  GET_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
import {
  ActionTypes,
  DELETE_TOURNAMENT_PHASE,
  DELETE_TOURNAMENT_PHASE_FAILURE,
  DELETE_TOURNAMENT_PHASE_SUCCESS,
  PATCH_TOURNAMENT_PHASE,
  PATCH_TOURNAMENT_PHASE_FAILURE,
  PATCH_TOURNAMENT_PHASE_SUCCESS,
  POST_TOURNAMENT_PHASE,
  POST_TOURNAMENT_PHASE_FAILURE,
  POST_TOURNAMENT_PHASE_SUCCESS
} from './actions';
import {
  deletePhase,
  deletePhaseFailure,
  deletePhaseSuccess,
  patchPhase,
  patchPhaseFailure,
  patchPhaseSuccess,
  postPhase,
  postPhaseFailure,
  postPhaseSuccess,
  getTournament,
  getTournamentFailure,
  getTournamentSuccess
} from './reducer';
import { initialState, PhaseEntity, PhaseState, PhaseTypes } from './state';

describe('deletePhase', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_PHASE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeletePhase to true', () => {
    expect(deletePhase(initialState, action).isLoadingDeletePhase).toBe(true);
  });
});

describe('deletePhaseFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_PHASE_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeletePhase to false', () => {
    expect(deletePhaseFailure(initialState, action).isLoadingDeletePhase).toBe(
      false
    );
  });
});

describe('deletePhaseSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_PHASE_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    phases: {
      ['first-id']: {
        id: 'first-id',
        title: 'first-title',
        type: 'eliminations'
      }
    }
  };

  it('sets isLoadingDeletePhase to false', () => {
    expect(deletePhaseSuccess(deleteState, action).isLoadingDeletePhase).toBe(
      false
    );
  });

  it('remove entity', () => {
    const newState = deletePhaseSuccess(deleteState, action);

    expect(newState.phases['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: PhaseState = {
      ...initialState,
      phases: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title',
          type: 'eliminations'
        },
        ...deleteState.phases
      }
    };

    const newState = deletePhaseSuccess(someState, action);

    expect(newState.phases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: 'eliminations'
    });
  });
});

describe('patchPhase', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_PHASE
  };

  it('sets isLoadingPatchPhase to true', () => {
    expect(patchPhase(initialState, action).isLoadingPatchPhase).toBe(true);
  });
});

describe('patchPhaseFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_PHASE_FAILURE
  };

  it('sets isLoadingPatchPhase to false', () => {
    expect(patchPhaseFailure(initialState, action).isLoadingPatchPhase).toBe(
      false
    );
  });
});

describe('patchPhaseSuccess', () => {
  const action: HttpAction<ActionTypes, PhaseEntity> = {
    type: PATCH_TOURNAMENT_PHASE_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'some-first-title',
      type: 'eliminations'
    }
  };

  const updateState: PhaseState = {
    ...initialState,
    phases: {
      ['first-id']: {
        id: 'first-id',
        title: 'first-title',
        type: 'eliminations'
      }
    }
  };

  it('sets isLoadingPatchPhase to false', () => {
    expect(patchPhaseSuccess(updateState, action).isLoadingPatchPhase).toBe(
      false
    );
  });

  it('set entity', () => {
    const newState = patchPhaseSuccess(updateState, action);

    expect(newState.phases['first-id']).toEqual({
      id: 'first-id',
      title: 'some-first-title',
      type: 'eliminations'
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseState = {
      ...updateState,
      phases: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title',
          type: 'eliminations'
        }
      }
    };

    const newState = patchPhaseSuccess(someState, action);

    expect(newState.phases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: 'eliminations'
    });
  });
});

describe('postPhase', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_PHASE
  };

  it('sets isLoadingPostPhase to true', () => {
    expect(postPhase(initialState, action).isLoadingPostPhase).toBe(true);
  });
});

describe('postPhaseFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_PHASE_FAILURE
  };

  it('sets isLoadingPostPhase to false', () => {
    expect(postPhaseFailure(initialState, action).isLoadingPostPhase).toBe(
      false
    );
  });
});

describe('postPhaseSuccess', () => {
  const action: HttpAction<ActionTypes, PhaseEntity> = {
    type: POST_TOURNAMENT_PHASE_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'first-title',
      type: 'elimination',
      order: 1
    }
  };

  it('sets isLoadingPostPhase to false', () => {
    expect(postPhaseSuccess(initialState, action).isLoadingPostPhase).toBe(
      false
    );
  });

  it('set entity', () => {
    const newState = postPhaseSuccess(initialState, action);

    expect(newState.phases['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
      type: 'elimination',
      order: 1
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseState = {
      ...initialState,
      phases: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title',
          type: 'elimination'
        }
      }
    };

    const newState = postPhaseSuccess(someState, action);

    expect(newState.phases['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      type: 'elimination'
    });
  });
});

describe('getTournament', () => {
  const action: HttpAction<ActionTypes> = {
    type: GET_TOURNAMENT
  };

  it('sets isLoadingRequestTournament to true', () => {
    expect(getTournament(initialState, action).isLoadingRequestTournament).toBe(
      true
    );
  });
});

describe('getTournamentFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: GET_TOURNAMENT_FAILURE
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      getTournamentFailure(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });
});

describe('getTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, TournamentEntity> = {
    type: GET_TOURNAMENT_SUCCESS,
    payload: {
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'first-title',
      slug: 'first-slug',
      phases: [
        {
          id: 'first-phase-id',
          title: 'first phase title',
          type: PhaseTypes.elimination,
          order: 1
        },
        {
          id: 'second-phase-id',
          title: 'second phase title',
          type: PhaseTypes.elimination,
          order: 2
        }
      ]
    }
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      getTournamentSuccess(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = getTournamentSuccess(initialState, action);

    expect(newState.phases['first-phase-id']).toEqual({
      id: 'first-phase-id',
      title: 'first phase title',
      type: 'elimination',
      order: 1
    });
    expect(newState.phases['second-phase-id']).toEqual({
      id: 'second-phase-id',
      title: 'second phase title',
      type: 'elimination',
      order: 2
    });
  });
});
