
export const REQUEST_ORGANIZATIONS = 'API_REQUEST_ORGANIZATIONS';
export const REQUEST_ORGANIZATIONS_SUCCESS = 'API_REQUEST_ORGANIZATIONS_SUCCESS';
export const REQUEST_ORGANIZATIONS_FAILURE = 'API_REQUEST_ORGANIZATIONS_FAILURE';

export interface HttpAction {
    type: ActionTypes,
    payload?: any,
};

export const requestOrganizations = (): HttpAction => ({ type: REQUEST_ORGANIZATIONS, payload: { url: 'http://yochamps-api.herokuapp.com/api/organizations' } });

export const requestOrganizationsSuccess = (payload: any): HttpAction => ({
    type: REQUEST_ORGANIZATIONS_SUCCESS,
    payload,
});

export const requestOrganizationsFailure = (payload: any): HttpAction => ({
    type: REQUEST_ORGANIZATIONS_FAILURE,
    payload,
});

export type ActionTypes = typeof REQUEST_ORGANIZATIONS | typeof REQUEST_ORGANIZATIONS_FAILURE | typeof REQUEST_ORGANIZATIONS_SUCCESS;
export type Actions = HttpAction;