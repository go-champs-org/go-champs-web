import {
  deleteTournamentFailure,
  deleteTournamentStart,
  deleteTournamentSuccess,
  getTournamentFailure,
  getTournamentsByFilterFailure,
  getTournamentsByFilterStart,
  getTournamentsByFilterSuccess,
  getTournamentStart,
  getTournamentSuccess,
  patchTournamentFailure,
  patchTournamentStart,
  patchTournamentSuccess,
  postTournamentFailure,
  postTournamentStart,
  postTournamentSuccess
} from './actions';
import tournamentReducer from './reducer';
import { DEFAULT_TOURNAMENT, initialState, TournamentState } from './state';

describe('deleteTournament', () => {
  const action = deleteTournamentStart();

  it('sets isLoadingDeleteTournament to true', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingDeleteTournament
    ).toBe(true);
  });
});

describe('deleteTournamentFailure', () => {
  const action = deleteTournamentFailure('error');

  it('sets isLoadingDeleteTournament to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingDeleteTournament
    ).toBe(false);
  });
});

describe('deleteTournamentSuccess', () => {
  const action = deleteTournamentSuccess('first-id');

  const deleteState = {
    ...initialState,
    tournaments: {
      'first-slug': {
        ...DEFAULT_TOURNAMENT,
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug'
      }
    }
  };

  it('sets isLoadingDeleteTournament to false', () => {
    expect(
      tournamentReducer(deleteState, action).isLoadingDeleteTournament
    ).toBe(false);
  });

  it('remove entity', () => {
    const newState = tournamentReducer(deleteState, action);

    expect(newState.tournaments['first-slug']).toBeUndefined();
  });

  it('keeps others entities in other', () => {
    const someState: TournamentState = {
      ...initialState,
      tournaments: {
        'some-slug': {
          ...DEFAULT_TOURNAMENT,
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug'
        },
        ...deleteState.tournaments
      }
    };

    const newState = tournamentReducer(someState, action);

    expect(newState.tournaments['some-slug']).toEqual({
      ...DEFAULT_TOURNAMENT,
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug'
    });
  });
});

describe('patchTournament', () => {
  const action = patchTournamentStart();

  it('sets isLoadingPatchTournament to true', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingPatchTournament
    ).toBe(true);
  });
});

describe('patchTournamentFailure', () => {
  const action = patchTournamentFailure('error');

  it('sets isLoadingPatchTournament to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingPatchTournament
    ).toBe(false);
  });
});

