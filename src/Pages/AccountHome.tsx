import React from 'react';
import { connect } from 'react-redux';
import { organizations, organizationsLoading } from '../Organizations/selectors';
import { OrganizationEntity } from '../Organizations/state';
import { StoreState } from '../store';
import withOrganizations from './support/withOrganizations';

interface AccountHomeProps {
  organizations: OrganizationEntity[];
  organizationsLoading: boolean;
}

const AccountHome: React.FC<AccountHomeProps> = ({
  organizations,
  organizationsLoading
}) => {
  return (
    <div>
      <div className="columns is-multiline">
        <header className="column is-12">My account</header>

        <div className="column is-8">
          <h2 className="title">Organizations</h2>
        </div>

        <div className="column is-4">
          <aside className="menu">
            <p className="menu-label">General</p>

            <ul className="menu-list">
              <li>
                <a href="/OrganizationsList">Organizations</a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    organizations: organizations(state.organizations),
    organizationsLoading: organizationsLoading(state.organizations)
  };
};

export default withOrganizations(connect(mapStateToProps)(AccountHome));
