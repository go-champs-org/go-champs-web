import {
  ApiTournament,
  ApiTournamentRequest,
  ApiTournamentWithDependecies,
  ApiPhase,
  ApiPlayerStatRequest,
  ApiTeamStat,
  ApiPlayerStatResponse
} from '../Shared/httpClient/apiTypes';
import {
  TournamentEntity,
  PlayerStatEntity,
  TeamStatEntity,
  PlayerStatVisibility
} from './state';

export const PRIVATE_STAT_SLUGS = [
  'disqualifications',
  'ejections',
  'efficiency',
  'field_goals_attempted',
  'field_goals_missed',
  'fouls_flagrant',
  'fouls_personal',
  'fouls_technical',
  'free_throws_attempted',
  'free_throws_missed',
  'game_played',
  'game_started',
  'minutes_played',
  'plus_minus',
  'three_point_field_goals_attempted',
  'three_point_field_goals_missed'
];

const mapApiPlayerStatVisibilityResponseToVisibility = (
  apiPlayerStatResponse: ApiPlayerStatResponse
): PlayerStatVisibility => {
  return PRIVATE_STAT_SLUGS.includes(apiPlayerStatResponse.slug || '')
    ? 'private'
    : 'public';
};

export const mapPlayerStatEntityToApiPlayerStatRequest = (
  playerStat: PlayerStatEntity
): ApiPlayerStatRequest => ({
  id: playerStat.id ? playerStat.id : undefined,
  title: playerStat.title,
  slug: playerStat.slug ? playerStat.slug : undefined
});

export const mapTeamStatEntityToApiTeamStat = (
  apiTeamStat: TeamStatEntity
): ApiTeamStat => ({
  id: apiTeamStat.id,
  title: apiTeamStat.title,
  slug: apiTeamStat.slug,
  source: apiTeamStat.source
});

export const mapApiPlayerStatResponseToPlayerStatEntity = (
  apiPlayerStatRequest: ApiPlayerStatResponse
): PlayerStatEntity => ({
  id: apiPlayerStatRequest.id ? apiPlayerStatRequest.id : '',
  title: apiPlayerStatRequest.title,
  slug: apiPlayerStatRequest.slug ? apiPlayerStatRequest.slug : '',
  visibility: mapApiPlayerStatVisibilityResponseToVisibility(
    apiPlayerStatRequest
  )
});

export const mapApiTeamStatToTeamStatEntity = (
  apiTeamStat: ApiTeamStat
): TeamStatEntity => ({
  id: apiTeamStat.id,
  title: apiTeamStat.title,
  slug: apiTeamStat.slug,
  source: apiTeamStat.source
});

export const mapApiTournamentToTournamentEntity = (
  apiTournament: ApiTournament
): TournamentEntity => ({
  id: apiTournament.id,
  name: apiTournament.name,
  slug: apiTournament.slug,
  facebook: apiTournament.facebook ? apiTournament.facebook : '',
  instagram: apiTournament.instagram ? apiTournament.instagram : '',
  hasAggregatedPlayerStats: apiTournament.has_aggregated_player_stats,
  siteUrl: apiTournament.site_url ? apiTournament.site_url : '',
  twitter: apiTournament.twitter ? apiTournament.twitter : '',
  playerStats: apiTournament.player_stats
    ? apiTournament.player_stats.map(mapApiPlayerStatResponseToPlayerStatEntity)
    : [],
  teamStats: apiTournament.team_stats
    ? apiTournament.team_stats.map(mapApiTeamStatToTeamStatEntity)
    : [],
  sportName: apiTournament.sport_name ? apiTournament.sport_name : '',
  sportSlug: apiTournament.sport_slug ? apiTournament.sport_slug : '',
  visibility: apiTournament.visibility
});

export const mapTournamentEntityToApiTournamentRequest = (
  tournament: TournamentEntity,
  organizationId: string
): ApiTournamentRequest => ({
  tournament: {
    id: tournament.id,
    name: tournament.name,
    slug: tournament.slug,
    organization_id: organizationId,
    facebook: tournament.facebook ? tournament.facebook : '',
    instagram: tournament.instagram ? tournament.instagram : '',
    site_url: tournament.siteUrl ? tournament.siteUrl : '',
    twitter: tournament.twitter ? tournament.twitter : '',
    player_stats:
      tournament.playerStats.length > 0
        ? tournament.playerStats.map(mapPlayerStatEntityToApiPlayerStatRequest)
        : undefined,
    team_stats:
      tournament.teamStats.length > 0
        ? tournament.teamStats.map(mapTeamStatEntityToApiTeamStat)
        : undefined,
    sport_name: tournament.sportName,
    sport_slug: tournament.sportSlug,
    visibility: tournament.visibility
  }
});

export const currentPhaseId = (tournament: ApiTournamentWithDependecies) => {
  if (!tournament.phases) {
    return '';
  }

  const currentPhase = tournament.phases.find(
    (phase: ApiPhase) => phase.is_in_progress
  );

  if (currentPhase) {
    return currentPhase.id;
  }
  if (tournament.phases.length > 0) {
    return tournament.phases[0].id;
  }
  return '';
};
