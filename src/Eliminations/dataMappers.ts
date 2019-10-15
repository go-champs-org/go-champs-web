import {
  ApiElimination,
  ApiEliminationRequest,
  ApiEliminationTeamStat
} from '../Shared/httpClient/apiTypes';
import { EliminationEntity, EliminationTeamStatEntity } from './state';

const mapApiEliminationTeamStatToTeamStat = (
  apiTeamStats: ApiEliminationTeamStat
): EliminationTeamStatEntity => ({
  id: apiTeamStats.id,
  stats: apiTeamStats.stats,
  teamId: apiTeamStats.team_id
});

const mapTeamStatToApiEliminationTeamStat = (
  teamStats: EliminationTeamStatEntity
): ApiEliminationTeamStat => ({
  id: teamStats.id,
  stats: teamStats.stats,
  team_id: teamStats.teamId
});

export const mapApiEliminationToStandingsEntity = (
  apiStandings: ApiElimination
): EliminationEntity => ({
  id: apiStandings.id,
  title: apiStandings.title || '',
  teamStats: apiStandings.team_stats.map(mapApiEliminationTeamStatToTeamStat)
});

export const mapStandingsEntityToApiEliminationRequest = (
  phaseStandings: EliminationEntity
): ApiEliminationRequest => ({
  elimination: {
    id: phaseStandings.id,
    title: phaseStandings.title,
    team_stats: phaseStandings.teamStats.map(
      mapTeamStatToApiEliminationTeamStat
    )
  }
});
