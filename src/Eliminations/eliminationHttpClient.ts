import {
  ApiEliminationRequest,
  ApiEliminationResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiEliminationToStandingsEntity,
  mapStandingsEntityToApiEliminationRequest
} from './dataMappers';
import { EliminationEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseStatsApi = (phaseId: string) =>
  `${PHASE_API}/${phaseId}/eliminations`;

const deleteRequest = (
  phaseId: string,
  phaseStandingsId: string
): Promise<string> => {
  const url = `${phaseStatsApi(phaseId)}/${phaseStandingsId}`;

  return httpClient.delete(url);
};

const patch = async (
  phaseId: string,
  phaseStandings: EliminationEntity
): Promise<EliminationEntity> => {
  const url = `${phaseStatsApi(phaseId)}/${phaseStandings.id}`;
  const body = mapStandingsEntityToApiEliminationRequest(phaseStandings);

  const { data } = await httpClient.patch<
    ApiEliminationRequest,
    ApiEliminationResponse
  >(url, body);
  return mapApiEliminationToStandingsEntity(data);
};

const post = async (
  phaseId: string,
  phaseStandings: EliminationEntity
): Promise<EliminationEntity> => {
  const url = `${phaseStatsApi(phaseId)}`;
  const body = mapStandingsEntityToApiEliminationRequest(phaseStandings);

  const { data } = await httpClient.post<
    ApiEliminationRequest,
    ApiEliminationResponse
  >(url, body);
  return mapApiEliminationToStandingsEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
