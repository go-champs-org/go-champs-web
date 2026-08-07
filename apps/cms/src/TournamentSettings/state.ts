import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';

export interface TournamentSettingEntity {
  id: string;
  nameFormat: NameFormat;
  nameCase: NameCase;
}

export interface TournamentSettingState {
  isLoadingDeleteTournamentSetting: boolean;
  isLoadingPatchTournamentSetting: boolean;
  isLoadingPostTournamentSetting: boolean;
  isLoadingRequestTournament: boolean;
  tournamentSettings: { [key: string]: TournamentSettingEntity };
}

export const initialState: TournamentSettingState = {
  isLoadingDeleteTournamentSetting: false,
  isLoadingPatchTournamentSetting: false,
  isLoadingPostTournamentSetting: false,
  isLoadingRequestTournament: false,
  tournamentSettings: {}
};

export const DEFAULT_TOURNAMENT_SETTING: TournamentSettingEntity = {
  id: '',
  nameFormat: NameFormat.FULL,
  nameCase: NameCase.ORIGINAL
};
