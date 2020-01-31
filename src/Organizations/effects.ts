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

export const deleteOrganization = (organization: OrganizationEntity) => async (
  dispatch: any
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
  dispatch: any
) => {
  dispatch(patchOrganizationStart());

  try {
    const response = await organizationHttpClient.patch(organization);

    dispatch(patchOrganizationSuccess(response));
    displayToast(`${organization.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchOrganizationFailure(err));
  }
};

export const postOrganization = (organization: OrganizationEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(postOrganizationStart());

  try {
    const response = await organizationHttpClient.post(organization);

    dispatch(postOrganizationSuccess(response));
    displayToast(`${organization.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postOrganizationFailure(err));
  }
};

export const getOrganization = (organizationId: string) => async (
  dispatch: any
) => {
  dispatch(getOrganizationStart());

  try {
    const response = await organizationHttpClient.get(organizationId);

    dispatch(getOrganizationSuccess(response));
  } catch (err) {
    dispatch(getOrganizationFailure(err));
  }
};

export const getOrganizations = () => async (dispatch: any) => {
  dispatch(getOrganizationsStart());

  try {
    const response = await organizationHttpClient.getAll();
    dispatch(getOrganizationsSuccess(response));
  } catch (err) {
    dispatch(getOrganizationsFailure(err));
  }
};
