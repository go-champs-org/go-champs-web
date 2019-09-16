import {
  ApiGameRequest,
  ApiGameResponse,
  ApiGamesResponse
} from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import {
  mapApiGameToGameEntity,
  mapGameEntityToApiGameRequest
} from './dataMappers';
import { TournamentGameEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseGamesApi = (phaseId: string) => `${PHASE_API}/${phaseId}/games`;

const deleteRequest = (
  phaseId: string,
  tournamentGameId: string
): Promise<string> => {
  const url = `${phaseGamesApi(phaseId)}/${tournamentGameId}`;

  return httpClient.delete(url);
};

const get = async (
  phaseId: string,
  tournamentGameId: string
): Promise<TournamentGameEntity> => {
  const url = `${phaseGamesApi(phaseId)}/${tournamentGameId}`;

  const { data } = await httpClient.get<ApiGameResponse>(url);
  return mapApiGameToGameEntity(data);
};

const getAll = async (phaseId: string): Promise<TournamentGameEntity[]> => {
  const url = `${phaseGamesApi(phaseId)}`;

  const { data } = await httpClient.get<ApiGamesResponse>(url);
  return data.map(mapApiGameToGameEntity);
};

const patch = async (
  phaseId: string,
  tournamentGame: TournamentGameEntity
): Promise<TournamentGameEntity> => {
  const url = `${phaseGamesApi(phaseId)}/${tournamentGame.id}`;
  const body = mapGameEntityToApiGameRequest(tournamentGame);

  const { data } = await httpClient.patch<ApiGameRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

const post = async (
  phaseId: string,
  tournamentGame: TournamentGameEntity
): Promise<TournamentGameEntity> => {
  const url = `${phaseGamesApi(phaseId)}`;
  const body = mapGameEntityToApiGameRequest(tournamentGame);

  const { data } = await httpClient.post<ApiGameRequest, ApiGameResponse>(
    url,
    body
  );
  return mapApiGameToGameEntity(data);
};

export default {
  delete: deleteRequest,
  getAll,
  get,
  patch,
  post
};
