import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import List, { ListLoading } from '../Organizations/List';
import {
  organizations,
  organizationsLoading
} from '../Organizations/selectors';
import { OrganizationEntity } from '../Organizations/state';
import { StoreState } from '../store';
import withOrganizations from './support/withOrganizations';

interface OrganizationListProps {
  organizations: OrganizationEntity[];
  organizationsLoading: boolean;
}

const OrganizationList: React.FC<OrganizationListProps> = ({
  organizations,
  organizationsLoading
}) => (
  <Fragment>
    <div className="columns is-gapless is-vcentered is-mobile">
      <div className="column is-10">
        <h2 className="subtitle">Organizations</h2>
      </div>

      <div className="column is-2 has-text-right">
        <Link className="button is-text" to={`/Account/NewOrganization`}>
          New
        </Link>
      </div>
    </div>

    {organizationsLoading ? (
      <ListLoading />
    ) : (
      <List organizations={organizations} />
    )}
  </Fragment>
);

const mapStateToProps = (state: StoreState) => {
  return {
    organizations: organizations(state.organizations),
    organizationsLoading: organizationsLoading(state.organizations)
  };
};

export default withOrganizations(connect(mapStateToProps)(OrganizationList));
