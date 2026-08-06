import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiTournamentSettingPatchRequest,
  ApiTournamentSettingPostRequest,
  ApiTournamentSettingResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiTournamentSettingToTournamentSettingEntity,
  mapTournamentSettingEntityToApiTournamentSettingPatchRequest,
  mapTournamentSettingEntityToApiTournamentSettingPostRequest
} from './dataMappers';
import { TournamentSettingEntity } from './state';

const TOURNAMENT_SETTING_API = `${REACT_APP_API_HOST}v1/tournament-settings`;

const deleteRequest = (tournamentSettingId: string): Promise<string> => {
  const url = `${TOURNAMENT_SETTING_API}/${tournamentSettingId}`;

  return httpClient.delete(url);
};

const patch = async (
  tournamentSetting: TournamentSettingEntity
): Promise<TournamentSettingEntity> => {
  const url = `${TOURNAMENT_SETTING_API}/${tournamentSetting.id}`;
  const body = mapTournamentSettingEntityToApiTournamentSettingPatchRequest(
    tournamentSetting
  );

  const { data } = await httpClient.patch<
    ApiTournamentSettingPatchRequest,
    ApiTournamentSettingResponse
  >(url, body);
  return mapApiTournamentSettingToTournamentSettingEntity(data);
};

const post = async (
  tournamentSetting: TournamentSettingEntity,
  tournamentId: string
): Promise<TournamentSettingEntity> => {
  const url = TOURNAMENT_SETTING_API;
  const body = mapTournamentSettingEntityToApiTournamentSettingPostRequest(
    tournamentSetting,
    tournamentId
  );

  const { data } = await httpClient.post<
    ApiTournamentSettingPostRequest,
    ApiTournamentSettingResponse
  >(url, body);
  return mapApiTournamentSettingToTournamentSettingEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
