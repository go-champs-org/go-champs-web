import { ApiTeamRequest, ApiTeamResponse } from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiTeamToTeamEntity,
  mapTeamEntityToApiTeamRequest
} from './dataMappers';
import { TeamEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const teamsApi = (tournamentId: string) =>
  `${TOURNAMENT_API}/${tournamentId}/teams`;

const deleteRequest = (
  tournamentId: string,
  tournamentTeamId: string
): Promise<string> => {
  const url = `${teamsApi(tournamentId)}/${tournamentTeamId}`;

  return httpClient.delete(url);
};

const patch = async (
  tournamentId: string,
  tournamentTeam: TeamEntity
): Promise<TeamEntity> => {
  const url = `${teamsApi(tournamentId)}/${tournamentTeam.id}`;
  const body = mapTeamEntityToApiTeamRequest(tournamentTeam);

  const { data } = await httpClient.patch<ApiTeamRequest, ApiTeamResponse>(
    url,
    body
  );
  return mapApiTeamToTeamEntity(data);
};

const post = async (
  tournamentId: string,
  tournamentTeam: TeamEntity
): Promise<TeamEntity> => {
  const url = `${teamsApi(tournamentId)}`;
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
