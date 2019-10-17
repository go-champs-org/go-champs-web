import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_TOURNAMENT,
  DELETE_TOURNAMENT_FAILURE,
  DELETE_TOURNAMENT_SUCCESS,
  POST_TOURNAMENT,
  POST_TOURNAMENT_FAILURE,
  POST_TOURNAMENT_SUCCESS,
  REQUEST_FILTER_TOURNAMENTS,
  REQUEST_FILTER_TOURNAMENTS_FAILURE,
  REQUEST_FILTER_TOURNAMENTS_SUCCESS,
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENTS,
  REQUEST_TOURNAMENTS_FAILURE,
  REQUEST_TOURNAMENTS_SUCCESS,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from './actions';
import {
  deleteTournament,
  deleteTournamentFailure,
  deleteTournamentSuccess,
  patchTournament,
  patchTournamentFailure,
  patchTournamentSuccess,
  postTournament,
  postTournamentFailure,
  postTournamentSuccess,
  requestFilterTournaments,
  requestFilterTournamentsFailure,
  requestFilterTournamentsSuccess,
  requestTournament,
  requestTournamentFailure,
  requestTournaments,
  requestTournamentsFailure,
  requestTournamentsSuccess,
  requestTournamentSuccess
} from './reducer';
import {
  DEFAULT_TOURNAMENT,
  initialState,
  PhaseEliminationState,
  TournamentEntity
} from './state';

describe('deleteTournament', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournament to true', () => {
    expect(
      deleteTournament(initialState, action).isLoadingDeleteTournament
    ).toBe(true);
  });
});

describe('deleteTournamentFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournament to false', () => {
    expect(
      deleteTournamentFailure(initialState, action).isLoadingDeleteTournament
    ).toBe(false);
  });
});

