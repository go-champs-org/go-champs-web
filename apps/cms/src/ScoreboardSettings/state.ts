export enum ScoreboardSettingLiveSiteUpdate {
  NO_LIVE_UPDATE = 'no-live-update',
  TEAM_SCORE_LIVE_UPDATE = 'team-score-live-update',
  FULL_LIVE_UPDATE = 'full-live-update'
}

export enum ScoreboardSettingRulesVersion {
  FIBA_2024 = 'fiba-2024',
  FIBA_2026 = 'fiba-2026'
}

export interface ScoreboardSettingEntity {
  id: string;
  initialPeriodTime: number;
  initialExtraPeriodTime: number;
  liveSiteUpdate: ScoreboardSettingLiveSiteUpdate;
  rulesVersion: ScoreboardSettingRulesVersion;
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
  initialPeriodTime: 600,
  initialExtraPeriodTime: 300,
  liveSiteUpdate: ScoreboardSettingLiveSiteUpdate.FULL_LIVE_UPDATE,
  rulesVersion: ScoreboardSettingRulesVersion.FIBA_2024
};