describe('patchTournamentSuccess', () => {
  const action = patchTournamentSuccess({
    id: 'first-id',
    name: 'some-first-name',
    slug: 'first-slug',
    facebook: 'first updated facebook',
    instagram: 'first updated instagram',
    site_url: 'first updated site url',
    twitter: 'first updated twitter',
    organization: {
      id: 'some-org-id',
      name: 'some org name',
      slug: 'some-org-slug'
    },
    player_stats: [
      {
        id: 'some-stat-id',
        title: 'some-updated-stat-title'
      }
    ],
    phases: [],
    teams: [],
    team_stats: [
      {
        id: 'some-team-stat-id',
        source: 'some-updated-source-id',
        title: 'some-updated-team-stat-title'
      }
    ],
    players: [],
    visibility: 'public'
  });

  const updateState: TournamentState = {
    ...initialState,
    tournaments: {
      'first-slug': {
        id: 'first-id',
        name: 'first-name',
        slug: 'first-slug',
        facebook: 'first facebook',
        instagram: 'first instagram',
        siteUrl: 'first site url',
        twitter: 'first twitter',
        playerStats: [
          {
            id: 'some-stat-id',
            slug: '',
            title: 'some-stat-title',
            visibility: 'public'
          }
        ],
        teamStats: [
          {
            id: 'some-team-stat-id',
            source: 'some-source-id',
            title: 'some-team-stat-title'
          }
        ],
        visibility: 'public'
      }
    }
  };

  it('sets isLoadingPatchTournament to false', () => {
    expect(
      tournamentReducer(updateState, action).isLoadingPatchTournament
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = tournamentReducer(updateState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('some-first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
    expect(newState.tournaments['first-slug'].facebook).toEqual(
      'first updated facebook'
    );
    expect(newState.tournaments['first-slug'].instagram).toEqual(
      'first updated instagram'
    );
    expect(newState.tournaments['first-slug'].siteUrl).toEqual(
      'first updated site url'
    );
    expect(newState.tournaments['first-slug'].twitter).toEqual(
      'first updated twitter'
    );
    expect(newState.tournaments['first-slug'].playerStats).toEqual([
      {
        id: 'some-stat-id',
        slug: '',
        title: 'some-updated-stat-title',
        visibility: 'public'
      }
    ]);
    expect(newState.tournaments['first-slug'].teamStats).toEqual([
      {
        id: 'some-team-stat-id',
        source: 'some-updated-source-id',
        title: 'some-updated-team-stat-title'
      }
    ]);
    expect(newState.tournaments['first-slug'].visibility).toEqual('public');
  });

  it('keeps others entities in other', () => {
    const someState: TournamentState = {
      ...updateState,
      tournaments: {
        'some-slug': {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug',
          facebook: 'some facebook',
          instagram: 'some instagram',
          siteUrl: 'some site',
          twitter: 'some twitter',
          playerStats: [],
          teamStats: [],
          sportName: '',
          sportSlug: '',
          visibility: 'public'
        }
      }
    };

    const newState = tournamentReducer(someState, action);

    expect(newState.tournaments['some-slug']).toEqual({
      ...DEFAULT_TOURNAMENT,
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug',
      facebook: 'some facebook',
      instagram: 'some instagram',
      siteUrl: 'some site',
      twitter: 'some twitter',
      playerStats: [],
      teamStats: [],
      sportName: '',
      sportSlug: '',
      visibility: 'public'
    });
  });
});

describe('postTournament', () => {
  const action = postTournamentStart();

  it('sets isLoadingPostTournament to true', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingPostTournament
    ).toBe(true);
  });
});

describe('postTournamentFailure', () => {
  const action = postTournamentFailure('error');

  it('sets isLoadingPostTournament to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingPostTournament
    ).toBe(false);
  });
});

describe('postTournamentSuccess', () => {
  const action = postTournamentSuccess({
    ...DEFAULT_TOURNAMENT,
    id: 'first-id',
    name: 'first-name',
    slug: 'first-slug',
    facebook: 'first facebook',
    instagram: 'first instagram',
    site_url: 'first site url',
    twitter: 'first twitter',
    organization: {
      id: 'some-org-id',
      name: 'some org name',
      slug: 'some-org-slug'
    },
    phases: [],
    teams: [],
    players: [],
    sport_name: 'some-sport-name',
    sport_slug: 'some-sport-slug',
    visibility: 'public'
  });

  it('sets isLoadingPostTournament to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingPostTournament
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = tournamentReducer(initialState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
    expect(newState.tournaments['first-slug'].facebook).toEqual(
      'first facebook'
    );
    expect(newState.tournaments['first-slug'].instagram).toEqual(
      'first instagram'
    );
    expect(newState.tournaments['first-slug'].siteUrl).toEqual(
      'first site url'
    );
    expect(newState.tournaments['first-slug'].twitter).toEqual('first twitter');
    expect(newState.tournaments['first-slug'].sportName).toEqual(
      'some-sport-name'
    );
    expect(newState.tournaments['first-slug'].sportSlug).toEqual(
      'some-sport-slug'
    );
    expect(newState.tournaments['first-slug'].visibility).toEqual('public');
  });

  it('keeps others entities in other', () => {
    const someState: TournamentState = {
      ...initialState,
      tournaments: {
        'some-slug': {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug',
          facebook: 'some facebook',
          instagram: 'some instagram',
          siteUrl: 'some site',
          twitter: 'some twitter',
          playerStats: [],
          teamStats: [],
          visibility: 'public'
        }
      }
    };

    const newState = tournamentReducer(someState, action);

    expect(newState.tournaments['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug',
      facebook: 'some facebook',
      instagram: 'some instagram',
      siteUrl: 'some site',
      twitter: 'some twitter',
      playerStats: [],
      teamStats: [],
      visibility: 'public'
    });
  });
});

