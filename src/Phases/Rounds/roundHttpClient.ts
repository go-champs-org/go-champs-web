import {
  ApiPhaseRoundRequest,
  ApiPhaseRoundResponse
} from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import {
  mapApiPhaseRoundToRoundEntity,
  mapRoundEntityToApiPhaseRoundRequest
} from './dataMappers';
import { PhaseRoundEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseStatsApi = (phaseId: string) => `${PHASE_API}/${phaseId}/rounds`;

const deleteRequest = (
  phaseId: string,
  phaseRoundId: string
): Promise<string> => {
  const url = `${phaseStatsApi(phaseId)}/${phaseRoundId}`;

  return httpClient.delete(url);
};

const patch = async (
  phaseId: string,
  phaseRound: PhaseRoundEntity
): Promise<PhaseRoundEntity> => {
  const url = `${phaseStatsApi(phaseId)}/${phaseRound.id}`;
  const body = mapRoundEntityToApiPhaseRoundRequest(phaseRound);

  const { data } = await httpClient.patch<
    ApiPhaseRoundRequest,
    ApiPhaseRoundResponse
  >(url, body);
  return mapApiPhaseRoundToRoundEntity(data);
};

const post = async (
  phaseId: string,
  phaseRound: PhaseRoundEntity
): Promise<PhaseRoundEntity> => {
  const url = `${phaseStatsApi(phaseId)}`;
  const body = mapRoundEntityToApiPhaseRoundRequest(phaseRound);

  const { data } = await httpClient.post<
    ApiPhaseRoundRequest,
    ApiPhaseRoundResponse
  >(url, body);
  return mapApiPhaseRoundToRoundEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
