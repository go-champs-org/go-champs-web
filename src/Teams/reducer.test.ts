import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import {
  GET_TOURNAMENT_SUCCESS,
  getTournamentSuccess
} from '../Tournaments/actions';
import { DEFAULT_TOURNAMENT } from '../Tournaments/state';
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
        logoUrl: '',
        triCode: '',
        coaches: []
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
          logoUrl: 'some-logo-url',
          triCode: 'some-tri-code',
          coaches: []
        },
        ...deleteState.teams
      }
    };

    const newState = teamReducer(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      logoUrl: 'some-logo-url',
      triCode: 'some-tri-code',
      coaches: []
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
    logoUrl: 'some-logo-url',
    triCode: 'some-tri-code',
    coaches: [
      { id: 'some-coach-id', name: 'some-coach-name', type: 'some-coach-type' }
    ]
  });

  const updateState: TeamState = {
    ...initialState,
    teams: {
      'first-id': {
        id: 'first-id',
        name: 'first-name',
        logoUrl: '',
        triCode: '',
        coaches: []
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
      logoUrl: 'some-logo-url',
      triCode: 'some-tri-code',
      coaches: [
        {
          id: 'some-coach-id',
          name: 'some-coach-name',
          type: 'some-coach-type'
        }
      ]
    });
  });

  it('keeps others entities in other', () => {
    const someState: TeamState = {
      ...updateState,
      teams: {
        'some-id': {
          id: 'some-id',
          name: 'some-name',
          logoUrl: 'some-logo-url',
          triCode: 'some-tri-code',
          coaches: []
        }
      }
    };

    const newState = teamReducer(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      logoUrl: 'some-logo-url',
      triCode: 'some-tri-code',
      coaches: []
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
    logoUrl: 'some-logo-url',
    triCode: 'some-tri-code',
    coaches: []
  });

  it('sets isLoadingPostTeam to false', () => {
    expect(teamReducer(initialState, action).isLoadingPostTeam).toBe(false);
  });

  it('set entity', () => {
    const newState = teamReducer(initialState, action);

    expect(newState.teams['first-id']).toEqual({
      id: 'first-id',
      name: 'first-name',
      logoUrl: 'some-logo-url',
      triCode: 'some-tri-code',
      coaches: []
    });
  });

  it('keeps others entities in other', () => {
    const someState: TeamState = {
      ...initialState,
      teams: {
        'some-id': {
          id: 'some-id',
          name: 'some-name',
          logoUrl: 'some-logo-url',
          triCode: 'some-tri-code',
          coaches: []
        }
      }
    };

    const newState = teamReducer(someState, action);

    expect(newState.teams['some-id']).toEqual({
      id: 'some-id',
      name: 'some-name',
      logoUrl: 'some-logo-url',
      triCode: 'some-tri-code',
      coaches: []
    });
  });
});

describe('getTournamentSuccess', () => {
  const action: HttpAction<ActionTypes, ApiTournamentWithDependecies> = {
    type: GET_TOURNAMENT_SUCCESS,
    payload: {
      ...DEFAULT_TOURNAMENT,
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug',
      teams: [
        {
          id: 'first-team-id',
          name: 'first team name',
          coaches: []
        },
        {
          id: 'second-team-id',
          name: 'second team name',
          coaches: []
        }
      ],
      organization: {
        id: 'some-org-id',
        name: 'some org name',
        slug: 'some-org-slug'
      },
      phases: []
    }
  };

  it('sets entities', () => {
    const newState = teamReducer(initialState, action);

    expect(newState.teams['first-team-id']).toEqual({
      id: 'first-team-id',
      name: 'first team name',
      logoUrl: '',
      triCode: '',
      coaches: []
    });
    expect(newState.teams['second-team-id']).toEqual({
      id: 'second-team-id',
      name: 'second team name',
      logoUrl: '',
      triCode: '',
      coaches: []
    });
  });

  it('does not break is null phases', () => {
    const emptyResponseAction = getTournamentSuccess(
      (DEFAULT_TOURNAMENT as unknown) as ApiTournamentWithDependecies
    );
    const newState = teamReducer(initialState, emptyResponseAction);

    expect(newState).toEqual(initialState);
  });
});
