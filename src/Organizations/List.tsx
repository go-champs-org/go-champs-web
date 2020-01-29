import React from 'react';
import { Link } from 'react-router-dom';
import { OrganizationEntity } from './state';

export const ListLoading: React.FC = () => <div></div>;

const OrganizationCard: React.FC<{
  organization: OrganizationEntity;
  onDeleteOrganization: any;
}> = ({ organization, onDeleteOrganization }) => (
  <div>
    <Link to={`/${organization.slug}`}>{organization.name}</Link>
    <button onClick={() => onDeleteOrganization(organization)}>Delete</button>
    <Link to={`/${organization.slug}/OrganizationEdit`}>Edit</Link>
  </div>
);

export const List: React.FC<{
  organizations: OrganizationEntity[];
}> = ({ organizations }) => (
  <div>
    {organizations.map((organization: OrganizationEntity) => (
      <OrganizationCard
        key={organization.id}
        organization={organization}
        onDeleteOrganization={false}
      />
    ))}
  </div>
);

export default List;
