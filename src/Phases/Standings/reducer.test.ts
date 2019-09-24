import { HttpAction } from '../../Shared/store/interfaces';
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
import phaseStandingsReducer from './reducer';
import {
  initialState,
  PhaseStandingsEntity,
  PhaseStandingsState
} from './state';

describe('deletePhaseStandings', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_STANDINGS,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeletePhaseStandings to true', () => {
    const newState = phaseStandingsReducer(initialState, action);
    expect(newState.isLoadingDeletePhaseStandings).toBe(true);
  });
});

describe('deletePhaseStandingsFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_STANDINGS_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeletePhaseStandings to false', () => {
    const newState = phaseStandingsReducer(initialState, action);
    expect(newState.isLoadingDeletePhaseStandings).toBe(false);
  });
});

describe('deletePhaseStandingsSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_PHASE_STANDINGS_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    standings: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        teamStats: []
      }
    }
  };

  it('sets isLoadingDeletePhaseStandings to false', () => {
    const newState = phaseStandingsReducer(initialState, action);
    expect(newState.isLoadingDeletePhaseStandings).toBe(false);
  });

  it('remove entity', () => {
    const newState = phaseStandingsReducer(deleteState, action);

    expect(newState.standings['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: PhaseStandingsState = {
      ...initialState,
      standings: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          teamStats: []
        },
        ...deleteState.standings
      }
    };

    const newState = phaseStandingsReducer(someState, action);

    expect(newState.standings['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      teamStats: []
    });
  });
});

describe('patchPhaseStandings', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_PHASE_STANDINGS
  };

  it('sets isLoadingPatchPhaseStandings to true', () => {
    const newState = phaseStandingsReducer(initialState, action);
    expect(newState.isLoadingPatchPhaseStandings).toBe(true);
  });
});

describe('patchPhaseStandingsFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_PHASE_STANDINGS_FAILURE
  };

  it('sets isLoadingPatchPhaseStandings to false', () => {
    const newState = phaseStandingsReducer(initialState, action);
    expect(newState.isLoadingPatchPhaseStandings).toBe(false);
  });
});

describe('patchPhaseStandingsSuccess', () => {
  const action: HttpAction<ActionTypes, PhaseStandingsEntity> = {
    type: PATCH_PHASE_STANDINGS_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'some-first-title',
      teamStats: []
    }
  };

  const updateState: PhaseStandingsState = {
    ...initialState,
    standings: {
      'first-id': {
        id: 'first-id',
        title: 'first-title',
        teamStats: []
      }
    }
  };

  it('sets isLoadingPatchPhaseStandings to false', () => {
    const newState = phaseStandingsReducer(updateState, action);
    expect(newState.isLoadingPatchPhaseStandings).toBe(false);
  });

  it('set entity', () => {
    const newState = phaseStandingsReducer(updateState, action);

    expect(newState.standings['first-id']).toEqual({
      id: 'first-id',
      title: 'some-first-title',
      teamStats: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseStandingsState = {
      ...updateState,
      standings: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          teamStats: []
        }
      }
    };

    const newState = phaseStandingsReducer(someState, action);

    expect(newState.standings['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      teamStats: []
    });
  });
});

describe('postPhaseStandings', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_PHASE_STANDINGS
  };

  it('sets isLoadingPostPhaseStandings to true', () => {
    const newState = phaseStandingsReducer(initialState, action);
    expect(newState.isLoadingPostPhaseStandings).toBe(true);
  });
});

describe('postPhaseStandingsFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_PHASE_STANDINGS_FAILURE
  };

  it('sets isLoadingPostPhaseStandings to false', () => {
    const newState = phaseStandingsReducer(initialState, action);
    expect(newState.isLoadingPostPhaseStandings).toBe(false);
  });
});

describe('postPhaseStandingsSuccess', () => {
  const action: HttpAction<ActionTypes, PhaseStandingsEntity> = {
    type: POST_PHASE_STANDINGS_SUCCESS,
    payload: {
      id: 'first-id',
      title: 'first-title',
      teamStats: []
    }
  };

  it('sets isLoadingPostPhaseStandings to false', () => {
    const newState = phaseStandingsReducer(initialState, action);
    expect(newState.isLoadingPostPhaseStandings).toBe(false);
  });

  it('set entity', () => {
    const newState = phaseStandingsReducer(initialState, action);

    expect(newState.standings['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title',
      teamStats: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: PhaseStandingsState = {
      ...initialState,
      standings: {
        'some-id': {
          id: 'some-id',
          title: 'some-title',
          teamStats: []
        }
      }
    };

    const newState = phaseStandingsReducer(someState, action);

    expect(newState.standings['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title',
      teamStats: []
    });
  });
});
