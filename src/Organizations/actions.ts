import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import organizationHttpClient from './organizationHttpClient';
import { OrganizationEntity } from './state';

export const DELETE_ORGANIZATION = 'API_DELETE_ORGANIZATION';
export const DELETE_ORGANIZATION_SUCCESS = 'API_DELETE_ORGANIZATION_SUCCESS';
export const DELETE_ORGANIZATION_FAILURE = 'API_DELETE_ORGANIZATION_FAILURE';
export const PATCH_ORGANIZATION = 'API_PATCH_ORGANIZATION';
export const PATCH_ORGANIZATION_SUCCESS = 'API_PATCH_ORGANIZATION_SUCCESS';
export const PATCH_ORGANIZATION_FAILURE = 'API_PATCH_ORGANIZATION_FAILURE';
export const POST_ORGANIZATION = 'API_POST_ORGANIZATION';
export const POST_ORGANIZATION_SUCCESS = 'API_POST_ORGANIZATION_SUCCESS';
export const POST_ORGANIZATION_FAILURE = 'API_POST_ORGANIZATION_FAILURE';
export const REQUEST_ORGANIZATION = 'API_REQUEST_ORGANIZATION';
export const REQUEST_ORGANIZATION_SUCCESS = 'API_REQUEST_ORGANIZATION_SUCCESS';
export const REQUEST_ORGANIZATION_FAILURE = 'API_REQUEST_ORGANIZATION_FAILURE';
export const REQUEST_ORGANIZATIONS = 'API_REQUEST_ORGANIZATIONS';
export const REQUEST_ORGANIZATIONS_SUCCESS =
  'API_REQUEST_ORGANIZATIONS_SUCCESS';
export const REQUEST_ORGANIZATIONS_FAILURE =
  'API_REQUEST_ORGANIZATIONS_FAILURE';

export const deleteOrganization = (organization: OrganizationEntity) => async (
  dispatch: any
) => {
  dispatch({ type: DELETE_ORGANIZATION });

  try {
    const response = await organizationHttpClient.delete(organization.id);

    dispatch(deleteOrganizationSuccess(response));
    displayToast(`${organization.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteOrganizationFailure(err));
  }
};

export const deleteOrganizationSuccess = (payload: any) => ({
  type: DELETE_ORGANIZATION_SUCCESS,
  payload
});

export const deleteOrganizationFailure = (payload: any) => ({
  type: DELETE_ORGANIZATION_FAILURE,
  payload
});

export const patchOrganization = (organization: OrganizationEntity) => async (
  dispatch: any
) => {
  dispatch({ type: PATCH_ORGANIZATION });

  try {
    const response = await organizationHttpClient.patch(organization);

    dispatch(patchOrganizationSuccess(response));
    displayToast(`${organization.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchOrganizationFailure(err));
  }
};

export const patchOrganizationSuccess = (payload: any) => ({
  type: PATCH_ORGANIZATION_SUCCESS,
  payload
});

export const patchOrganizationFailure = (payload: any) => ({
  type: PATCH_ORGANIZATION_FAILURE,
  payload
});

export const postOrganization = (organization: OrganizationEntity) => async (
  dispatch: any
) => {
  dispatch({ type: POST_ORGANIZATION });

  try {
    const response = await organizationHttpClient.post(organization);

    dispatch(postOrganizationSuccess(response));
    displayToast(`${organization.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postOrganizationFailure(err));
  }
};

export const postOrganizationSuccess = (payload: any) => ({
  type: POST_ORGANIZATION_SUCCESS,
  payload
});

export const postOrganizationFailure = (payload: any) => ({
  type: POST_ORGANIZATION_FAILURE,
  payload
});

export const requestOrganization = (organizationId: string) => async (
  dispatch: any
) => {
  dispatch({ type: REQUEST_ORGANIZATION });

  try {
    const response = await organizationHttpClient.get(organizationId);

    dispatch(requestOrganizationSuccess(response));
  } catch (err) {
    dispatch(requestOrganizationFailure(err));
  }
};

export const requestOrganizationSuccess = (payload: any) => ({
  type: REQUEST_ORGANIZATION_SUCCESS,
  payload
});

export const requestOrganizationFailure = (payload: any) => ({
  type: REQUEST_ORGANIZATION_FAILURE,
  payload
});

export const requestOrganizations = () => async (dispatch: any) => {
  dispatch({ type: REQUEST_ORGANIZATIONS });

  try {
    const response = await organizationHttpClient.getAll();
    dispatch(requestOrganizationsSuccess(response));
  } catch (err) {
    dispatch(requestOrganizationsFailure(err));
  }
};

export const requestOrganizationsSuccess = (payload: any) => ({
  type: REQUEST_ORGANIZATIONS_SUCCESS,
  payload
});

export const requestOrganizationsFailure = (payload: any) => ({
  type: REQUEST_ORGANIZATIONS_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_ORGANIZATION
  | typeof DELETE_ORGANIZATION_FAILURE
  | typeof DELETE_ORGANIZATION_SUCCESS
  | typeof PATCH_ORGANIZATION
  | typeof PATCH_ORGANIZATION_FAILURE
  | typeof PATCH_ORGANIZATION_SUCCESS
  | typeof POST_ORGANIZATION
  | typeof POST_ORGANIZATION_FAILURE
  | typeof POST_ORGANIZATION_SUCCESS
  | typeof REQUEST_ORGANIZATIONS
  | typeof REQUEST_ORGANIZATIONS_FAILURE
  | typeof REQUEST_ORGANIZATIONS_SUCCESS
  | typeof REQUEST_TOURNAMENT
  | typeof REQUEST_TOURNAMENT_FAILURE
  | typeof REQUEST_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
