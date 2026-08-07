import { NameCase, NameFormat } from '../Shared/dataMappers/nameFormatSettings';
import { organizationSetting } from './selectors';
import {
  DEFAULT_ORGANIZATION_SETTING,
  initialState,
  OrganizationSettingState
} from './state';

describe('organizationSetting', () => {
  it('returns default when no organization setting is loaded', () => {
    expect(organizationSetting(initialState)).toEqual(
      DEFAULT_ORGANIZATION_SETTING
    );
  });

  it('returns the single loaded organization setting', () => {
    const state: OrganizationSettingState = {
      ...initialState,
      organizationSettings: {
        'first-id': {
          id: 'first-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        }
      }
    };

    expect(organizationSetting(state)).toEqual({
      id: 'first-id',
      nameFormat: NameFormat.FIRST_LAST,
      nameCase: NameCase.UPPER
    });
  });

  it('returns default when more than one organization setting is present', () => {
    const state: OrganizationSettingState = {
      ...initialState,
      organizationSettings: {
        'first-id': {
          id: 'first-id',
          nameFormat: NameFormat.FIRST_LAST,
          nameCase: NameCase.UPPER
        },
        'second-id': {
          id: 'second-id',
          nameFormat: NameFormat.FULL,
          nameCase: NameCase.ORIGINAL
        }
      }
    };

    expect(organizationSetting(state)).toEqual(DEFAULT_ORGANIZATION_SETTING);
  });
});
