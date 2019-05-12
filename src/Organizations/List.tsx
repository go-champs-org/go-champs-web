import React from 'react';
import { OrganizationEntity, OrganizationState } from "./state";

const OrganizationCard: React.FC<{ organization: OrganizationEntity }> = ({ organization }) => (
    <div>
        {organization.name}
    </div>
);

const Loading: React.FC = () => (
    <div>Loading...</div>
)

export const List: React.FC<{ organizationState: OrganizationState }> = ({ organizationState }) => (
    <div>
        {organizationState.isLoadingRequestOrganizations ?
            <Loading /> :
            Object.keys(organizationState.organizations).map((key: string) => <OrganizationCard key={key} organization={organizationState.organizations[key]} />)
        }
    </div>
);