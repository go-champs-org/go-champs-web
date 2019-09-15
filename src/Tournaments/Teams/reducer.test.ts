import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import {
  ActionTypes,
  DELETE_TOURNAMENT_TEAM,
  DELETE_TOURNAMENT_TEAM_FAILURE,
  DELETE_TOURNAMENT_TEAM_SUCCESS,
  PATCH_TOURNAMENT_TEAM,
  PATCH_TOURNAMENT_TEAM_FAILURE,
  PATCH_TOURNAMENT_TEAM_SUCCESS,
  POST_TOURNAMENT_TEAM,
  POST_TOURNAMENT_TEAM_FAILURE,
  POST_TOURNAMENT_TEAM_SUCCESS,
  UPDATE_TOURNAMENT_TEAM_BY_GROUP
} from './actions';
import {
  deleteTournamentTeam,
  deleteTournamentTeamFailure,
  deleteTournamentTeamSuccess,
  patchTournamentTeam,
  patchTournamentTeamFailure,
  patchTournamentTeamSuccess,
  postTournamentTeam,
  postTournamentTeamFailure,
  postTournamentTeamSuccess,
  requestTournament,
  requestTournamentFailure,
  requestTournamentSuccess,
  updateTournamentTeamByGroup
} from './reducer';
import { initialState, TournamentTeamState } from './state';

describe('deleteTournamentTeam', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_TEAM,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournamentTeam to true', () => {
    expect(
      deleteTournamentTeam(initialState, action).isLoadingDeleteTournamentTeam
    ).toBe(true);
  });
});

describe('deleteTournamentTeamFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_TEAM_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTournamentTeam to false', () => {
    expect(
      deleteTournamentTeamFailure(initialState, action)
        .isLoadingDeleteTournamentTeam
    ).toBe(false);
  });
});

describe('deleteTournamentTeamSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_TEAM_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    tournamentTeams: {
      ['first-id']: {
        id: 'first-id',
        name: 'first-name'
      }
    }
  };

  it('sets isLoadingDeleteTournamentTeam to false', () => {
    expect(
      deleteTournamentTeamSuccess(deleteState, action)
        .isLoadingDeleteTournamentTeam
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = deleteTournamentTeamSuccess(deleteState, action);

    expect(newState.tournamentTeams['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: TournamentTeamState = {
      ...initialState,
      tournamentTeams: {
        ['some-id']: {
          id: 'some-id',
          name: 'some-name'
        },
        ...deleteState.tournamentTeams
      }
    };

    const newState = deleteTournamentTeamSuccess(someState, action);

    expect(newState.tournamentTeams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name'
    });
  });
});

describe('patchTournamentTeam', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_TEAM
  };

  it('sets isLoadingPatchTournamentTeam to true', () => {
    expect(
      patchTournamentTeam(initialState, action).isLoadingPatchTournamentTeam
    ).toBe(true);
  });
});

describe('patchTournamentTeamFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_TEAM_FAILURE
  };

  it('sets isLoadingPatchTournamentTeam to false', () => {
    expect(
      patchTournamentTeamFailure(initialState, action)
        .isLoadingPatchTournamentTeam
    ).toBe(false);
  });
});

describe('patchTournamentTeamSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_TEAM_SUCCESS,
    payload: {
      id: 'first-id',
      name: 'some-first-name'
    }
  };

  const updateState: TournamentTeamState = {
    ...initialState,
    tournamentTeams: {
      ['first-id']: {
        id: 'first-id',
        name: 'first-name'
      }
    }
  };

  it('sets isLoadingPatchTournamentTeam to false', () => {
    expect(
      patchTournamentTeamSuccess(updateState, action)
        .isLoadingPatchTournamentTeam
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = patchTournamentTeamSuccess(updateState, action);

    expect(newState.tournamentTeams['first-id']).toEqual({
      id: 'first-id',
      name: 'some-first-name',
      stats: {},
      group: {}
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentTeamState = {
      ...updateState,
      tournamentTeams: {
        ['some-id']: {
          id: 'some-id',
          name: 'some-name'
        }
      }
    };

    const newState = patchTournamentTeamSuccess(someState, action);

    expect(newState.tournamentTeams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name'
    });
  });
});

