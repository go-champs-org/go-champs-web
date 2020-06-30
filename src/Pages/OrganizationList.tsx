import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import List, { ListLoading } from '../Organizations/List';
import {
  organizations,
  organizationsLoading
} from '../Organizations/selectors';
import { StoreState } from '../store';
import withAccount from './support/withAccount';
import { bindActionCreators, Dispatch } from 'redux';
import { deleteOrganization } from '../Organizations/effects';
import { getAccount } from '../Accounts/effects';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { account } from '../Accounts/selectors';

const mapStateToProps = (state: StoreState) => {
  return {
    account: account(state.account),
    organizations: organizations(state.organizations),
    organizationsLoading: organizationsLoading(state.organizations)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteOrganization,
      getAccount
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OrganizationListProps = ConnectedProps<typeof connector>;

const OrganizationList: React.FC<OrganizationListProps> = ({
  deleteOrganization,
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

    <ComponentLoader canRender={!organizationsLoading} loader={<ListLoading />}>
      <List
        deleteOrganization={deleteOrganization}
        organizations={organizations}
      />
    </ComponentLoader>
  </Fragment>
);

export default connector(withAccount(OrganizationList));