describe('deleteTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, string> = {
    type: DELETE_TOURNAMENT_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    tournaments: {
      ['first-slug']: {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      }
    }
  };

  it('sets isLoadingDeleteTournament to false', () => {
    expect(
      deleteTournamentSuccess(deleteState, action).isLoadingDeleteTournament
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = deleteTournamentSuccess(deleteState, action);

    expect(newState.tournaments['first-slug']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: PhaseEliminationState = {
      ...initialState,
      tournaments: {
        ['some-slug']: {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        },
        ...deleteState.tournaments
      }
    };

    const newState = deleteTournamentSuccess(someState, action);

    expect(newState.tournaments['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('patchTournament', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT
  };

  it('sets isLoadingPatchTournament to true', () => {
    expect(patchTournament(initialState, action).isLoadingPatchTournament).toBe(
      true
    );
  });
});

describe('patchTournamentFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_FAILURE
  };

  it('sets isLoadingPatchTournament to false', () => {
    expect(
      patchTournamentFailure(initialState, action).isLoadingPatchTournament
    ).toBe(false);
  });
});

describe('patchTournamentSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_SUCCESS,
    payload: {
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'some-first-name',
      slug: 'first-slug'
    }
  };

  const updateState: PhaseEliminationState = {
    ...initialState,
    tournaments: {
      ['first-slug']: {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      }
    }
  };

  it('sets isLoadingPatchTournament to false', () => {
    expect(
      patchTournamentSuccess(updateState, action).isLoadingPatchTournament
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = patchTournamentSuccess(updateState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('some-first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
  });

  it('keeps others entities in other', () => {
    const someState: PhaseEliminationState = {
      ...updateState,
      tournaments: {
        ['some-slug']: {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        }
      }
    };

    const newState = patchTournamentSuccess(someState, action);

    expect(newState.tournaments['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('postTournament', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT
  };

  it('sets isLoadingPostTournament to true', () => {
    expect(postTournament(initialState, action).isLoadingPostTournament).toBe(
      true
    );
  });
});

describe('postTournamentFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_FAILURE
  };

  it('sets isLoadingPostTournament to false', () => {
    expect(
      postTournamentFailure(initialState, action).isLoadingPostTournament
    ).toBe(false);
  });
});

describe('postTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, TournamentEntity> = {
    type: POST_TOURNAMENT_SUCCESS,
    payload: {
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug'
    }
  };

  it('sets isLoadingPostTournament to false', () => {
    expect(
      postTournamentSuccess(initialState, action).isLoadingPostTournament
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = postTournamentSuccess(initialState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
  });

  it('keeps others entities in other', () => {
    const someState: PhaseEliminationState = {
      ...initialState,
      tournaments: {
        ['some-slug']: {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        }
      }
    };

    const newState = postTournamentSuccess(someState, action);

    expect(newState.tournaments['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('requestFilterTournaments', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_FILTER_TOURNAMENTS
  };

  it('sets isLoadingRequestTournaments to true', () => {
    expect(
      requestFilterTournaments(initialState, action).isLoadingRequestTournaments
    ).toBe(true);
  });
});

describe('requestFilterTournamentsFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_FILTER_TOURNAMENTS_FAILURE
  };

  it('sets isLoadingRequestTournaments to false', () => {
    expect(
      requestFilterTournamentsFailure(initialState, action)
        .isLoadingRequestTournaments
    ).toBe(false);
  });
});

describe('requestFilterTournamentsSuccess', () => {
  const action: HttpAction<ActionTypes, TournamentEntity[]> = {
    type: REQUEST_FILTER_TOURNAMENTS_SUCCESS,
    payload: [
      {
        ...DEFAULT_TOURNAMENT,
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      },
      {
        ...DEFAULT_TOURNAMENT,
        id: 'second-id',
        name: 'second-name',
        slug: 'second-slug'
      }
    ]
  };

  it('sets isLoadingRequestTournaments to false', () => {
    expect(
      requestFilterTournamentsSuccess(initialState, action)
        .isLoadingRequestTournaments
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestFilterTournamentsSuccess(initialState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
    expect(newState.tournaments['second-slug'].id).toEqual('second-id');
    expect(newState.tournaments['second-slug'].name).toEqual('second-name');
    expect(newState.tournaments['second-slug'].slug).toEqual('second-slug');
  });
});

describe('requestTournament', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT
  };

  it('sets isLoadingRequestTournament to true', () => {
    expect(
      requestTournament(initialState, action).isLoadingRequestTournament
    ).toBe(true);
  });
});

describe('requestTournamentFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_FAILURE
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      requestTournamentFailure(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });
});

describe('requestTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, TournamentEntity> = {
    type: REQUEST_TOURNAMENT_SUCCESS,
    payload: {
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug'
    }
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      requestTournamentSuccess(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = requestTournamentSuccess(initialState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
  });

  it('keeps others entities in other', () => {
    const someState: PhaseEliminationState = {
      ...initialState,
      tournaments: {
        ['some-slug']: {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        }
      }
    };

    const newState = requestTournamentSuccess(someState, action);

    expect(newState.tournaments['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('requestTournaments', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENTS
  };

  it('sets isLoadingRequestTournaments to true', () => {
    expect(
      requestTournaments(initialState, action).isLoadingRequestTournaments
    ).toBe(true);
  });
});

describe('requestTournamentsFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENTS_FAILURE
  };

  it('sets isLoadingRequestTournaments to false', () => {
    expect(
      requestTournamentsFailure(initialState, action)
        .isLoadingRequestTournaments
    ).toBe(false);
  });
});

describe('requestTournamentsSuccess', () => {
  const action: HttpAction<ActionTypes, TournamentEntity[]> = {
    type: REQUEST_TOURNAMENTS_SUCCESS,
    payload: [
      {
        ...DEFAULT_TOURNAMENT,
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      },
      {
        ...DEFAULT_TOURNAMENT,
        id: 'second-id',
        name: 'second-name',
        slug: 'second-slug'
      }
    ]
  };

  it('sets isLoadingRequestTournaments to false', () => {
    expect(
      requestTournamentsSuccess(initialState, action)
        .isLoadingRequestTournaments
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestTournamentsSuccess(initialState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
    expect(newState.tournaments['second-slug'].id).toEqual('second-id');
    expect(newState.tournaments['second-slug'].name).toEqual('second-name');
    expect(newState.tournaments['second-slug'].slug).toEqual('second-slug');
  });
});
