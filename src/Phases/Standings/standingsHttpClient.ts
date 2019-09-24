import {
  ApiPhaseStandingsRequest,
  ApiPhaseStandingsResponse
} from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import {
  mapApiPhaseStandingsToStandingsEntity,
  mapStandingsEntityToApiPhaseStandingsRequest
} from './dataMappers';
import { PhaseStandingsEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseStatsApi = (phaseId: string) => `${PHASE_API}/${phaseId}/standings`;

const deleteRequest = (
  phaseId: string,
  phaseStandingsId: string
): Promise<string> => {
  const url = `${phaseStatsApi(phaseId)}/${phaseStandingsId}`;

  return httpClient.delete(url);
};

const patch = async (
  phaseId: string,
  phaseStandings: PhaseStandingsEntity
): Promise<PhaseStandingsEntity> => {
  const url = `${phaseStatsApi(phaseId)}/${phaseStandings.id}`;
  const body = mapStandingsEntityToApiPhaseStandingsRequest(phaseStandings);

  const { data } = await httpClient.patch<
    ApiPhaseStandingsRequest,
    ApiPhaseStandingsResponse
  >(url, body);
  return mapApiPhaseStandingsToStandingsEntity(data);
};

const post = async (
  phaseId: string,
  phaseStandings: PhaseStandingsEntity
): Promise<PhaseStandingsEntity> => {
  const url = `${phaseStatsApi(phaseId)}`;
  const body = mapStandingsEntityToApiPhaseStandingsRequest(phaseStandings);

  const { data } = await httpClient.post<
    ApiPhaseStandingsRequest,
    ApiPhaseStandingsResponse
  >(url, body);
  return mapApiPhaseStandingsToStandingsEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
