import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import {
  ActionTypes,
  DELETE_TOURNAMENT_STAT,
  DELETE_TOURNAMENT_STAT_FAILURE,
  DELETE_TOURNAMENT_STAT_SUCCESS,
  PATCH_TOURNAMENT_STAT,
  PATCH_TOURNAMENT_STAT_FAILURE,
  PATCH_TOURNAMENT_STAT_SUCCESS,
  POST_TOURNAMENT_STAT,
  POST_TOURNAMENT_STAT_FAILURE,
  POST_TOURNAMENT_STAT_SUCCESS
} from './actions';
import {
  deleteTournamentStat,
  deleteTournamentStatFailure,
  deleteTournamentStatSuccess,
  patchTournamentStat,
  patchTournamentStatFailure,
  patchTournamentStatSuccess,
  postTournamentStat,
  postTournamentStatFailure,
  postTournamentStatSuccess,
  requestTournamentPhase,
  requestTournamentPhaseFailure,
  requestTournamentPhaseSuccess
} from './reducer';
import { initialState, TournamentStatState } from './state';

describe('deleteTournamentStat', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_STAT,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournamentStat to true', () => {
    expect(
      deleteTournamentStat(initialState, action).isLoadingDeleteTournamentStat
    ).toBe(true);
  });
});

describe('deleteTournamentStatFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_STAT_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournamentStat to false', () => {
    expect(
      deleteTournamentStatFailure(initialState, action)
        .isLoadingDeleteTournamentStat
    ).toBe(false);
  });
});

describe('deleteTournamentStatSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_STAT_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    tournamentStats: {
      ['first-id']: {
        id: 'first-id',
        title: 'first-title'
      }
    }
  };

  it('sets isLoadingDeleteTournamentStat to false', () => {
    expect(
      deleteTournamentStatSuccess(deleteState, action)
        .isLoadingDeleteTournamentStat
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = deleteTournamentStatSuccess(deleteState, action);

    expect(newState.tournamentStats['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: TournamentStatState = {
      ...initialState,
      tournamentStats: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title'
        },
        ...deleteState.tournamentStats
      }
    };

    const newState = deleteTournamentStatSuccess(someState, action);

    expect(newState.tournamentStats['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title'
    });
  });
});

describe('patchTournamentStat', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_STAT
  };

  it('sets isLoadingPatchTournamentStat to true', () => {
    expect(
      patchTournamentStat(initialState, action).isLoadingPatchTournamentStat
    ).toBe(true);
  });
});

describe('patchTournamentStatFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_STAT_FAILURE
  };

  it('sets isLoadingPatchTournamentStat to false', () => {
    expect(
      patchTournamentStatFailure(initialState, action)
        .isLoadingPatchTournamentStat
    ).toBe(false);
  });
});

describe('patchTournamentStatSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_STAT_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        title: 'some-first-title'
      }
    }
  };

  const updateState: TournamentStatState = {
    ...initialState,
    tournamentStats: {
      ['first-id']: {
        id: 'first-id',
        title: 'first-title'
      }
    }
  };

  it('sets isLoadingPatchTournamentStat to false', () => {
    expect(
      patchTournamentStatSuccess(updateState, action)
        .isLoadingPatchTournamentStat
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = patchTournamentStatSuccess(updateState, action);

    expect(newState.tournamentStats['first-id']).toEqual({
      id: 'first-id',
      title: 'some-first-title'
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentStatState = {
      ...updateState,
      tournamentStats: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title'
        }
      }
    };

    const newState = patchTournamentStatSuccess(someState, action);

    expect(newState.tournamentStats['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title'
    });
  });
});

describe('postTournamentStat', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_STAT
  };

  it('sets isLoadingPostTournamentStat to true', () => {
    expect(
      postTournamentStat(initialState, action).isLoadingPostTournamentStat
    ).toBe(true);
  });
});

describe('postTournamentStatFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_STAT_FAILURE
  };

  it('sets isLoadingPostTournamentStat to false', () => {
    expect(
      postTournamentStatFailure(initialState, action)
        .isLoadingPostTournamentStat
    ).toBe(false);
  });
});

describe('postTournamentStatSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_STAT_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        title: 'first-title'
      }
    }
  };

  it('sets isLoadingPostTournamentStat to false', () => {
    expect(
      postTournamentStatSuccess(initialState, action)
        .isLoadingPostTournamentStat
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = postTournamentStatSuccess(initialState, action);

    expect(newState.tournamentStats['first-id']).toEqual({
      id: 'first-id',
      title: 'first-title'
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentStatState = {
      ...initialState,
      tournamentStats: {
        ['some-id']: {
          id: 'some-id',
          title: 'some-title'
        }
      }
    };

    const newState = postTournamentStatSuccess(someState, action);

    expect(newState.tournamentStats['some-id']).toEqual({
      id: 'some-id',
      title: 'some-title'
    });
  });
});

describe('requestTournamentPhase', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT
  };

  it('sets isLoadingRequestTournament to true', () => {
    expect(
      requestTournamentPhase(initialState, action).isLoadingRequestTournament
    ).toBe(true);
  });
});

describe('requestTournamentPhaseFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_FAILURE
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      requestTournamentPhaseFailure(initialState, action)
        .isLoadingRequestTournament
    ).toBe(false);
  });
});

describe('requestTournamentPhaseSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        title: 'first-title',
        slug: 'first-slug',
        stats: [
          {
            id: 'first-stat-id',
            title: 'first stat name'
          },
          {
            id: 'second-stat-id',
            title: 'second stat name'
          }
        ]
      }
    }
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      requestTournamentPhaseSuccess(initialState, action)
        .isLoadingRequestTournament
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestTournamentPhaseSuccess(initialState, action);

    expect(newState.tournamentStats['first-stat-id']).toEqual({
      id: 'first-stat-id',
      title: 'first stat name'
    });
    expect(newState.tournamentStats['second-stat-id']).toEqual({
      id: 'second-stat-id',
      title: 'second stat name'
    });
  });
});
