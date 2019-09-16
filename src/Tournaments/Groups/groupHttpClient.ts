import {
  ApiGroupRequest,
  ApiGroupResponse
} from '../../Shared/httpClient/apiTypes';
import httpClient from '../../Shared/httpClient/httpClient';
import {
  mapApiGroupToGroupEntity,
  mapGroupEntityToApiGroupRequest
} from './dataMappers';
import { TournamentGroupEntity } from './state';

const PHASE_API = 'https://yochamps-api.herokuapp.com/api/phases';

const phaseGroupsApi = (phaseId: string) => `${PHASE_API}/${phaseId}/groups`;

const deleteRequest = (
  phaseId: string,
  tournamentGroupId: string
): Promise<string> => {
  const url = `${phaseGroupsApi(phaseId)}/${tournamentGroupId}`;

  return httpClient.delete(url);
};

const patch = async (
  tournamentId: string,
  tournamentGroup: TournamentGroupEntity
): Promise<TournamentGroupEntity> => {
  const url = `${phaseGroupsApi(tournamentId)}/${tournamentGroup.id}`;
  const body = mapGroupEntityToApiGroupRequest(tournamentGroup);

  const { data } = await httpClient.patch<ApiGroupRequest, ApiGroupResponse>(
    url,
    body
  );
  return mapApiGroupToGroupEntity(data);
};

const post = async (
  tournamentId: string,
  tournamentGroup: TournamentGroupEntity
): Promise<TournamentGroupEntity> => {
  const url = `${phaseGroupsApi(tournamentId)}`;
  const body = mapGroupEntityToApiGroupRequest(tournamentGroup);

  const { data } = await httpClient.post<ApiGroupRequest, ApiGroupResponse>(
    url,
    body
  );
  return mapApiGroupToGroupEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
