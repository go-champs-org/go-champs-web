import {
  ApiTeam,
  ApiTeamRequest,
  ApiTeamResponse
} from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import { mapApiGroupToGroupEntity } from '../Groups/groupHttpClient';
import { DEFAULT_GROUP_ENTITY } from '../Groups/state';
import { TournamentTeamEntity } from './state';

const TOURNAMENT_API = 'https://yochamps-api.herokuapp.com/api/tournaments';

const tournamentTeamsApi = (tournamentId: string) =>
  `${TOURNAMENT_API}/${tournamentId}/teams`;

export const mapApiTeamToTeamEntity = (
  apiTeam: ApiTeam
): TournamentTeamEntity => ({
  id: apiTeam.id,
  name: apiTeam.name,
  group: apiTeam.group
    ? mapApiGroupToGroupEntity(apiTeam.group)
    : DEFAULT_GROUP_ENTITY,
  stats: {}
});

const mapTeamEntityToApiTeamRequest = (
  team: TournamentTeamEntity
): ApiTeamRequest => ({
  tournament_team: {
    id: team.id,
    name: team.name
  }
});

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
