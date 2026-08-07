import { displayToast } from '../Shared/bulma/toast';
import {
  deleteOrganizationSettingFailure,
  deleteOrganizationSettingStart,
  deleteOrganizationSettingSuccess,
  patchOrganizationSettingFailure,
  patchOrganizationSettingStart,
  patchOrganizationSettingSuccess,
  postOrganizationSettingFailure,
  postOrganizationSettingStart,
  postOrganizationSettingSuccess
} from './actions';
import { OrganizationSettingEntity } from './state';
import organizationSettingsHttpClient from './organizationSettingsHttpClient';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';

export const deleteOrganizationSetting = (
  organizationSetting: OrganizationSettingEntity
) => async (dispatch: Dispatch) => {
  dispatch(deleteOrganizationSettingStart());

  try {
    const response = await organizationSettingsHttpClient.delete(
      organizationSetting.id
    );

    dispatch(deleteOrganizationSettingSuccess(response));
    displayToast(`Organization settings deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteOrganizationSettingFailure(err));
  }
};

export const patchOrganizationSetting = (
  organizationSetting: OrganizationSettingEntity
) => async (dispatch: Dispatch) => {
  dispatch(patchOrganizationSettingStart());

  try {
    const response = await organizationSettingsHttpClient.patch(
      organizationSetting
    );

    dispatch(patchOrganizationSettingSuccess(response));
    displayToast(`Organization settings updated!`, 'is-success');
  } catch (err) {
    dispatch(patchOrganizationSettingFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postOrganizationSetting = (
  organizationSetting: OrganizationSettingEntity,
  organizationId: string
) => async (dispatch: Dispatch) => {
  dispatch(postOrganizationSettingStart());

  try {
    const response = await organizationSettingsHttpClient.post(
      organizationSetting,
      organizationId
    );

    dispatch(postOrganizationSettingSuccess(response));
    displayToast(`Organization settings created!`, 'is-success');
  } catch (err) {
    dispatch(postOrganizationSettingFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};
