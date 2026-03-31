import {
  ApiPlayerStatResponse,
  ApiBillingAgreement,
  ApiPlan
} from '../Shared/httpClient/apiTypes';
import {
  mapApiPlayerStatResponseToPlayerStatEntity,
  PRIVATE_STAT_SLUGS,
  mapApiPlanToPlanEntity,
  mapApiBillingAgreementToBillingAgreementEntity
} from './dataMappers';

describe('mapApiPlayerStatResponseToPlayerStatEntity', () => {
  it('returns a player stat entity with public visibility by default', () => {
    const apiPlayerStatResponse: ApiPlayerStatResponse = {
      id: 'some-id',
      title: 'some-stat'
    };
    expect(
      mapApiPlayerStatResponseToPlayerStatEntity(apiPlayerStatResponse)
        .visibility
    ).toEqual('public');
  });

  it('returns a player stat entity with private visibility for PRIVATE_STAT_SLUGS', () => {
    PRIVATE_STAT_SLUGS.forEach(privateStatSlug => {
      const apiPlayerStatResponse: ApiPlayerStatResponse = {
        id: 'some-id',
        title: 'some-stat',
        slug: privateStatSlug
      };

      expect(
        mapApiPlayerStatResponseToPlayerStatEntity(apiPlayerStatResponse)
          .visibility
      ).toEqual('private');
    });
  });
});

describe('mapApiPlanToPlanEntity', () => {
  it('maps API plan to plan entity', () => {
    const apiPlan: ApiPlan & {
      active: boolean;
      description: string;
      name: string;
      sport_id: string;
    } = {
      slug: 'premium-monthly',
      amount: '5.00',
      active: true,
      description: 'Premium monthly plan',
      name: 'Premium Monthly',
      sport_id: 'sport-123'
    };

    const result = mapApiPlanToPlanEntity(apiPlan);

    expect(result).toEqual({
      slug: 'premium-monthly',
      amount: '5.00',
      active: true,
      description: 'Premium monthly plan',
      name: 'Premium Monthly',
      sportId: 'sport-123'
    });
  });

  it('handles minimal API plan', () => {
    const apiPlan: ApiPlan = {
      slug: 'basic',
      amount: '0.00'
    };

    const result = mapApiPlanToPlanEntity(apiPlan);

    expect(result).toEqual({
      slug: 'basic',
      amount: '0.00',
      active: false,
      description: '',
      name: '',
      sportId: ''
    });
  });
});

describe('mapApiBillingAgreementToBillingAgreementEntity', () => {
  it('maps API billing agreement to billing agreement entity', () => {
    const apiBillingAgreement: ApiBillingAgreement = {
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
      selected_campaigns: ['campaign1', 'campaign2'],
      signed_at: '2023-01-15T10:00:00Z',
      tournament_id: 'tournament-id-123',
      username: 'user@example.com',
      trial_active: true,
      games_remaining: 10
    };

    const result = mapApiBillingAgreementToBillingAgreementEntity(
      apiBillingAgreement
    );

    expect(result).toEqual({
      active: true,
      agreedAmount: '5.00',
      dueDay: 15,
      plan: {
        slug: 'premium-monthly',
        amount: '5.00',
        active: true,
        description: 'Premium plan',
        name: 'Premium Monthly',
        sportId: 'sport-123'
      },
      planId: 'plan-id-123',
      selectedCampaigns: ['campaign1', 'campaign2'],
      signedAt: '2023-01-15T10:00:00Z',
      tournamentId: 'tournament-id-123',
      username: 'user@example.com',
      trialActive: true,
      gamesRemaining: 10
    });
  });

  it('handles null agreed_amount', () => {
    const apiBillingAgreement: ApiBillingAgreement = {
      active: true,
      agreed_amount: null,
      due_day: 1,
      plan: {
        slug: 'free',
        amount: '0.00',
        active: true,
        description: 'Free plan',
        name: 'Free',
        sport: null,
        sport_id: ''
      },
      plan_id: 'free-plan',
      selected_campaigns: [],
      signed_at: '2023-01-01T00:00:00Z',
      tournament_id: 'tournament-123',
      username: 'test@test.com'
    };

    const result = mapApiBillingAgreementToBillingAgreementEntity(
      apiBillingAgreement
    );

    expect(result.agreedAmount).toBeNull();
    expect(result.selectedCampaigns).toEqual([]);
  });
});
