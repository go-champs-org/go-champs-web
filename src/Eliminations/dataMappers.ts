import {
  ApiElimination,
  ApiEliminationPatchRequest,
  ApiEliminationTeamStat,
  ApiEliminationPostRequest
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

export const mapEliminationEntityToApiEliminationPatchRequest = (
  elimination: EliminationEntity
): ApiEliminationPatchRequest => ({
  elimination: {
    id: elimination.id,
    title: elimination.title,
    team_stats: elimination.teamStats.map(mapTeamStatToApiEliminationTeamStat)
  }
});

export const mapEliminationEntityToApiEliminationPostRequest = (
  elimination: EliminationEntity,
  phaseId: string
): ApiEliminationPostRequest => ({
  elimination: {
    id: elimination.id,
    title: elimination.title,
    team_stats: elimination.teamStats.map(mapTeamStatToApiEliminationTeamStat),
    phase_id: phaseId
  }
});
