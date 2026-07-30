import { DEFAULT_SCOREBOARD_SETTING, ScoreboardSettingState } from './state';

export const scoreboardSetting = (state: ScoreboardSettingState) =>
  Object.keys(state.scoreboardSettings).length === 1
    ? state.scoreboardSettings[Object.keys(state.scoreboardSettings)[0]]
    : DEFAULT_SCOREBOARD_SETTING;
