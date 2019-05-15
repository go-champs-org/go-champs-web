import { HttpAction } from "../Shared/store/interfaces";
import { OrganizationEntity } from "./state";

export const REQUEST_ORGANIZATIONS = 'API_REQUEST_ORGANIZATIONS';
export const REQUEST_ORGANIZATIONS_SUCCESS = 'API_REQUEST_ORGANIZATIONS_SUCCESS';
export const REQUEST_ORGANIZATIONS_FAILURE = 'API_REQUEST_ORGANIZATIONS_FAILURE';
export const POST_ORGANIZATION = 'API_POST_ORGANIZATION';
export const POST_ORGANIZATION_SUCCESS = 'API_POST_ORGANIZATION_SUCCESS';
export const POST_ORGANIZATION_FAILURE = 'API_POST_ORGANIZATION_FAILURE';

const ORGANIZATION_API = 'https://yochamps-api.herokuapp.com/api/organizations';

export const postOrganization = (organization: OrganizationEntity): HttpAction<ActionTypes> => ({ type: POST_ORGANIZATION, payload: { url: ORGANIZATION_API, requestConfig: { method: 'POST', body: JSON.stringify({ organization }) } } });

export const postOrganizationSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: POST_ORGANIZATION_SUCCESS,
	payload,
});

export const postOrganizationFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: POST_ORGANIZATION_FAILURE,
	payload,
});

export const requestOrganizations = (): HttpAction<ActionTypes> => ({ type: REQUEST_ORGANIZATIONS, payload: { url: ORGANIZATION_API } });

export const requestOrganizationsSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: REQUEST_ORGANIZATIONS_SUCCESS,
	payload,
});

export const requestOrganizationsFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: REQUEST_ORGANIZATIONS_FAILURE,
	payload,
});

export type ActionTypes =
	typeof POST_ORGANIZATION |
	typeof POST_ORGANIZATION_FAILURE |
	typeof POST_ORGANIZATION_SUCCESS |
	typeof REQUEST_ORGANIZATIONS |
	typeof REQUEST_ORGANIZATIONS_FAILURE |
	typeof REQUEST_ORGANIZATIONS_SUCCESS;
export type Actions = HttpAction<ActionTypes>;