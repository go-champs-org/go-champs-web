import { HttpAction } from '../Shared/store/interfaces';
import {
  GET_TOURNAMENT,
  GET_TOURNAMENT_FAILURE,
  GET_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
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
  POST_TOURNAMENT_TEAM_SUCCESS
} from './actions';
import {
  deleteTeam,
  deleteTeamFailure,
  deleteTeamSuccess,
  patchTeam,
  patchTeamFailure,
  patchTeamSuccess,
  postTeam,
  postTeamFailure,
  postTeamSuccess,
  getTournament,
  getTournamentFailure,
  getTournamentSuccess
} from './reducer';
import { initialState, TeamState } from './state';

describe('deleteTeam', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_TEAM,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTeam to true', () => {
    expect(deleteTeam(initialState, action).isLoadingDeleteTeam).toBe(true);
  });
});

describe('deleteTeamFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_TEAM_FAILURE,
    payload: {
      id: 'first-id'
    }
  };

  it('sets isLoadingDeleteTeam to false', () => {
    expect(deleteTeamFailure(initialState, action).isLoadingDeleteTeam).toBe(
      false
    );
  });
});

describe('deleteTeamSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: DELETE_TOURNAMENT_TEAM_SUCCESS,
    payload: 'first-id'
  };

  const deleteState = {
    ...initialState,
    teams: {
      ['first-id']: {
        id: 'first-id',
        name: 'first-name'
      }
    }
  };

  it('sets isLoadingDeleteTeam to false', () => {
    expect(deleteTeamSuccess(deleteState, action).isLoadingDeleteTeam).toBe(
      false
    );
  });

  it('remove entity', () => {
    const newState = deleteTeamSuccess(deleteState, action);

    expect(newState.teams['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: TeamState = {
      ...initialState,
      teams: {
        ['some-id']: {
          id: 'some-id',
          name: 'some-name'
        },
        ...deleteState.teams
      }
    };

    const newState = deleteTeamSuccess(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name'
    });
  });
});

describe('patchTeam', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_TEAM
  };

  it('sets isLoadingPatchTeam to true', () => {
    expect(patchTeam(initialState, action).isLoadingPatchTeam).toBe(true);
  });
});

describe('patchTeamFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_TEAM_FAILURE
  };

  it('sets isLoadingPatchTeam to false', () => {
    expect(patchTeamFailure(initialState, action).isLoadingPatchTeam).toBe(
      false
    );
  });
});

describe('patchTeamSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: PATCH_TOURNAMENT_TEAM_SUCCESS,
    payload: {
      id: 'first-id',
      name: 'some-first-name'
    }
  };

  const updateState: TeamState = {
    ...initialState,
    teams: {
      ['first-id']: {
        id: 'first-id',
        name: 'first-name'
      }
    }
  };

  it('sets isLoadingPatchTeam to false', () => {
    expect(patchTeamSuccess(updateState, action).isLoadingPatchTeam).toBe(
      false
    );
  });

  it('set entity', () => {
    const newState = patchTeamSuccess(updateState, action);

    expect(newState.teams['first-id']).toEqual({
      id: 'first-id',
      name: 'some-first-name'
    });
  });

  it('keeps others entities in other', () => {
    const someState: TeamState = {
      ...updateState,
      teams: {
        ['some-id']: {
          id: 'some-id',
          name: 'some-name'
        }
      }
    };

    const newState = patchTeamSuccess(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name'
    });
  });
});

describe('postTeam', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_TEAM
  };

  it('sets isLoadingPostTeam to true', () => {
    expect(postTeam(initialState, action).isLoadingPostTeam).toBe(true);
  });
});

describe('postTeamFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_TEAM_FAILURE
  };

  it('sets isLoadingPostTeam to false', () => {
    expect(postTeamFailure(initialState, action).isLoadingPostTeam).toBe(false);
  });
});

describe('postTeamSuccess', () => {
  const action: HttpAction<ActionTypes> = {
    type: POST_TOURNAMENT_TEAM_SUCCESS,
    payload: {
      id: 'first-id',
      name: 'first-name'
    }
  };

  it('sets isLoadingPostTeam to false', () => {
    expect(postTeamSuccess(initialState, action).isLoadingPostTeam).toBe(false);
  });

  it('set entity', () => {
    const newState = postTeamSuccess(initialState, action);

    expect(newState.teams['first-id']).toEqual({
      id: 'first-id',
      name: 'first-name'
    });
  });

  it('keeps others entities in other', () => {
    const someState: TeamState = {
      ...initialState,
      teams: {
        ['some-id']: {
          id: 'some-id',
          name: 'some-name'
        }
      }
    };

    const newState = postTeamSuccess(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name'
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
      name: 'first-name',
      slug: 'first-slug',
      teams: [
        {
          id: 'first-team-id',
          name: 'first team name'
        },
        {
          id: 'second-team-id',
          name: 'second team name'
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

    expect(newState.teams['first-team-id']).toEqual({
      id: 'first-team-id',
      name: 'first team name'
    });
    expect(newState.teams['second-team-id']).toEqual({
      id: 'second-team-id',
      name: 'second team name'
    });
  });
});
