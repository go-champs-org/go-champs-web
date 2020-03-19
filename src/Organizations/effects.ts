import { displayToast } from '../Shared/bulma/toast';
import {
  deleteOrganizationFailure,
  deleteOrganizationStart,
  deleteOrganizationSuccess,
  getOrganizationFailure,
  getOrganizationsFailure,
  getOrganizationsStart,
  getOrganizationsSuccess,
  getOrganizationStart,
  getOrganizationSuccess,
  patchOrganizationFailure,
  patchOrganizationStart,
  patchOrganizationSuccess,
  postOrganizationFailure,
  postOrganizationStart,
  postOrganizationSuccess
} from './actions';
import organizationHttpClient from './organizationHttpClient';
import { OrganizationEntity } from './state';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';

export const deleteOrganization = (organization: OrganizationEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(deleteOrganizationStart());

  try {
    const response = await organizationHttpClient.delete(organization.id);

    dispatch(deleteOrganizationSuccess(response));
    displayToast(`${organization.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteOrganizationFailure(err));
  }
};

export const patchOrganization = (organization: OrganizationEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(patchOrganizationStart());

  try {
    const response = await organizationHttpClient.patch(organization);

    dispatch(patchOrganizationSuccess(response));
    displayToast(`${response.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchOrganizationFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const postOrganization = (organization: OrganizationEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(postOrganizationStart());

  try {
    const response = await organizationHttpClient.post(organization);

    dispatch(postOrganizationSuccess(response));
    displayToast(`${response.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postOrganizationFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
  }
};

export const getOrganization = (organizationId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(getOrganizationStart());

  try {
    const response = await organizationHttpClient.get(organizationId);

    dispatch(getOrganizationSuccess(response));
  } catch (err) {
    dispatch(getOrganizationFailure(err));
  }
};

export const getOrganizations = () => async (dispatch: Dispatch) => {
  dispatch(getOrganizationsStart());

  try {
    const response = await organizationHttpClient.getAll();

    dispatch(getOrganizationsSuccess(response));
  } catch (err) {
    dispatch(getOrganizationsFailure(err));
  }
};
