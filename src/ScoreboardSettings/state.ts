import { ApiScoreboardSettingView } from '../Shared/httpClient/apiTypes';

export interface ScoreboardSettingEntity {
  id: string;
  view: ApiScoreboardSettingView;
  initialPeriodTime: number;
}

export interface ScoreboardSettingState {
  isLoadingDeleteScoreboardSetting: boolean;
  isLoadingPatchScoreboardSetting: boolean;
  isLoadingPostScoreboardSetting: boolean;
  isLoadingRequestTournament: boolean;
  scoreboardSettings: { [key: string]: ScoreboardSettingEntity };
}

export interface ScoreboardSettingsMap {
  [id: string]: ScoreboardSettingEntity;
}

export const initialState: ScoreboardSettingState = {
  isLoadingDeleteScoreboardSetting: false,
  isLoadingPatchScoreboardSetting: false,
  isLoadingPostScoreboardSetting: false,
  isLoadingRequestTournament: false,
  scoreboardSettings: {}
};

export const DEFAULT_SCOREBOARD_SETTING: ScoreboardSettingEntity = {
  id: '',
  view: 'basketball-medium',
  initialPeriodTime: 600
};
