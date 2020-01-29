import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OrganizationList from './OrganizationList';

const AccountHome: React.FC = () => {
  return (
    <div>
      <div className="columns is-multiline">
        <header className="column is-12">
          <h1 className="title">My account</h1>
        </header>

        <div className="column is-8">
          <Switch>
            <Route path={`/`} component={OrganizationList} />
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AccountHome;
