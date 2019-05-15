import { createReducer, mapEntities } from "../Shared/store/helpers";
import { HttpAction } from "../Shared/store/interfaces";
import { ActionTypes, REQUEST_ORGANIZATIONS, REQUEST_ORGANIZATIONS_FAILURE, REQUEST_ORGANIZATIONS_SUCCESS } from "./actions";
import { initialState, OrganizationState } from "./state";

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
	[REQUEST_ORGANIZATIONS]: requestOrganizations,
	[REQUEST_ORGANIZATIONS_FAILURE]: requestOrganizationsFailure,
	[REQUEST_ORGANIZATIONS_SUCCESS]: requestOrganizationsSuccess,
});
