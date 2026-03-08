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
  postTournamentSuccess,
  getBillingAgreementStart,
  getBillingAgreementSuccess,
  getBillingAgreementFailure
} from './actions';
import tournamentReducer from './reducer';
import {
  DEFAULT_TOURNAMENT,
  initialState,
  TournamentState,
  BillingAgreementEntity
} from './state';
import { ApiBillingAgreement } from '../Shared/httpClient/apiTypes';

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
        slug: 'some-updated-slug',
        source: 'some-updated-source-id',
        title: 'some-updated-team-stat-title'
      }
    ],
    players: [],
    officials: [],
    registrations: [],
    scoreboard_setting: {} as any,
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
            slug: 'some-slug',
            source: 'some-source-id',
            title: 'some-team-stat-title'
          }
        ],
        logoUrl: '',
        sponsors: [],
        sportName: '',
        sportSlug: '',
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
        slug: 'some-updated-slug',
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
          logoUrl: '',
          sponsors: [],
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
      logoUrl: '',
      sponsors: [],
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
    officials: [],
    registrations: [],
    scoreboard_setting: {} as any,
    sport_name: 'some-sport-name',
    sport_slug: 'some-sport-slug',
    visibility: 'public'
  } as any);

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
          logoUrl: '',
          sponsors: [],
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
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug',
      facebook: 'some facebook',
      instagram: 'some instagram',
      siteUrl: 'some site',
      twitter: 'some twitter',
      logoUrl: '',
      sponsors: [],
      playerStats: [],
      teamStats: [],
      sportName: '',
      sportSlug: '',
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
      slug: 'first-slug',
      visibility: 'public'
    },
    {
      id: 'second-id',
      name: 'second-name',
      slug: 'second-slug',
      visibility: 'public'
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
    officials: [],
    registrations: [],
    scoreboard_setting: {} as any,
    team_stats: [
      {
        id: 'first-team-stat-id',
        slug: 'first-slug',
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
        slug: 'first-slug',
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
          logoUrl: '',
          sponsors: [],
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
      id: 'some-id',
      name: 'some-name',
      slug: 'some-slug',
      facebook: 'some facebook',
      instagram: 'some instagram',
      siteUrl: 'some site',
      twitter: 'some twitter',
      logoUrl: '',
      sponsors: [],
      playerStats: [],
      teamStats: [],
      sportName: '',
      sportSlug: '',
      visibility: 'public'
    });
  });
});

describe('getBillingAgreement', () => {
  const action = getBillingAgreementStart();

  it('sets isLoadingBillingAgreement to true', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingBillingAgreement
    ).toBe(true);
  });
});

describe('getBillingAgreementFailure', () => {
  const action = getBillingAgreementFailure('error');

  it('sets isLoadingBillingAgreement to false', () => {
    expect(
      tournamentReducer(initialState, action).isLoadingBillingAgreement
    ).toBe(false);
  });
});

