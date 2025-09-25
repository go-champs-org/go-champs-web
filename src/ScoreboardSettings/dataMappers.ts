import {
  ApiScoreboardSetting,
  ApiScoreboardSettingPatchRequest,
  ApiScoreboardSettingPostRequest
} from '../Shared/httpClient/apiTypes';
import { SelectOptionType } from '../Shared/UI/Form/Select';
import {
  ScoreboardSettingEntity,
  ScoreboardSettingLiveSiteUpdate,
  ScoreboardSettingView
} from './state';

export const mapScoreboardSettingEntityToApiScoreboardSettingPatchRequest = (
  scoreboardSettingEntity: ScoreboardSettingEntity
): ApiScoreboardSettingPatchRequest => {
  return {
    scoreboard_setting: {
      id: scoreboardSettingEntity.id,
      view: scoreboardSettingEntity.view,
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
      view: scoreboardSettingEntity.view,
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
    view: apiScoreboardSetting.view as ScoreboardSettingView,
    initialPeriodTime: apiScoreboardSetting.initial_period_time,
    initialExtraPeriodTime: apiScoreboardSetting.initial_extra_period_time,
    liveSiteUpdate: apiScoreboardSetting.live_site_update as ScoreboardSettingLiveSiteUpdate
  };
};

export const SCOREBOARD_VIEW_OPTIONS: SelectOptionType[] = [
  { value: ScoreboardSettingView.BASKETBALL_BASIC, label: 'Basquete básico' },
  { value: ScoreboardSettingView.BASKETBALL_MEDIUM, label: 'Basquete completo' }
];

export const SCOREBOARD_LIVE_SITE_UPDATE_OPTIONS: SelectOptionType[] = [
  {
    value: ScoreboardSettingLiveSiteUpdate.NO_LIVE_UPDATE,
    label: 'Após final de jogo'
  },
  {
    value: ScoreboardSettingLiveSiteUpdate.TEAM_SCORE_LIVE_UPDATE,
    label: 'Somente placar'
  },
  {
    value: ScoreboardSettingLiveSiteUpdate.FULL_LIVE_UPDATE,
    label: 'Estatísticas completas'
  }
];
