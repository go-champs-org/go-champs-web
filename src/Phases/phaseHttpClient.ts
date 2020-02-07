import {
  ApiPhase,
  ApiPhaseRequest,
  ApiPhaseResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import { mapPhaseEntityToApiPhaseRequest } from './dataMappers';
import { PhaseEntity } from './state';

const PHASES_API = 'https://yochamps-api.herokuapp.com/api/phases';

const deleteRequest = (phaseId: string): Promise<string> => {
  const url = `${PHASES_API}/${phaseId}`;

  return httpClient.delete(url);
};

const get = async (phaseId: string): Promise<ApiPhase> => {
  const url = `${PHASES_API}/${phaseId}`;

  const { data } = await httpClient.get<ApiPhaseResponse>(url);
  return data;
};

const patch = async (
  phase: PhaseEntity,
  tournamentId: string
): Promise<ApiPhase> => {
  const url = `${PHASES_API}/${phase.id}`;
  const body = mapPhaseEntityToApiPhaseRequest(phase, tournamentId);

  const { data } = await httpClient.patch<ApiPhaseRequest, ApiPhaseResponse>(
    url,
    body
  );
  return data;
};

const post = async (
  phase: PhaseEntity,
  tournamentId: string
): Promise<ApiPhase> => {
  const url = `${PHASES_API}`;
  const body = mapPhaseEntityToApiPhaseRequest(phase, tournamentId);

  const { data } = await httpClient.post<ApiPhaseRequest, ApiPhaseResponse>(
    url,
    body
  );
  return data;
};

export default {
  delete: deleteRequest,
  get,
  patch,
  post
};
