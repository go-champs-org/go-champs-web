import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import { ApiTournamentSetting } from '../Shared/httpClient/apiTypes';
import {
  mapApiTournamentSettingToTournamentSettingEntity,
  mapTournamentSettingEntityToApiTournamentSettingPatchRequest,
  mapTournamentSettingEntityToApiTournamentSettingPostRequest
} from './dataMappers';
import { TournamentSettingEntity } from './state';

describe('mapApiTournamentSettingToTournamentSettingEntity', () => {
  it('maps API tournament setting to entity', () => {
    const apiTournamentSetting: ApiTournamentSetting = {
      id: 'setting-id',
      name_format: 'first_last',
      name_case: 'upper'
    };

    expect(
      mapApiTournamentSettingToTournamentSettingEntity(apiTournamentSetting)
    ).toEqual({
      id: 'setting-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });
});

describe('mapTournamentSettingEntityToApiTournamentSettingPatchRequest', () => {
  it('maps entity to a patch request', () => {
    const tournamentSettingEntity: TournamentSettingEntity = {
      id: 'setting-id',
      nameFormat: NameFormat.FULL,
      nameCase: NameCase.ORIGINAL
    };

    expect(
      mapTournamentSettingEntityToApiTournamentSettingPatchRequest(
        tournamentSettingEntity
      )
    ).toEqual({
      tournament_setting: {
        id: 'setting-id',
        name_format: 'full',
        name_case: 'original'
      }
    });
  });
});

describe('mapTournamentSettingEntityToApiTournamentSettingPostRequest', () => {
  it('maps entity and tournament id to a post request', () => {
    const tournamentSettingEntity: TournamentSettingEntity = {
      id: '',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    };

    expect(
      mapTournamentSettingEntityToApiTournamentSettingPostRequest(
        tournamentSettingEntity,
        'tournament-id'
      )
    ).toEqual({
      tournament_setting: {
        id: '',
        name_format: 'first_last',
        name_case: 'upper',
        tournament_id: 'tournament-id'
      }
    });
  });
});
