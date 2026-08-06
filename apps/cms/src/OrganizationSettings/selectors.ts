import {
  DEFAULT_ORGANIZATION_SETTING,
  OrganizationSettingState
} from './state';

export const organizationSetting = (state: OrganizationSettingState) =>
  Object.keys(state.organizationSettings).length === 1
    ? state.organizationSettings[Object.keys(state.organizationSettings)[0]]
    : DEFAULT_ORGANIZATION_SETTING;
