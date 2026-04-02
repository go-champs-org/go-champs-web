import {
  tournamentBySlug,
  shouldTournamentHaveLicensingBilling,
  tournaments,
  tournamentsLoading,
  tournamentLoading,
  patchingTournament,
  postingTournament,
  deletingTournament,
  billingAgreementByTournamentSlug,
  billingAgreementLoading
} from './selectors';
import {
  initialState,
  TournamentState,
  DEFAULT_TOURNAMENT,
  BillingAgreementEntity,
  TournamentEntity
} from './state';

describe('tournamentBySlug', () => {
  it('returns tournament when slug exists', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {
        'my-tournament': {
          ...DEFAULT_TOURNAMENT,
          id: 'tournament-id',
          name: 'My Tournament',
          slug: 'my-tournament'
        }
      }
    };

    const result = tournamentBySlug(state, 'my-tournament');

    expect(result).toEqual({
      ...DEFAULT_TOURNAMENT,
      id: 'tournament-id',
      name: 'My Tournament',
      slug: 'my-tournament'
    });
  });

  it('returns DEFAULT_TOURNAMENT when slug does not exist', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {}
    };

    const result = tournamentBySlug(state, 'nonexistent');

    expect(result).toEqual(DEFAULT_TOURNAMENT);
  });

  it('returns DEFAULT_TOURNAMENT when slug is undefined', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {
        'my-tournament': {
          ...DEFAULT_TOURNAMENT,
          id: 'tournament-id',
          slug: 'my-tournament'
        }
      }
    };

    const result = tournamentBySlug(state, undefined);

    expect(result).toEqual(DEFAULT_TOURNAMENT);
  });
});

describe('shouldTournamentHaveLicensingBilling', () => {
  it('returns true for tournament with sport slug', () => {
    const tournament: TournamentEntity = {
      ...DEFAULT_TOURNAMENT,
      sportSlug: 'basketball'
    };

    expect(shouldTournamentHaveLicensingBilling(tournament)).toBe(true);
  });

  it('returns false for tournament without sport slug', () => {
    const tournament: TournamentEntity = {
      ...DEFAULT_TOURNAMENT,
      sportSlug: ''
    };

    expect(shouldTournamentHaveLicensingBilling(tournament)).toBe(false);
  });
});

describe('billingAgreementByTournamentSlug', () => {
  const mockBillingAgreement: BillingAgreementEntity = {
    active: true,
    agreedAmount: '5.00',
    dueDay: 15,
    plan: {
      slug: 'premium-monthly',
      amount: '5.00',
      active: true,
      description: 'Premium Plan',
      name: 'Premium Monthly',
      sportId: 'sport-id-123'
    },
    planId: 'plan-id-123',
    selectedCampaigns: ['campaign1'],
    signedAt: '2023-01-15T10:00:00Z',
    tournamentId: 'tournament-id-123',
    username: 'user@example.com'
  };

  it('returns billing agreement when tournament exists and has agreement', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {
        'my-tournament': {
          ...DEFAULT_TOURNAMENT,
          id: 'tournament-id-123',
          slug: 'my-tournament'
        }
      },
      billingAgreements: {
        'tournament-id-123': mockBillingAgreement
      }
    };

    const result = billingAgreementByTournamentSlug(state, 'my-tournament');

    expect(result).toEqual(mockBillingAgreement);
  });

  it('returns null when tournament exists but has no billing agreement', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {
        'my-tournament': {
          ...DEFAULT_TOURNAMENT,
          id: 'tournament-id-123',
          slug: 'my-tournament'
        }
      },
      billingAgreements: {}
    };

    const result = billingAgreementByTournamentSlug(state, 'my-tournament');

    expect(result).toBeNull();
  });

  it('returns null when billing agreement is explicitly null (403 case)', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {
        'my-tournament': {
          ...DEFAULT_TOURNAMENT,
          id: 'tournament-id-123',
          slug: 'my-tournament'
        }
      },
      billingAgreements: {
        'tournament-id-123': null
      }
    };

    const result = billingAgreementByTournamentSlug(state, 'my-tournament');

    expect(result).toBeNull();
  });

  it('returns null when tournament does not exist', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {},
      billingAgreements: {
        'tournament-id-123': mockBillingAgreement
      }
    };

    const result = billingAgreementByTournamentSlug(state, 'my-tournament');

    expect(result).toBeNull();
  });

  it('returns null when tournament slug is undefined', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {
        'my-tournament': {
          ...DEFAULT_TOURNAMENT,
          id: 'tournament-id-123',
          slug: 'my-tournament'
        }
      },
      billingAgreements: {
        'tournament-id-123': mockBillingAgreement
      }
    };

    const result = billingAgreementByTournamentSlug(state, undefined);

    expect(result).toBeNull();
  });

  it('returns null when tournament has no id', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {
        'my-tournament': {
          ...DEFAULT_TOURNAMENT,
          id: '',
          slug: 'my-tournament'
        }
      },
      billingAgreements: {
        '': mockBillingAgreement
      }
    };

    const result = billingAgreementByTournamentSlug(state, 'my-tournament');

    expect(result).toBeNull();
  });
});

