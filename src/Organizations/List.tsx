import React from 'react';
import { Link } from 'react-router-dom';
import PageLoader from '../Shared/UI/PageLoader';
import { OrganizationEntity, OrganizationState } from './state';

const OrganizationCard: React.FC<{
  organization: OrganizationEntity;
  url: string;
  onDeleteOrganization: any;
}> = ({ organization, onDeleteOrganization }) => (
  <div>
    <Link to={`/${organization.slug}`}>{organization.name}</Link>
    <button onClick={() => onDeleteOrganization(organization)}>Delete</button>
    <Link to={`/${organization.slug}/OrganizationEdit`}>Edit</Link>
  </div>
);

export const List: React.FC<{
  organizationState: OrganizationState;
  url: string;
  deleteOrganization: any;
}> = ({ organizationState, url, deleteOrganization }) => (
  <PageLoader canRender={!organizationState.isLoadingOrganization}>
    {Object.keys(organizationState.organizations).map((key: string) => (
      <OrganizationCard
        key={key}
        organization={organizationState.organizations[key]}
        url={url}
        onDeleteOrganization={deleteOrganization}
      />
    ))}
  </PageLoader>
);
