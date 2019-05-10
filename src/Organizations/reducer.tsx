import { Actions, REQUEST_ORGANIZATIONS, REQUEST_ORGANIZATIONS_FAILURE, REQUEST_ORGANIZATIONS_SUCCESS } from "./actions";
import { initialState, OrganizationState } from "./state";

const organizationReducer = (state: OrganizationState = initialState, action: Actions): OrganizationState => {
    switch (action.type) {
        case REQUEST_ORGANIZATIONS: {
            return {
                ...state,
                isLoadingRequestOrganizations: true,
            };
        }
        case REQUEST_ORGANIZATIONS_FAILURE: {
            console.log('failure')
            return state;
        }
        case REQUEST_ORGANIZATIONS_SUCCESS: {
            console.log('success')
            return state;
        }
        default: { return state; }
    }
};

export default organizationReducer;