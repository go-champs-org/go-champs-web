import {
  ApiTeamPatchRequest,
  ApiTeamPostRequest,
  ApiTeamResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiTeamToTeamEntity,
  mapTeamEntityToApiTeamPatchRequest,
  mapTeamEntityToApiTeamPostRequest
} from './dataMappers';
import { TeamEntity } from './state';

const TEAMS_API = `${process.env.REACT_APP_API_HOST}api/teams`;

const deleteRequest = (teamId: string): Promise<string> => {
  const url = `${TEAMS_API}/${teamId}`;

  return httpClient.delete(url);
};

const patch = async (team: TeamEntity): Promise<TeamEntity> => {
  const url = `${TEAMS_API}/${team.id}`;
  const body = mapTeamEntityToApiTeamPatchRequest(team);

  const { data } = await httpClient.patch<ApiTeamPatchRequest, ApiTeamResponse>(
    url,
    body
  );
  return mapApiTeamToTeamEntity(data);
};

const post = async (
  team: TeamEntity,
  tournamentId: string
): Promise<TeamEntity> => {
  const url = TEAMS_API;
  const body = mapTeamEntityToApiTeamPostRequest(team, tournamentId);

  const { data } = await httpClient.post<ApiTeamPostRequest, ApiTeamResponse>(
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
