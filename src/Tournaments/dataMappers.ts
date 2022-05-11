import {
  ApiTournament,
  ApiTournamentRequest,
  ApiTournamentWithDependecies,
  ApiPhase,
  ApiPlayerStat,
  ApiTeamStat
} from '../Shared/httpClient/apiTypes';
import { TournamentEntity, PlayerStatEntity, TeamStatEntity } from './state';

export const mapPlayerStatEntityToApiPlayerStat = (
  apiPlayerStat: PlayerStatEntity
): ApiPlayerStat => ({
  id: apiPlayerStat.id,
  title: apiPlayerStat.title
});

export const mapTeamStatEntityToApiTeamStat = (
  apiTeamStat: TeamStatEntity
): ApiTeamStat => ({
  id: apiTeamStat.id,
  title: apiTeamStat.title,
  source: apiTeamStat.source
});

export const mapApiPlayerStatToPlayerStatEntity = (
  apiPlayerStat: ApiPlayerStat
): PlayerStatEntity => ({
  id: apiPlayerStat.id,
  title: apiPlayerStat.title
});

export const mapApiTeamStatToTeamStatEntity = (
  apiTeamStat: ApiTeamStat
): TeamStatEntity => ({
  id: apiTeamStat.id,
  title: apiTeamStat.title,
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
    ? apiTournament.player_stats.map(mapApiPlayerStatToPlayerStatEntity)
    : [],
  teamStats: apiTournament.team_stats
    ? apiTournament.team_stats.map(mapApiTeamStatToTeamStatEntity)
    : []
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
        ? tournament.playerStats.map(mapPlayerStatEntityToApiPlayerStat)
        : undefined,
    team_stats:
      tournament.teamStats.length > 0
        ? tournament.teamStats.map(mapTeamStatEntityToApiTeamStat)
        : undefined
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
