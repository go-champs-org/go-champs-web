import { createReducer } from "../redux_helpers";
import { HttpAction, REQUEST_ORGANIZATIONS, REQUEST_ORGANIZATIONS_FAILURE, REQUEST_ORGANIZATIONS_SUCCESS } from "./actions";
import { initialState, OrganizationEntity, OrganizationState } from "./state";

const mapEntities = (entitiesMap: { [key: string]: OrganizationEntity }, apiData: any) => {
    return {
        ...entitiesMap,
        [apiData.id]: {
            id: apiData.id,
            name: apiData.name,
            slug: apiData.slug,
        },
    };
};

export const requestOrganizations = (state: OrganizationState, action: HttpAction) => ({
    ...state,
    isLoadingRequestOrganizations: true,
});

export const requestOrganizationsFailure = (state: OrganizationState, action: HttpAction) => ({
    ...state,
    isLoadingRequestOrganizations: false,
});

export const requestOrganizationsSuccess = (state: OrganizationState, action: HttpAction) => ({
    ...state,
    isLoadingRequestOrganizations: false,
    organizations: action.payload.data.reduce(mapEntities, {}),
});

export default createReducer(initialState, {
    [REQUEST_ORGANIZATIONS]: requestOrganizations,
    [REQUEST_ORGANIZATIONS_FAILURE]: requestOrganizationsFailure,
    [REQUEST_ORGANIZATIONS_SUCCESS]: requestOrganizationsSuccess,
});
