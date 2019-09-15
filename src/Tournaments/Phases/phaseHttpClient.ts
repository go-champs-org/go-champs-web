import { ApiPhase, ApiPhaseRequest, ApiPhaseResponse, ApiPhasesResponse } from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import { TournamentPhaseEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentPhasesApi = (tournamentId: string) =>
  `${TOURNAMENT_API}/${tournamentId}/phases`;

const mapApiPhaseToPhaseEntity = (
  apiPhase: ApiPhase
): TournamentPhaseEntity => ({
  id: apiPhase.id,
  order: apiPhase.order,
  title: apiPhase.title,
  type: apiPhase.type
});

const mapPhaseEntityToApiPhaseRequest = (
  phase: TournamentPhaseEntity
): ApiPhaseRequest => ({
  tournament_phase: {
    id: phase.id,
    order: phase.order,
    title: phase.title,
    type: phase.type
  }
});

const deleteRequest = (
  tournamentId: string,
  tournamentPhaseId: string
): Promise<string> => {
  const url = `${tournamentPhasesApi(tournamentId)}/${tournamentPhaseId}`;

  return httpClient.delete(url);
};

const get = async (
  tournamentId: string,
  phaseId: string
): Promise<TournamentPhaseEntity> => {
  const url = `${tournamentPhasesApi(tournamentId)}/${phaseId}`;

  const { data } = await httpClient.get<ApiPhaseResponse>(url);
  return mapApiPhaseToPhaseEntity(data);
};

const getAll = async (
  tournamentId: string
): Promise<TournamentPhaseEntity[]> => {
  const url = `${tournamentPhasesApi(tournamentId)}`;

  const { data } = await httpClient.get<ApiPhasesResponse>(url);
  return data.map(mapApiPhaseToPhaseEntity);
};

const patch = async (
  tournamentId: string,
  tournamentPhase: TournamentPhaseEntity
): Promise<TournamentPhaseEntity> => {
  const url = `${tournamentPhasesApi(tournamentId)}/${tournamentPhase.id}`;
  const body = mapPhaseEntityToApiPhaseRequest(tournamentPhase);

  const { data } = await httpClient.patch<ApiPhaseRequest, ApiPhaseResponse>(
    url,
    body
  );
  return mapApiPhaseToPhaseEntity(data);
};

const post = async (
  tournamentId: string,
  tournamentPhase: TournamentPhaseEntity
): Promise<TournamentPhaseEntity> => {
  const url = `${tournamentPhasesApi(tournamentId)}`;
  const body = mapPhaseEntityToApiPhaseRequest(tournamentPhase);

  const { data } = await httpClient.post<ApiPhaseRequest, ApiPhaseResponse>(
    url,
    body
  );
  return mapApiPhaseToPhaseEntity(data);
};

export default {
  delete: deleteRequest,
  get,
  getAll,
  patch,
  post
};
