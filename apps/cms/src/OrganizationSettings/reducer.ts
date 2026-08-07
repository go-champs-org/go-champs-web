import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_ORGANIZATION_SUCCESS } from '../Organizations/actions';
import { OrganizationEntity } from '../Organizations/state';
import {
  ActionTypes,
  DELETE_ORGANIZATION_SETTING,
  DELETE_ORGANIZATION_SETTING_FAILURE,
  DELETE_ORGANIZATION_SETTING_SUCCESS,
  PATCH_ORGANIZATION_SETTING,
  PATCH_ORGANIZATION_SETTING_FAILURE,
  PATCH_ORGANIZATION_SETTING_SUCCESS,
  POST_ORGANIZATION_SETTING,
  POST_ORGANIZATION_SETTING_FAILURE,
  POST_ORGANIZATION_SETTING_SUCCESS
} from './actions';
import {
  initialState,
  OrganizationSettingEntity,
  OrganizationSettingState
} from './state';

const organizationSettingMapEntities = mapEntities<OrganizationSettingEntity>(
  returnProperty('id')
);

const deleteOrganizationSetting = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteOrganizationSetting: true
});

const deleteOrganizationSettingFailure = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteOrganizationSetting: false
});

const deleteOrganizationSettingSuccess = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes, string>
) => {
  const organizationSettings = Object.keys(state.organizationSettings)
    .filter(entityById(state.organizationSettings, action.payload!))
    .reduce(mapEntitiesByKey(state.organizationSettings), {});
  return {
    ...state,
    organizationSettings,
    isLoadingDeleteOrganizationSetting: false
  };
};

const patchOrganizationSetting = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchOrganizationSetting: true
});

const patchOrganizationSettingFailure = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchOrganizationSetting: false
});

const patchOrganizationSettingSuccess = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes, OrganizationSettingEntity>
) => ({
  ...state,
  isLoadingPatchOrganizationSetting: false,
  organizationSettings: [action.payload].reduce(
    organizationSettingMapEntities,
    state.organizationSettings
  )
});

const postOrganizationSetting = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostOrganizationSetting: true
});

const postOrganizationSettingFailure = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostOrganizationSetting: false
});

const postOrganizationSettingSuccess = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes, OrganizationSettingEntity>
) => ({
  ...state,
  isLoadingPostOrganizationSetting: false,
  organizationSettings: [action.payload!].reduce(
    organizationSettingMapEntities,
    state.organizationSettings
  )
});

const getOrganizationSuccess = (
  state: OrganizationSettingState,
  action: HttpAction<ActionTypes, OrganizationEntity>
) => ({
  ...state,
  isLoadingRequestOrganization: false,
  organizationSettings: action.payload!.organizationSetting
    ? [action.payload!.organizationSetting].reduce(
        organizationSettingMapEntities,
        {}
      )
    : {}
});

export default createReducer(initialState, {
  [DELETE_ORGANIZATION_SETTING]: deleteOrganizationSetting,
  [DELETE_ORGANIZATION_SETTING_FAILURE]: deleteOrganizationSettingFailure,
  [DELETE_ORGANIZATION_SETTING_SUCCESS]: deleteOrganizationSettingSuccess,
  [PATCH_ORGANIZATION_SETTING]: patchOrganizationSetting,
  [PATCH_ORGANIZATION_SETTING_FAILURE]: patchOrganizationSettingFailure,
  [PATCH_ORGANIZATION_SETTING_SUCCESS]: patchOrganizationSettingSuccess,
  [POST_ORGANIZATION_SETTING]: postOrganizationSetting,
  [POST_ORGANIZATION_SETTING_FAILURE]: postOrganizationSettingFailure,
  [POST_ORGANIZATION_SETTING_SUCCESS]: postOrganizationSettingSuccess,
  [GET_ORGANIZATION_SUCCESS]: getOrganizationSuccess
});
