import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';

export interface TournamentSettingEntity {
  id: string;
  nameFormat: NameFormat | null;
  nameCase: NameCase | null;
}

export interface TournamentSettingState {
  isLoadingApplyNameFormat: boolean;
  isLoadingDeleteTournamentSetting: boolean;
  isLoadingPatchTournamentSetting: boolean;
  isLoadingPostTournamentSetting: boolean;
  isLoadingRequestTournament: boolean;
  tournamentSettings: { [key: string]: TournamentSettingEntity };
}

export const initialState: TournamentSettingState = {
  isLoadingApplyNameFormat: false,
  isLoadingDeleteTournamentSetting: false,
  isLoadingPatchTournamentSetting: false,
  isLoadingPostTournamentSetting: false,
  isLoadingRequestTournament: false,
  tournamentSettings: {}
};

export const DEFAULT_TOURNAMENT_SETTING: TournamentSettingEntity = {
  id: '',
  nameFormat: null,
  nameCase: null
};