describe('billingAgreementLoading', () => {
  it('returns true when billing agreement is loading', () => {
    const state: TournamentState = {
      ...initialState,
      isLoadingBillingAgreement: true
    };

    expect(billingAgreementLoading(state)).toBe(true);
  });

  it('returns false when billing agreement is not loading', () => {
    const state: TournamentState = {
      ...initialState,
      isLoadingBillingAgreement: false
    };

    expect(billingAgreementLoading(state)).toBe(false);
  });
});

describe('loading selectors', () => {
  it('tournamentsLoading returns correct state', () => {
    expect(
      tournamentsLoading({ ...initialState, isLoadingRequestTournaments: true })
    ).toBe(true);
    expect(
      tournamentsLoading({
        ...initialState,
        isLoadingRequestTournaments: false
      })
    ).toBe(false);
  });

  it('tournamentLoading returns correct state', () => {
    expect(
      tournamentLoading({ ...initialState, isLoadingRequestTournament: true })
    ).toBe(true);
    expect(
      tournamentLoading({ ...initialState, isLoadingRequestTournament: false })
    ).toBe(false);
  });

  it('patchingTournament returns correct state', () => {
    expect(
      patchingTournament({ ...initialState, isLoadingPatchTournament: true })
    ).toBe(true);
    expect(
      patchingTournament({ ...initialState, isLoadingPatchTournament: false })
    ).toBe(false);
  });

  it('postingTournament returns correct state', () => {
    expect(
      postingTournament({ ...initialState, isLoadingPostTournament: true })
    ).toBe(true);
    expect(
      postingTournament({ ...initialState, isLoadingPostTournament: false })
    ).toBe(false);
  });

  it('deletingTournament returns correct state', () => {
    expect(
      deletingTournament({ ...initialState, isLoadingDeleteTournament: true })
    ).toBe(true);
    expect(
      deletingTournament({ ...initialState, isLoadingDeleteTournament: false })
    ).toBe(false);
  });
});

describe('tournaments', () => {
  it('returns array of all tournaments', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {
        'tournament-1': {
          ...DEFAULT_TOURNAMENT,
          id: 'id-1',
          name: 'Tournament 1',
          slug: 'tournament-1'
        },
        'tournament-2': {
          ...DEFAULT_TOURNAMENT,
          id: 'id-2',
          name: 'Tournament 2',
          slug: 'tournament-2'
        }
      }
    };

    const result = tournaments(state);

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({
      ...DEFAULT_TOURNAMENT,
      id: 'id-1',
      name: 'Tournament 1',
      slug: 'tournament-1'
    });
    expect(result).toContainEqual({
      ...DEFAULT_TOURNAMENT,
      id: 'id-2',
      name: 'Tournament 2',
      slug: 'tournament-2'
    });
  });

  it('returns empty array when no tournaments', () => {
    const state: TournamentState = {
      ...initialState,
      tournaments: {}
    };

    const result = tournaments(state);

    expect(result).toEqual([]);
  });
});
