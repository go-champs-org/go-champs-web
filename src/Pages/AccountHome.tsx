import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import OrganizationList from './OrganizationList';
import OrganizationNew from './OrganizationNew';
import OrganizationEdit from './OrganizationEdit';
import Helmet from 'react-helmet';
import { signOut } from '../Accounts/effects';

const AccountHome: React.FC = () => {
  const logOutClick = () => {
    signOut();
    return '/'; // root path
  };

  return (
    <div>
      <div className="columns is-multiline">
        <header className="column is-12">
          <h1 className="title">My account</h1>
        </header>

        <div className="column is-8">
          <Switch>
            <Route
              path="/Account/EditOrganization/:organizationSlug"
              component={OrganizationEdit}
            />
            <Route
              path="/Account/NewOrganization"
              component={OrganizationNew}
            />
            <Route path="/Account/Organizations" component={OrganizationList} />
            <Route path="/Account" component={OrganizationList} />
          </Switch>
        </div>

        <div className="column is-4">
          <aside className="menu">
            <p className="menu-label">General</p>

            <ul className="menu-list">
              <li>
                <a href="/Account/Organizations">Organizations</a>
              </li>
            </ul>

            <p className="menu-label">Account</p>

            <ul className="menu-list">
              <li>
                <a href="/" onClick={signOut}>
                  Log out
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>

      <Helmet>
        <title>Go Champs! | My Account</title>
      </Helmet>
    </div>
  );
};

export default AccountHome;
