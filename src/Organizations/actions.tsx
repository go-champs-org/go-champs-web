import { HttpAction } from "../Shared/store/interfaces";
import { OrganizationEntity } from "./state";

export const DELETE_ORGANIZATION = 'API_DELETE_ORGANIZATION';
export const DELETE_ORGANIZATION_SUCCESS = 'API_DELETE_ORGANIZATION_SUCCESS';
export const DELETE_ORGANIZATION_FAILURE = 'API_DELETE_ORGANIZATION_FAILURE';
export const REQUEST_ORGANIZATIONS = 'API_REQUEST_ORGANIZATIONS';
export const REQUEST_ORGANIZATIONS_SUCCESS = 'API_REQUEST_ORGANIZATIONS_SUCCESS';
export const REQUEST_ORGANIZATIONS_FAILURE = 'API_REQUEST_ORGANIZATIONS_FAILURE';
export const POST_ORGANIZATION = 'API_POST_ORGANIZATION';
export const POST_ORGANIZATION_SUCCESS = 'API_POST_ORGANIZATION_SUCCESS';
export const POST_ORGANIZATION_FAILURE = 'API_POST_ORGANIZATION_FAILURE';

const ORGANIZATION_API = 'https://yochamps-api.herokuapp.com/api/organizations';

export const deleteOrganization = (organization: OrganizationEntity): HttpAction<ActionTypes> => ({
	type: DELETE_ORGANIZATION, payload: {
		url: `${ORGANIZATION_API}/${organization.id}`, requestConfig: {
			method: 'DELETE',
		}
	}
});

export const deleteOrganizationSuccess = (payload: any): HttpAction<ActionTypes> => ({
	type: DELETE_ORGANIZATION_SUCCESS,
	payload,
});

export const deleteOrganizationFailure = (payload: any): HttpAction<ActionTypes> => ({
	type: DELETE_ORGANIZATION_FAILURE,
	payload,
});

export const postOrganization = (organization: OrganizationEntity): HttpAction<ActionTypes> => ({
	type: POST_ORGANIZATION, payload: {
		url: ORGANIZATION_API, requestConfig: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ organization })
		}
	}
});

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
	typeof DELETE_ORGANIZATION |
	typeof DELETE_ORGANIZATION_FAILURE |
	typeof DELETE_ORGANIZATION_SUCCESS |
	typeof POST_ORGANIZATION |
	typeof POST_ORGANIZATION_FAILURE |
	typeof POST_ORGANIZATION_SUCCESS |
	typeof REQUEST_ORGANIZATIONS |
	typeof REQUEST_ORGANIZATIONS_FAILURE |
	typeof REQUEST_ORGANIZATIONS_SUCCESS;
export type Actions = HttpAction<ActionTypes>;