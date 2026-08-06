import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import {
  ApiTournamentSetting,
  ApiTournamentSettingPatchRequest,
  ApiTournamentSettingPostRequest
} from '../Shared/httpClient/apiTypes';
import { TournamentSettingEntity } from './state';

export const mapTournamentSettingEntityToApiTournamentSettingPatchRequest = (
  tournamentSettingEntity: TournamentSettingEntity
): ApiTournamentSettingPatchRequest => {
  return {
    tournament_setting: {
      id: tournamentSettingEntity.id,
      name_format: tournamentSettingEntity.nameFormat,
      name_case: tournamentSettingEntity.nameCase
    }
  };
};

export const mapTournamentSettingEntityToApiTournamentSettingPostRequest = (
  tournamentSettingEntity: TournamentSettingEntity,
  tournamentId: string
): ApiTournamentSettingPostRequest => {
  return {
    tournament_setting: {
      id: tournamentSettingEntity.id,
      name_format: tournamentSettingEntity.nameFormat,
      name_case: tournamentSettingEntity.nameCase,
      tournament_id: tournamentId
    }
  };
};

export const mapApiTournamentSettingToTournamentSettingEntity = (
  apiTournamentSetting: ApiTournamentSetting
): TournamentSettingEntity => {
  return {
    id: apiTournamentSetting.id,
    nameFormat: apiTournamentSetting.name_format as NameFormat,
    nameCase: apiTournamentSetting.name_case as NameCase
  };
};
