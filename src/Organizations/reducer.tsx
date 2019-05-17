import { createReducer, entityById, mapEntities, mapEntitiesByKey } from "../Shared/store/helpers";
import { HttpAction } from "../Shared/store/interfaces";
import { ActionTypes, DELETE_ORGANIZATION, DELETE_ORGANIZATION_FAILURE, DELETE_ORGANIZATION_SUCCESS, POST_ORGANIZATION, POST_ORGANIZATION_FAILURE, POST_ORGANIZATION_SUCCESS, REQUEST_ORGANIZATIONS, REQUEST_ORGANIZATIONS_FAILURE, REQUEST_ORGANIZATIONS_SUCCESS } from "./actions";
import { initialState, OrganizationState } from "./state";

export const deleteOrganization = (state: OrganizationState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteOrganization: true,
});

export const deleteOrganizationFailure = (state: OrganizationState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingDeleteOrganization: false,
});

export const deleteOrganizationSuccess = (state: OrganizationState, action: HttpAction<ActionTypes>) => {
	const organizations = Object.keys(state.organizations)
		.filter(entityById(state.organizations, action.payload))
		.reduce(mapEntitiesByKey(state.organizations), {});
	return {
		...state,
		isLoadingDeleteOrganization: false,
		organizations,
	}
};

export const postOrganization = (state: OrganizationState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostOrganization: true,
});

export const postOrganizationFailure = (state: OrganizationState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostOrganization: false,
});

export const postOrganizationSuccess = (state: OrganizationState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingPostOrganization: false,
	organizations: [action.payload.data].reduce(mapEntities, state.organizations),
});

export const requestOrganizations = (state: OrganizationState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestOrganizations: true,
});

export const requestOrganizationsFailure = (state: OrganizationState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestOrganizations: false,
});

export const requestOrganizationsSuccess = (state: OrganizationState, action: HttpAction<ActionTypes>) => ({
	...state,
	isLoadingRequestOrganizations: false,
	organizations: action.payload.data.reduce(mapEntities, {}),
});

export default createReducer(initialState, {
	[DELETE_ORGANIZATION]: deleteOrganization,
	[DELETE_ORGANIZATION_FAILURE]: deleteOrganizationFailure,
	[DELETE_ORGANIZATION_SUCCESS]: deleteOrganizationSuccess,
	[POST_ORGANIZATION]: postOrganization,
	[POST_ORGANIZATION_FAILURE]: postOrganizationFailure,
	[POST_ORGANIZATION_SUCCESS]: postOrganizationSuccess,
	[REQUEST_ORGANIZATIONS]: requestOrganizations,
	[REQUEST_ORGANIZATIONS_FAILURE]: requestOrganizationsFailure,
	[REQUEST_ORGANIZATIONS_SUCCESS]: requestOrganizationsSuccess,
});