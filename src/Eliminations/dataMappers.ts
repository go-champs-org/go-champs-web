import {
  ApiElimination,
  ApiEliminationPatchRequest,
  ApiEliminationPostRequest,
  ApiEliminationTeamStatPatchAndPost,
  ApiEliminationTeamStatResponse
} from '../Shared/httpClient/apiTypes';
import { EliminationEntity, EliminationTeamStatEntity } from './state';

const mapApiEliminationTeamStatToTeamStat = (
  apiTeamStats: ApiEliminationTeamStatResponse
): EliminationTeamStatEntity => ({
  id: apiTeamStats.id,
  placeholder: apiTeamStats.placeholder ? apiTeamStats.placeholder : '',
  stats: apiTeamStats.stats,
  teamId: apiTeamStats.team_id ? apiTeamStats.team_id : ''
});

const mapTeamStatToApiEliminationTeamStatPatchAndPost = (
  teamStats: EliminationTeamStatEntity
): ApiEliminationTeamStatPatchAndPost => ({
  placeholder: teamStats.teamId ? undefined : teamStats.placeholder,
  stats: teamStats.stats,
  team_id: teamStats.teamId
});

export const mapApiEliminationToEliminationEntity = (
  apiElimination: ApiElimination
): EliminationEntity => ({
  id: apiElimination.id,
  info: apiElimination.info ? apiElimination.info : '',
  order: apiElimination.order,
  title: apiElimination.title || '',
  teamStats: apiElimination.team_stats.map(mapApiEliminationTeamStatToTeamStat)
});

export const mapEliminationEntityToApiEliminationPatchRequest = (
  elimination: EliminationEntity
): ApiEliminationPatchRequest => ({
  elimination: {
    id: elimination.id,
    order: Number(elimination.order),
    info: elimination.info ? elimination.info : undefined,
    title: elimination.title,
    team_stats: elimination.teamStats.map(
      mapTeamStatToApiEliminationTeamStatPatchAndPost
    )
  }
});

export const mapEliminationEntityToApiEliminationPostRequest = (
  elimination: EliminationEntity,
  phaseId: string
): ApiEliminationPostRequest => ({
  elimination: {
    id: elimination.id,
    info: elimination.info ? elimination.info : undefined,
    title: elimination.title,
    team_stats: elimination.teamStats.map(
      mapTeamStatToApiEliminationTeamStatPatchAndPost
    ),
    phase_id: phaseId
  }
});