describe('getBillingAgreementSuccess', () => {
  const mockApiBillingAgreement: ApiBillingAgreement = {
    active: true,
    agreed_amount: '5.00',
    due_day: 15,
    plan: {
      slug: 'premium-monthly',
      amount: '5.00',
      active: true,
      description: 'Premium plan',
      name: 'Premium Monthly',
      sport: { id: 'sport-123' },
      sport_id: 'sport-123'
    },
    plan_id: 'plan-id-123',
    selected_campaigns: ['campaign1'],
    signed_at: '2023-01-15T10:00:00Z',
    tournament_id: 'tournament-id-123',
    username: 'user@example.com'
  };

  it('sets isLoadingBillingAgreement to false', () => {
    const action = getBillingAgreementSuccess([mockApiBillingAgreement]);
    const newState = tournamentReducer(initialState, action);

    expect(newState.isLoadingBillingAgreement).toBe(false);
  });

  it('stores billing agreement entity keyed by tournament ID', () => {
    const action = getBillingAgreementSuccess([mockApiBillingAgreement]);
    const newState = tournamentReducer(initialState, action);

    expect(newState.billingAgreements['tournament-id-123']).toBeDefined();
    expect(newState.billingAgreements['tournament-id-123']?.active).toBe(true);
    expect(newState.billingAgreements['tournament-id-123']?.agreedAmount).toBe(
      '5.00'
    );
    expect(newState.billingAgreements['tournament-id-123']?.dueDay).toBe(15);
    expect(newState.billingAgreements['tournament-id-123']?.planId).toBe(
      'plan-id-123'
    );
    expect(
      newState.billingAgreements['tournament-id-123']?.selectedCampaigns
    ).toEqual(['campaign1']);
    expect(newState.billingAgreements['tournament-id-123']?.signedAt).toBe(
      '2023-01-15T10:00:00Z'
    );
    expect(newState.billingAgreements['tournament-id-123']?.tournamentId).toBe(
      'tournament-id-123'
    );
    expect(newState.billingAgreements['tournament-id-123']?.username).toBe(
      'user@example.com'
    );
  });

  it('maps plan nested object correctly', () => {
    const action = getBillingAgreementSuccess([mockApiBillingAgreement]);
    const newState = tournamentReducer(initialState, action);

    const plan = newState.billingAgreements['tournament-id-123']?.plan;
    expect(plan).toBeDefined();
    expect(plan?.slug).toBe('premium-monthly');
    expect(plan?.amount).toBe('5.00');
    expect(plan?.active).toBe(true);
    expect(plan?.description).toBe('Premium plan');
    expect(plan?.name).toBe('Premium Monthly');
    expect(plan?.sportId).toBe('sport-123');
  });

  it('handles null response (unauthorized user)', () => {
    const action = getBillingAgreementSuccess(null);
    const newState = tournamentReducer(initialState, action);

    expect(newState.isLoadingBillingAgreement).toBe(false);
    expect(newState.billingAgreements).toEqual({});
  });

  it('handles empty array response', () => {
    const action = getBillingAgreementSuccess([]);
    const newState = tournamentReducer(initialState, action);

    expect(newState.isLoadingBillingAgreement).toBe(false);
    expect(newState.billingAgreements).toEqual({});
  });

  it('updates existing billing agreement', () => {
    const existingAgreement: BillingAgreementEntity = {
      active: false,
      agreedAmount: '3.00',
      dueDay: 1,
      plan: {
        slug: 'basic',
        amount: '3.00',
        active: true,
        description: 'Basic plan',
        name: 'Basic',
        sportId: 'sport-456'
      },
      planId: 'plan-id-456',
      selectedCampaigns: [],
      signedAt: '2023-01-01T00:00:00Z',
      tournamentId: 'tournament-id-123',
      username: 'old@example.com'
    };

    const stateWithAgreement: TournamentState = {
      ...initialState,
      billingAgreements: {
        'tournament-id-123': existingAgreement
      }
    };

    const action = getBillingAgreementSuccess([mockApiBillingAgreement]);
    const newState = tournamentReducer(stateWithAgreement, action);

    expect(newState.billingAgreements['tournament-id-123']?.username).toBe(
      'user@example.com'
    );
    expect(newState.billingAgreements['tournament-id-123']?.agreedAmount).toBe(
      '5.00'
    );
  });

  it('preserves other billing agreements', () => {
    const otherAgreement: BillingAgreementEntity = {
      active: true,
      agreedAmount: '10.00',
      dueDay: 20,
      plan: {
        slug: 'enterprise',
        amount: '10.00',
        active: true,
        description: 'Enterprise plan',
        name: 'Enterprise',
        sportId: 'sport-789'
      },
      planId: 'plan-id-789',
      selectedCampaigns: ['campaign2'],
      signedAt: '2023-02-01T00:00:00Z',
      tournamentId: 'other-tournament-id',
      username: 'other@example.com'
    };

    const stateWithAgreement: TournamentState = {
      ...initialState,
      billingAgreements: {
        'other-tournament-id': otherAgreement
      }
    };

    const action = getBillingAgreementSuccess([mockApiBillingAgreement]);
    const newState = tournamentReducer(stateWithAgreement, action);

    expect(newState.billingAgreements['other-tournament-id']).toEqual(
      otherAgreement
    );
    expect(newState.billingAgreements['tournament-id-123']).toBeDefined();
  });
});
