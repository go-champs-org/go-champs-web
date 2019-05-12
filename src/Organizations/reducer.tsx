import { createReducer } from "../redux_helpers";
import { HttpAction, REQUEST_ORGANIZATIONS, REQUEST_ORGANIZATIONS_FAILURE, REQUEST_ORGANIZATIONS_SUCCESS } from "./actions";
import { initialState, OrganizationState } from "./state";

const requestOrganizations = (state: OrganizationState, action: HttpAction) => ({
    isLoadingRequestOrganizations: true,
});

const requestOrganizationsSuccess = (state: OrganizationState, action: HttpAction) => ({
    isLoadingRequestOrganizations: false,
});

const requestOrganizationsFailure = (state: OrganizationState, action: HttpAction) => ({
    isLoadingRequestOrganizations: false,
});

export default createReducer(initialState, {
    [REQUEST_ORGANIZATIONS]: requestOrganizations,
    [REQUEST_ORGANIZATIONS_FAILURE]: requestOrganizationsFailure,
    [REQUEST_ORGANIZATIONS_SUCCESS]: requestOrganizationsSuccess,
});
