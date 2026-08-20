import { ApiProfileScheduleGame } from '../httpClient/apiTypes';
import { mapApiScheduleGameToScheduleGameEntity } from './dataMappers';

describe('mapApiScheduleGameToScheduleGameEntity', () => {
  const apiGame: ApiProfileScheduleGame = {
    id: 'game-id',
    datetime: '2026-08-20T19:30:00Z',
    location: 'Ginásio Central',
    city: 'Porto Alegre',
    is_finished: false,
    live_state: 'not_started',
    phase_id: 'phase-id',
    away_placeholder: 'Vencedor A',
    away_score: 78,
    away_team: {
      id: 'away-id',
      name: 'Away Team',
      primary_color: null
    },
    home_placeholder: 'Vencedor B',
    home_score: 82,
    home_team: {
      id: 'home-id',
      name: 'Home Team',
      primary_color: null
    },
    tournament: {
      id: 'tournament-id',
      name: 'Tournament',
      slug: 'tournament-slug',
      organization: {
        id: 'organization-id',
        name: 'Organization',
        slug: 'organization-slug'
      }
    }
  };

  it('maps a complete API game to a schedule game entity', () => {
    expect(mapApiScheduleGameToScheduleGameEntity(apiGame)).toEqual({
      id: 'game-id',
      datetime: '2026-08-20T19:30:00Z',
      location: 'Ginásio Central',
      city: 'Porto Alegre',
      isFinished: false,
      liveState: 'not_started',
      phaseId: 'phase-id',
      awayTeamName: 'Away Team',
      awayPlaceholder: 'Vencedor A',
      awayScore: 78,
      homeTeamName: 'Home Team',
      homePlaceholder: 'Vencedor B',
      homeScore: 82,
      tournamentId: 'tournament-id',
      tournamentName: 'Tournament',
      tournamentSlug: 'tournament-slug',
      organizationSlug: 'organization-slug'
    });
  });

  it('defaults nullable fields to empty values', () => {
    const entity = mapApiScheduleGameToScheduleGameEntity({
      ...apiGame,
      datetime: null,
      location: null,
      city: null,
      live_state: null,
      away_placeholder: null,
      away_score: null,
      away_team: null,
      home_placeholder: null,
      home_score: null,
      home_team: null
    });

    expect(entity.datetime).toEqual('');
    expect(entity.location).toEqual('');
    expect(entity.city).toEqual('');
    expect(entity.liveState).toEqual('');
    expect(entity.awayTeamName).toEqual('');
    expect(entity.awayPlaceholder).toEqual('');
    expect(entity.homeTeamName).toEqual('');
    expect(entity.homePlaceholder).toEqual('');
    expect(entity.awayScore).toEqual(0);
    expect(entity.homeScore).toEqual(0);
  });

  it('maps a game without a tournament', () => {
    const entity = mapApiScheduleGameToScheduleGameEntity({
      ...apiGame,
      tournament: null
    });

    expect(entity.tournamentId).toEqual('');
    expect(entity.tournamentName).toEqual('');
    expect(entity.tournamentSlug).toEqual('');
    expect(entity.organizationSlug).toEqual('');
  });

  it('maps a tournament without an organization', () => {
    const entity = mapApiScheduleGameToScheduleGameEntity({
      ...apiGame,
      tournament: {
        id: 'tournament-id',
        name: 'Tournament',
        slug: 'tournament-slug',
        organization: null
      }
    });

    expect(entity.tournamentSlug).toEqual('tournament-slug');
    expect(entity.organizationSlug).toEqual('');
  });
});
