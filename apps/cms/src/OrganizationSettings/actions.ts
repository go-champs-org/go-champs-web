import { HttpAction } from '../Shared/store/interfaces';
import { GET_ORGANIZATION_SUCCESS } from '../Organizations/actions';
import { OrganizationSettingEntity } from './state';

export const DELETE_ORGANIZATION_SETTING = 'API_DELETE_ORGANIZATION_SETTING';
export const DELETE_ORGANIZATION_SETTING_SUCCESS =
  'API_DELETE_ORGANIZATION_SETTING_SUCCESS';
export const DELETE_ORGANIZATION_SETTING_FAILURE =
  'API_DELETE_ORGANIZATION_SETTING_FAILURE';
export const PATCH_ORGANIZATION_SETTING = 'API_PATCH_ORGANIZATION_SETTING';
export const PATCH_ORGANIZATION_SETTING_SUCCESS =
  'API_PATCH_ORGANIZATION_SETTING_SUCCESS';
export const PATCH_ORGANIZATION_SETTING_FAILURE =
  'API_PATCH_ORGANIZATION_SETTING_FAILURE';
export const POST_ORGANIZATION_SETTING = 'API_POST_ORGANIZATION_SETTING';
export const POST_ORGANIZATION_SETTING_SUCCESS =
  'API_POST_ORGANIZATION_SETTING_SUCCESS';
export const POST_ORGANIZATION_SETTING_FAILURE =
  'API_POST_ORGANIZATION_SETTING_FAILURE';

export const deleteOrganizationSettingStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_ORGANIZATION_SETTING
});

export const deleteOrganizationSettingSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_ORGANIZATION_SETTING_SUCCESS,
  payload
});

export const deleteOrganizationSettingFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: DELETE_ORGANIZATION_SETTING_FAILURE,
  payload
});

export const patchOrganizationSettingStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_ORGANIZATION_SETTING
});

export const patchOrganizationSettingSuccess = (
  payload: OrganizationSettingEntity
): HttpAction<ActionTypes, OrganizationSettingEntity> => ({
  type: PATCH_ORGANIZATION_SETTING_SUCCESS,
  payload
});

export const patchOrganizationSettingFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: PATCH_ORGANIZATION_SETTING_FAILURE,
  payload
});

export const postOrganizationSettingStart = (): HttpAction<ActionTypes> => ({
  type: POST_ORGANIZATION_SETTING
});

export const postOrganizationSettingSuccess = (
  payload: OrganizationSettingEntity
): HttpAction<ActionTypes, OrganizationSettingEntity> => ({
  type: POST_ORGANIZATION_SETTING_SUCCESS,
  payload
});

export const postOrganizationSettingFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: POST_ORGANIZATION_SETTING_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_ORGANIZATION_SETTING
  | typeof DELETE_ORGANIZATION_SETTING_SUCCESS
  | typeof DELETE_ORGANIZATION_SETTING_FAILURE
  | typeof PATCH_ORGANIZATION_SETTING
  | typeof PATCH_ORGANIZATION_SETTING_SUCCESS
  | typeof PATCH_ORGANIZATION_SETTING_FAILURE
  | typeof POST_ORGANIZATION_SETTING
  | typeof POST_ORGANIZATION_SETTING_SUCCESS
  | typeof POST_ORGANIZATION_SETTING_FAILURE
  | typeof GET_ORGANIZATION_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
