import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import { ApiOrganization } from '../Shared/httpClient/apiTypes';
import { mapApiOrganizationToOrganizationEntity } from './dataMappers';

describe('mapApiOrganizationToOrganizationEntity', () => {
  it('maps the nested organization_setting when present', () => {
    const apiOrganization: ApiOrganization = {
      id: 'org-id',
      name: 'org-name',
      slug: 'org-slug',
      organization_setting: {
        id: 'setting-id',
        name_format: 'first_last',
        name_case: 'upper'
      }
    };

    const result = mapApiOrganizationToOrganizationEntity(apiOrganization);

    expect(result.organizationSetting).toEqual({
      id: 'setting-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });

  it('sets organizationSetting to undefined when absent', () => {
    const apiOrganization: ApiOrganization = {
      id: 'org-id',
      name: 'org-name',
      slug: 'org-slug'
    };

    const result = mapApiOrganizationToOrganizationEntity(apiOrganization);

    expect(result.organizationSetting).toBeUndefined();
  });
});
