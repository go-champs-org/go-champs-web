import { TranslateSelectOptionType } from '../Shared/hooks/useTranslatedSelectOptions';
import {
  ApiScoreboardSetting,
  ApiScoreboardSettingPatchRequest,
  ApiScoreboardSettingPostRequest
} from '../Shared/httpClient/apiTypes';
import {
  ScoreboardSettingEntity,
  ScoreboardSettingLiveSiteUpdate
} from './state';

export const mapScoreboardSettingEntityToApiScoreboardSettingPatchRequest = (
  scoreboardSettingEntity: ScoreboardSettingEntity
): ApiScoreboardSettingPatchRequest => {
  return {
    scoreboard_setting: {
      id: scoreboardSettingEntity.id,
      initial_period_time: scoreboardSettingEntity.initialPeriodTime,
      live_site_update: scoreboardSettingEntity.liveSiteUpdate,
      initial_extra_period_time: scoreboardSettingEntity.initialExtraPeriodTime
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
      initial_period_time: scoreboardSettingEntity.initialPeriodTime,
      tournament_id: tournamentId,
      live_site_update: scoreboardSettingEntity.liveSiteUpdate,
      initial_extra_period_time: scoreboardSettingEntity.initialExtraPeriodTime
    }
  };
};

export const mapApiScoreboardSettingToScoreboardSettingEntity = (
  apiScoreboardSetting: ApiScoreboardSetting
): ScoreboardSettingEntity => {
  return {
    id: apiScoreboardSetting.id,
    initialPeriodTime: apiScoreboardSetting.initial_period_time,
    initialExtraPeriodTime: apiScoreboardSetting.initial_extra_period_time,
    liveSiteUpdate: apiScoreboardSetting.live_site_update as ScoreboardSettingLiveSiteUpdate
  };
};

export const SCOREBOARD_LIVE_SITE_UPDATE_OPTIONS: TranslateSelectOptionType[] = [
  {
    value: ScoreboardSettingLiveSiteUpdate.NO_LIVE_UPDATE,
    labelKey: 'scoreboardSettingsForm.liveSiteUpdateOptions.no_live_update'
  },
  {
    value: ScoreboardSettingLiveSiteUpdate.TEAM_SCORE_LIVE_UPDATE,
    labelKey:
      'scoreboardSettingsForm.liveSiteUpdateOptions.team_score_live_update'
  },
  {
    value: ScoreboardSettingLiveSiteUpdate.FULL_LIVE_UPDATE,
    labelKey: 'scoreboardSettingsForm.liveSiteUpdateOptions.full_live_update'
  }
];
