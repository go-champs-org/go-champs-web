import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import OrganizationEdit from './OrganizationEdit';
import TournamentList from './TournamentList';
import TournamentNew from './TournamentNew';

const OrganizationHome: React.FC<RouteComponentProps<RouteProps>> = ({
  match: {
    params: { organizationSlug }
  }
}) => {
  if (!organizationSlug) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <div className="columns is-multiline">
        <header className="column is-12">
          <h1 className="title">Organization</h1>
        </header>

        <div className="column is-8">
          <Switch>
            <Route
              path={`/Organization/:organizationSlug/Edit`}
              component={OrganizationEdit}
            />
            <Route
              path={`/Organization/:organizationSlug/NewTournament`}
              component={TournamentNew}
            />
            <Route
              path={`/Organization/:organizationSlug/Tournaments`}
              component={TournamentList}
            />
            <Route
              path={`/Organization/:organizationSlug`}
              component={TournamentList}
            />
          </Switch>
        </div>

        <div className="column is-4">
          <aside className="menu">
            <p className="menu-label">General</p>

            <ul className="menu-list">
              <li>
                <a href={`/Organization/${organizationSlug}/Edit`}>
                  Informations
                </a>
              </li>

              <li>
                <a href={`/Organization/${organizationSlug}/Tournaments`}>
                  Tournaments
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default OrganizationHome;
