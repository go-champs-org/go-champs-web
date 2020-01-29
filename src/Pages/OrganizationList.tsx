import React, { Fragment } from 'react';
import { connect } from 'react-redux';
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
    <h2 className="subtitle">Organizations</h2>

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
