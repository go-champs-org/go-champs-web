import { DEFAULT_TOURNAMENT_SETTING, TournamentSettingState } from './state';

export const tournamentSetting = (state: TournamentSettingState) =>
  Object.keys(state.tournamentSettings).length === 1
    ? state.tournamentSettings[Object.keys(state.tournamentSettings)[0]]
    : DEFAULT_TOURNAMENT_SETTING;

export const isLoadingApplyNameFormat = (state: TournamentSettingState) =>
  state.isLoadingApplyNameFormat;
