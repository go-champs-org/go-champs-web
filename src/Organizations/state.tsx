export interface OrganizationEntity {
    id: string;
    name: string;
    slug: string;
}

export interface OrganizationState {
    isLoadingRequestOrganizations: boolean;
    organizations: { [key: string]: OrganizationEntity; };
}

export const initialState: OrganizationState = {
    isLoadingRequestOrganizations: false,
    organizations: {},
}