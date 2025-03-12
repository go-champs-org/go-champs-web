import {
  ApiScoreboardSetting,
  ApiScoreboardSettingPatchRequest,
  ApiScoreboardSettingPostRequest
} from '../Shared/httpClient/apiTypes';
import { ScoreboardSettingEntity } from './state';

export const mapScoreboardSettingEntityToApiScoreboardSettingPatchRequest = (
  scoreboardSettingEntity: ScoreboardSettingEntity
): ApiScoreboardSettingPatchRequest => {
  return {
    scoreboard_setting: {
      id: scoreboardSettingEntity.id,
      view: scoreboardSettingEntity.view,
      initial_period_time: scoreboardSettingEntity.initialPeriodTime
    }
  };
};

export const mapScoreboardSettingEntityToApiScoreboardSettingPostRequest = (
  scoreboardSettingEntity: ScoreboardSettingEntity,
  tournamentId: string
): ApiScoreboardSettingPostRequest => {
  return {
    scoreboard_setting: {
      id: scoreboardSettingEntity.id,
      view: scoreboardSettingEntity.view,
      initial_period_time: scoreboardSettingEntity.initialPeriodTime,
      tournament_id: tournamentId
    }
  };
};

export const mapApiScoreboardSettingToScoreboardSettingEntity = (
  apiScoreboardSetting: ApiScoreboardSetting
): ScoreboardSettingEntity => {
  return {
    id: apiScoreboardSetting.id,
    view: apiScoreboardSetting.view,
    initialPeriodTime: apiScoreboardSetting.initial_period_time
  };
};
