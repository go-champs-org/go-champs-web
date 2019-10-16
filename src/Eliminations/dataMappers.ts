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

export const mapApiEliminationToEliminationEntity = (
  apiElimination: ApiElimination
): EliminationEntity => ({
  id: apiElimination.id,
  title: apiElimination.title || '',
  teamStats: apiElimination.team_stats.map(mapApiEliminationTeamStatToTeamStat)
});

export const mapEliminationEntityToApiEliminationRequest = (
  phaseElimination: EliminationEntity
): ApiEliminationRequest => ({
  elimination: {
    id: phaseElimination.id,
    title: phaseElimination.title,
    team_stats: phaseElimination.teamStats.map(
      mapTeamStatToApiEliminationTeamStat
    )
  }
});
