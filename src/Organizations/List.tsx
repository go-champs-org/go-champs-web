import React from 'react';
import { Link } from 'react-router-dom';
import { OrganizationEntity } from './state';

export const ListLoading: React.FC = () => <div></div>;

const OrganizationCard: React.FC<{
  organization: OrganizationEntity;
  onDeleteOrganization: any;
}> = ({ organization, onDeleteOrganization }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`/OrganizationEdit/${organization.slug}`}
      >
        <span className="title is-6">{organization.name}</span>
      </Link>

      <div className="card-header-icon">
        <button className="button is-text">
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
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