describe('getTournamentsByFilter', () => {
  const action = getTournamentsByFilterStart();

  it('sets isLoadingRequestTournaments to true', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingRequestTournaments
    ).toBe(true);
  });
});

describe('getTournamentsByFilterFailure', () => {
  const action = getTournamentsByFilterFailure('error');

  it('sets isLoadingRequestTournaments to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingRequestTournaments
    ).toBe(false);
  });
});

describe('getTournamentsByFilterSuccess', () => {
  const action = getTournamentsByFilterSuccess([
    {
      id: 'first-id',
      name: 'first-name',
      slug: 'first-slug'
    },
    {
      id: 'second-id',
      name: 'second-name',
      slug: 'second-slug'
    }
  ]);

  it('sets isLoadingRequestTournaments to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingRequestTournaments
    ).toBe(false);
  });

  it('sets entities', () => {
    const newState = tournamentReducer(initialState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
    expect(newState.tournaments['second-slug'].id).toEqual('second-id');
    expect(newState.tournaments['second-slug'].name).toEqual('second-name');
    expect(newState.tournaments['second-slug'].slug).toEqual('second-slug');
  });
});

describe('getTournament', () => {
  const action = getTournamentStart();

  it('sets isLoadingRequestTournament to true', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingRequestTournament
    ).toBe(true);
  });
});

describe('getTournamentFailure', () => {
  const action = getTournamentFailure('error');

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });
});

describe('getTournamentSuccess', () => {
  const action = getTournamentSuccess({
    id: 'first-id',
    name: 'first-name',
    slug: 'first-slug',
    facebook: 'first facebook',
    instagram: 'first instagram',
    site_url: 'first site url',
    twitter: 'first twitter',
    organization: {
      id: 'some-org-id',
      name: 'some org name',
      slug: 'some-org-slug'
    },
    phases: [],
    teams: [],
    players: [],
    team_stats: [
      {
        id: 'first-team-stat-id',
        source: 'first-source',
        title: 'first-title'
      }
    ],
    sport_name: 'some-sport-name',
    sport_slug: 'some-sport-slug',
    visibility: 'public'
  });

  it('sets isLoadingRequestTournament to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingRequestTournament
    ).toBe(false);
  });

  it('set entity', () => {
    const newState = tournamentReducer(initialState, action);

    expect(newState.tournaments['first-slug'].id).toEqual('first-id');
    expect(newState.tournaments['first-slug'].name).toEqual('first-name');
    expect(newState.tournaments['first-slug'].slug).toEqual('first-slug');
    expect(newState.tournaments['first-slug'].facebook).toEqual(
      'first facebook'
    );
    expect(newState.tournaments['first-slug'].instagram).toEqual(
      'first instagram'
    );
    expect(newState.tournaments['first-slug'].siteUrl).toEqual(
      'first site url'
    );
    expect(newState.tournaments['first-slug'].twitter).toEqual('first twitter');
    expect(newState.tournaments['first-slug'].teamStats).toEqual([
      {
        id: 'first-team-stat-id',
        source: 'first-source',
        title: 'first-title'
      }
    ]);
    expect(newState.tournaments['first-slug'].sportName).toEqual(
      'some-sport-name'
    );
    expect(newState.tournaments['first-slug'].sportSlug).toEqual(
      'some-sport-slug'
    );
    expect(newState.tournaments['first-slug'].visibility).toEqual('public');
  });

  it('keeps others entities in other', () => {
    const someState: TournamentState = {
      ...initialState,
      tournaments: {
        'some-slug': {
          id: 'some-id',
          name: 'some-name',
          slug: 'some-slug',
          facebook: 'some facebook',
          instagram: 'some instagram',
          siteUrl: 'some site',
          twitter: 'some twitter',
          visibility: 'public'
        }
      }
    };

    const newState = tournamentReducer(someState, action);

    expect(newState.tournaments['some-slug']).toEqual({
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug',
      facebook: 'some facebook',
      instagram: 'some instagram',
      siteUrl: 'some site',
      twitter: 'some twitter',
      visibility: 'public'
    });
  });
});
