import { ApiOrganization } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
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
export const GET_ORGANIZATION = 'API_GET_ORGANIZATION';
export const GET_ORGANIZATION_SUCCESS = 'API_GET_ORGANIZATION_SUCCESS';
export const GET_ORGANIZATION_FAILURE = 'API_GET_ORGANIZATION_FAILURE';
export const GET_ORGANIZATIONS = 'API_GET_ORGANIZATIONS';
export const GET_ORGANIZATIONS_SUCCESS = 'API_GET_ORGANIZATIONS_SUCCESS';
export const GET_ORGANIZATIONS_FAILURE = 'API_GET_ORGANIZATIONS_FAILURE';

export const deleteOrganizationStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_ORGANIZATION
});

export const deleteOrganizationSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_ORGANIZATION_SUCCESS,
  payload
});

export const deleteOrganizationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_ORGANIZATION_FAILURE,
  payload
});

export const patchOrganizationStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_ORGANIZATION
});

export const patchOrganizationSuccess = (
  payload: OrganizationEntity
): HttpAction<ActionTypes, OrganizationEntity> => ({
  type: PATCH_ORGANIZATION_SUCCESS,
  payload
});

export const patchOrganizationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_ORGANIZATION_FAILURE,
  payload
});

export const postOrganizationStart = (): HttpAction<ActionTypes> => ({
  type: POST_ORGANIZATION
});

export const postOrganizationSuccess = (
  payload: OrganizationEntity
): HttpAction<ActionTypes, OrganizationEntity> => ({
  type: POST_ORGANIZATION_SUCCESS,
  payload
});

export const postOrganizationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_ORGANIZATION_FAILURE,
  payload
});

export const getOrganizationStart = (): HttpAction<ActionTypes> => ({
  type: GET_ORGANIZATION
});

export const getOrganizationSuccess = (
  payload: OrganizationEntity
): HttpAction<ActionTypes, OrganizationEntity> => ({
  type: GET_ORGANIZATION_SUCCESS,
  payload
});

export const getOrganizationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_ORGANIZATION_FAILURE,
  payload
});

export const getOrganizationsStart = (): HttpAction<ActionTypes> => ({
  type: GET_ORGANIZATIONS
});

export const getOrganizationsSuccess = (
  payload: OrganizationEntity[]
): HttpAction<ActionTypes, OrganizationEntity[]> => ({
  type: GET_ORGANIZATIONS_SUCCESS,
  payload
});

export const getOrganizationsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_ORGANIZATIONS_FAILURE,
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
  | typeof GET_ORGANIZATION
  | typeof GET_ORGANIZATION_FAILURE
  | typeof GET_ORGANIZATION_SUCCESS
  | typeof GET_ORGANIZATIONS
  | typeof GET_ORGANIZATIONS_FAILURE
  | typeof GET_ORGANIZATIONS_SUCCESS
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
