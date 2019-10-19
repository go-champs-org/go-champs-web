import { HttpAction } from '../Shared/store/interfaces';
import {
  GET_TOURNAMENT,
  GET_TOURNAMENT_FAILURE,
  GET_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
import {
  ActionTypes,
  deleteTeamFailure,
  deleteTeamStart,
  deleteTeamSuccess,
  patchTeamFailure,
  patchTeamStart,
  patchTeamSuccess,
  postTeamFailure,
  postTeamStart,
  postTeamSuccess
} from './actions';
import teamReducer from './reducer';
import { initialState, TeamState } from './state';

describe('deleteTeam', () => {
  const action = deleteTeamStart();

  it('sets isLoadingDeleteTeam to true', () => {
    expect(teamReducer(initialState, action).isLoadingDeleteTeam).toBe(true);
  });
});

describe('deleteTeamFailure', () => {
  const action = deleteTeamFailure('error');

  it('sets isLoadingDeleteTeam to false', () => {
    expect(teamReducer(initialState, action).isLoadingDeleteTeam).toBe(false);
  });
});

describe('deleteTeamSuccess', () => {
  const action = deleteTeamSuccess('first-id');

  const deleteState = {
    ...initialState,
    teams: {
      'first-id': {
        id: 'first-id',
        name: 'first-name',
        stats: {}
      }
    }
  };

  it('sets isLoadingDeleteTeam to false', () => {
    expect(teamReducer(deleteState, action).isLoadingDeleteTeam).toBe(false);
  });

  it('remove entity', () => {
    const newState = teamReducer(deleteState, action);

    expect(newState.teams['first-id']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: TeamState = {
      ...initialState,
      teams: {
        'some-id': {
          id: 'some-id',
          name: 'some-name',
          stats: {}
        },
        ...deleteState.teams
      }
    };

    const newState = teamReducer(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      stats: {}
    });
  });
});

describe('patchTeam', () => {
  const action = patchTeamStart();

  it('sets isLoadingPatchTeam to true', () => {
    expect(teamReducer(initialState, action).isLoadingPatchTeam).toBe(true);
  });
});

describe('patchTeamFailure', () => {
  const action = patchTeamFailure('error');

  it('sets isLoadingPatchTeam to false', () => {
    expect(teamReducer(initialState, action).isLoadingPatchTeam).toBe(false);
  });
});

describe('patchTeamSuccess', () => {
  const action = patchTeamSuccess({
    id: 'first-id',
    name: 'some-first-name',
    stats: {}
  });

  const updateState: TeamState = {
    ...initialState,
    teams: {
      'first-id': {
        id: 'first-id',
        name: 'first-name',
        stats: {}
      }
    }
  };

  it('sets isLoadingPatchTeam to false', () => {
    expect(teamReducer(updateState, action).isLoadingPatchTeam).toBe(false);
  });

  it('set entity', () => {
    const newState = teamReducer(updateState, action);

    expect(newState.teams['first-id']).toEqual({
      id: 'first-id',
      name: 'some-first-name',
      stats: {}
    });
  });

  it('keeps others entities in other', () => {
    const someState: TeamState = {
      ...updateState,
      teams: {
        'some-id': {
          id: 'some-id',
          name: 'some-name',
          stats: {}
        }
      }
    };

    const newState = teamReducer(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      stats: {}
    });
  });
});

describe('postTeam', () => {
  const action = postTeamStart();

  it('sets isLoadingPostTeam to true', () => {
    expect(teamReducer(initialState, action).isLoadingPostTeam).toBe(true);
  });
});

describe('postTeamFailure', () => {
  const action = postTeamFailure('error');

  it('sets isLoadingPostTeam to false', () => {
    expect(teamReducer(initialState, action).isLoadingPostTeam).toBe(false);
  });
});

describe('postTeamSuccess', () => {
  const action = postTeamSuccess({
    id: 'first-id',
    name: 'first-name',
    stats: {}
  });

  it('sets isLoadingPostTeam to false', () => {
    expect(teamReducer(initialState, action).isLoadingPostTeam).toBe(false);
  });

  it('set entity', () => {
    const newState = teamReducer(initialState, action);

    expect(newState.teams['first-id']).toEqual({
      id: 'first-id',
      name: 'first-name',
      stats: {}
    });
  });

  it('keeps others entities in other', () => {
    const someState: TeamState = {
      ...initialState,
      teams: {
        'some-id': {
          id: 'some-id',
          name: 'some-name',
          stats: {}
        }
      }
    };

    const newState = teamReducer(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      stats: {}
    });
  });
});

describe('getTournament', () => {
  const action: HttpAction<ActionTypes> = {
    type: GET_TOURNAMENT
  };

  it('sets isLoadingRequestTournament to true', () => {
    expect(teamReducer(initialState, action).isLoadingRequestTournament).toBe(
      true
    );
  });
});

describe('getTournamentFailure', () => {
  const action: HttpAction<ActionTypes> = {
    type: GET_TOURNAMENT_FAILURE
  };

  it('sets isLoadingRequestTournament to false', () => {
    expect(teamReducer(initialState, action).isLoadingRequestTournament).toBe(
      false
    );
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
    expect(teamReducer(initialState, action).isLoadingRequestTournament).toBe(
      false
    );
  });

  it('sets entities', () => {
    const newState = teamReducer(initialState, action);

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
