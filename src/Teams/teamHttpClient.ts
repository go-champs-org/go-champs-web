import { ApiTeamRequest, ApiTeamResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiTeamToTeamEntity,
  mapTeamEntityToApiTeamRequest
} from './dataMappers';
import { TournamentTeamEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentTeamsApi = (tournamentId: string) =>
  `${TOURNAMENT_API}/${tournamentId}/teams`;

const deleteRequest = (
  tournamentId: string,
  tournamentTeamId: string
): Promise<string> => {
  const url = `${tournamentTeamsApi(tournamentId)}/${tournamentTeamId}`;

  return httpClient.delete(url);
};

const patch = async (
  tournamentId: string,
  tournamentTeam: TournamentTeamEntity
): Promise<TournamentTeamEntity> => {
  const url = `${tournamentTeamsApi(tournamentId)}/${tournamentTeam.id}`;
  const body = mapTeamEntityToApiTeamRequest(tournamentTeam);

  const { data } = await httpClient.patch<ApiTeamRequest, ApiTeamResponse>(
    url,
    body
  );
  return mapApiTeamToTeamEntity(data);
};

const post = async (
  tournamentId: string,
  tournamentTeam: TournamentTeamEntity
): Promise<TournamentTeamEntity> => {
  const url = `${tournamentTeamsApi(tournamentId)}`;
  const body = mapTeamEntityToApiTeamRequest(tournamentTeam);

  const { data } = await httpClient.post<ApiTeamRequest, ApiTeamResponse>(
    url,
    body
  );
  return mapApiTeamToTeamEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
