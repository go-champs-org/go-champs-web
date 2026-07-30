import { REACT_APP_API_HOST } from '../Shared/env';
import {
  ApiScoreboardSettingPatchRequest,
  ApiScoreboardSettingPostRequest,
  ApiScoreboardSettingResponse
} from '../Shared/httpClient/apiTypes';
import httpClient from '../Shared/httpClient/httpClient';
import {
  mapApiScoreboardSettingToScoreboardSettingEntity,
  mapScoreboardSettingEntityToApiScoreboardSettingPatchRequest,
  mapScoreboardSettingEntityToApiScoreboardSettingPostRequest
} from './dataMappers';
import { ScoreboardSettingEntity } from './state';

const SCOREBOARD_SETTING_API = `${REACT_APP_API_HOST}v1/scoreboard-settings`;

const deleteRequest = (scoreboardSettingId: string): Promise<string> => {
  const url = `${SCOREBOARD_SETTING_API}/${scoreboardSettingId}`;

  return httpClient.delete(url);
};

const patch = async (
  scoreboardSetting: ScoreboardSettingEntity
): Promise<ScoreboardSettingEntity> => {
  const url = `${SCOREBOARD_SETTING_API}/${scoreboardSetting.id}`;
  const body = mapScoreboardSettingEntityToApiScoreboardSettingPatchRequest(
    scoreboardSetting
  );

  const { data } = await httpClient.patch<
    ApiScoreboardSettingPatchRequest,
    ApiScoreboardSettingResponse
  >(url, body);
  return mapApiScoreboardSettingToScoreboardSettingEntity(data);
};

const post = async (
  scoreboardSetting: ScoreboardSettingEntity,
  tournamentId: string
): Promise<ScoreboardSettingEntity> => {
  const url = SCOREBOARD_SETTING_API;
  const body = mapScoreboardSettingEntityToApiScoreboardSettingPostRequest(
    scoreboardSetting,
    tournamentId
  );

  const { data } = await httpClient.post<
    ApiScoreboardSettingPostRequest,
    ApiScoreboardSettingResponse
  >(url, body);
  return mapApiScoreboardSettingToScoreboardSettingEntity(data);
};

export default {
  delete: deleteRequest,
  patch,
  post
};
