import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import { ApiOrganizationSetting } from '../Shared/httpClient/apiTypes';
import {
  mapApiOrganizationSettingToOrganizationSettingEntity,
  mapOrganizationSettingEntityToApiOrganizationSettingPatchRequest,
  mapOrganizationSettingEntityToApiOrganizationSettingPostRequest
} from './dataMappers';
import { OrganizationSettingEntity } from './state';

describe('mapApiOrganizationSettingToOrganizationSettingEntity', () => {
  it('maps API organization setting to entity', () => {
    const apiOrganizationSetting: ApiOrganizationSetting = {
      id: 'setting-id',
      name_format: 'first_last',
      name_case: 'upper'
    };

    expect(
      mapApiOrganizationSettingToOrganizationSettingEntity(
        apiOrganizationSetting
      )
    ).toEqual({
      id: 'setting-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });
});

describe('mapOrganizationSettingEntityToApiOrganizationSettingPatchRequest', () => {
  it('maps entity to a patch request', () => {
    const organizationSettingEntity: OrganizationSettingEntity = {
      id: 'setting-id',
      nameFormat: NameFormat.FULL,
      nameCase: NameCase.ORIGINAL
    };

    expect(
      mapOrganizationSettingEntityToApiOrganizationSettingPatchRequest(
        organizationSettingEntity
      )
    ).toEqual({
      organization_setting: {
        id: 'setting-id',
        name_format: 'full',
        name_case: 'original'
      }
    });
  });
});

describe('mapOrganizationSettingEntityToApiOrganizationSettingPostRequest', () => {
  it('maps entity and organization id to a post request', () => {
    const organizationSettingEntity: OrganizationSettingEntity = {
      id: '',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    };

    expect(
      mapOrganizationSettingEntityToApiOrganizationSettingPostRequest(
        organizationSettingEntity,
        'organization-id'
      )
    ).toEqual({
      organization_setting: {
        id: '',
        name_format: 'first_last',
        name_case: 'upper',
        organization_id: 'organization-id'
      }
    });
  });
});
