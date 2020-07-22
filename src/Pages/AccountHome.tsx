import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrganizationList from './OrganizationList';
import OrganizationNew from './OrganizationNew';
import OrganizationEdit from './OrganizationEdit';
import Helmet from 'react-helmet';
import { signOut } from '../Accounts/effects';
import { Trans } from 'react-i18next';

const AccountHome: React.FC = () => {
  return (
    <div>
      <div className="columns is-multiline">
        <header className="column is-12">
          <h1 className="title">
            <Trans>myAccount</Trans>
          </h1>
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
            <p className="menu-label">
              <Trans>general</Trans>
            </p>

            <ul className="menu-list">
              <li>
                <a href="/Account/Organizations">
                  <Trans>organizations</Trans>
                </a>
              </li>
            </ul>

            <p className="menu-label">
              <Trans>account</Trans>
            </p>

            <ul className="menu-list">
              <li>
                <a href="/" onClick={signOut}>
                  <Trans>signOut</Trans>
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
