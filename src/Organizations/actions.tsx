import { OrganizationEntity } from "./state";

export const REQUEST_ORGANIZATIONS = 'REQUEST_ORGANIZATIONS';
export const REQUEST_ORGANIZATIONS_SUCCESS = 'REQUEST_ORGANIZATIONS_SUCCESS';
export const REQUEST_ORGANIZATIONS_FAILURE = 'REQUEST_ORGANIZATIONS_FAILURE';

export interface HttpAction {
    type: ActionTypes,
    payload?: OrganizationEntity,
};

export const fetchOrganizations = () => (dispatch: any) => {
    dispatch(requestOrganizations());

    return fetch('http://yochamps-api.herokuapp.com/api/organizations').then(response => response.json()).then(data => dispatch(requestOrganizationsSuccess(data))).catch(error => dispatch(requestOrganizationsFailure(error)))
}

export const requestOrganizations = (): HttpAction => ({ type: REQUEST_ORGANIZATIONS, });

export const requestOrganizationsSuccess = (payload: OrganizationEntity): HttpAction => ({
    type: REQUEST_ORGANIZATIONS_SUCCESS,
    payload,
});

export const requestOrganizationsFailure = (payload: OrganizationEntity): HttpAction => ({
    type: REQUEST_ORGANIZATIONS_FAILURE,
    payload,
});

export type ActionTypes = typeof REQUEST_ORGANIZATIONS | typeof REQUEST_ORGANIZATIONS_FAILURE | typeof REQUEST_ORGANIZATIONS_SUCCESS;
export type Actions = HttpAction;