describe('postTournamentTeam', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_TEAM
  };

  it('sets isLoadingPostTournamentTeam to true', () => {
    expect(
      postTournamentTeam(initialState, action).isLoadingPostTournamentTeam
    ).toBe(true);
  });
});

describe('postTournamentTeamFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_TEAM_FAILURE
  };

  it('sets isLoadingPostTournamentTeam to false', () => {
    expect(
      postTournamentTeamFailure(initialState, action)
        .isLoadingPostTournamentTeam
    ).toBe(false);
  });
});

describe('postTournamentTeamSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_TEAM_SUCCESS,
    payload: {
      id: 'first-id',
      name: 'first-name'
    }
  };

  it('sets isLoadingPostTournamentTeam to false', () => {
    expect(
      postTournamentTeamSuccess(initialState, action)
        .isLoadingPostTournamentTeam
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = postTournamentTeamSuccess(initialState, action);

    expect(newState.tournamentTeams['first-id']).toEqual({
      id: 'first-id',
      name: 'first-name',
      stats: {},
      group: {}
    });
  });

  it('keeps others entities in other', () => {
    const someState: TournamentTeamState = {
      ...initialState,
      tournamentTeams: {
        ['some-id']: {
          id: 'some-id',
          name: 'some-name'
        }
      }
    };

    const newState = postTournamentTeamSuccess(someState, action);

    expect(newState.tournamentTeams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name'
    });
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
  const action: HttpAction<ActionTypes> = {
    type: REQUEST_TOURNAMENT_SUCCESS,
    payload: {
      data: {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        teams: [
          {
            id: 'first-team-id',
            name: 'first team name',
            stats: {
              someStat: 'first-stat'
            },
            group: {
              id: 'first-group-id',
              name: 'first group name'
            }
          },
          {
            id: 'second-team-id',
            name: 'second team name',
            stats: {
              someStat: 'second-stat'
            },
            group: {
              id: 'second-group-id',
              name: 'second group name'
            }
          }
        ]
      }
    }
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      requestTournamentSuccess(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = requestTournamentSuccess(initialState, action);

    expect(newState.tournamentTeams['first-team-id']).toEqual({
      id: 'first-team-id',
      name: 'first team name',
      stats: {
        someStat: 'first-stat'
      },
      group: {
        id: 'first-group-id',
        name: 'first group name'
      }
    });
    expect(newState.tournamentTeams['second-team-id']).toEqual({
      id: 'second-team-id',
      name: 'second team name',
      stats: {
        someStat: 'second-stat'
      },
      group: {
        id: 'second-group-id',
        name: 'second group name'
      }
    });
  });
});

describe('updateTournamentTeamByGroup', () => {
  const action: HttpAction<ActionTypes> = {
    type: UPDATE_TOURNAMENT_TEAM_BY_GROUP,
    payload: {}
  };

  const someState = {
    ...initialState,
    tournamentTeams: {
      'first-team-id': {
        id: 'first-team-id',
        name: 'first team name',
        stats: {
          someStat: 'first-stat'
        },
        group: {
          id: 'first-group-id',
          name: 'first group name'
        }
      },
      'second-team-id': {
        id: 'second-team-id',
        name: 'second team name',
        stats: {
          someStat: 'second-stat'
        },
        group: {
          id: 'second-group-id',
          name: 'second group name'
        }
      }
    }
  };

  it('sets tournamentTeamsByGroup entities', () => {
    const newState = updateTournamentTeamByGroup(someState, action);

    expect(newState.tournamentTeamsByGroup['first-group-id']).toEqual({
      'first-team-id': {
        id: 'first-team-id',
        name: 'first team name',
        stats: {
          someStat: 'first-stat'
        },
        group: {
          id: 'first-group-id',
          name: 'first group name'
        }
      }
    });
    expect(newState.tournamentTeamsByGroup['second-group-id']).toEqual({
      'second-team-id': {
        id: 'second-team-id',
        name: 'second team name',
        stats: {
          someStat: 'second-stat'
        },
        group: {
          id: 'second-group-id',
          name: 'second group name'
        }
      }
    });
  });
});
