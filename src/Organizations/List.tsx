import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { OrganizationEntity } from './state';
import { AnyAction, Dispatch } from 'redux';

const LoadingCard: React.FC = () => (
  <div className="card item">
    <div className="card-header">
      <div className="card-header-title">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </div>
);

export const ListLoading: React.FC = () => (
  <div>
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </div>
);

const OrganizationCard: React.FC<{
  organization: OrganizationEntity;
  deleteOrganization: (
    organization: OrganizationEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}> = ({ organization, deleteOrganization }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`/Organization/${organization.slug}`}
      >
        <span className="title is-6">{organization.name}</span>
      </Link>

      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => deleteOrganization(organization)}
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  deleteOrgazanition: (
    organization: OrganizationEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizations: OrganizationEntity[];
}> = ({ deleteOrgazanition, organizations }) => (
  <div>
    {organizations.map((organization: OrganizationEntity) => (
      <OrganizationCard
        key={organization.id}
        deleteOrganization={deleteOrgazanition}
        organization={organization}
      />
    ))}
  </div>
);

export default List;
