import React, { Fragment } from 'react';
import AdminWrapper, { NotAdminWrapper } from '../Shared/UI/AdminWrapper';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';

const PhaseNotFound: React.FC<RouteComponentProps<RouteProps>> = ({
  match
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <NotAdminWrapper>
          <div className="notification is-danger is-light">
            <div className="content has-text-centered">
              <h2 className="subtitle">Este torneiro está em construção.</h2>
            </div>
          </div>
        </NotAdminWrapper>

        <AdminWrapper>
          <div className="notification is-danger is-light">
            <div className="content has-text-centered">
              <h2 className="subtitle">
                Você precisa criar times para o torneio.
              </h2>

              <Link to={`/${organizationSlug}/${tournamentSlug}/NewTeam`}>
                <button className="button is-large is-fullwidth">
                  New team
                </button>
              </Link>
            </div>
          </div>

          <div className="notification is-danger is-light">
            <div className="content has-text-centered">
              <h2 className="subtitle">
                Você precisa criar um fase para o torneio.
              </h2>

              <Link to={`/${organizationSlug}/${tournamentSlug}/NewPhase`}>
                <button className="button is-large is-fullwidth">
                  New phase
                </button>
              </Link>
            </div>
          </div>
        </AdminWrapper>
      </div>

      <AdminWrapper>
        <div className="is-divider-vertical"></div>

        <div className="column is-4">
          <AdminMenu
            organizationSlug={organizationSlug}
            tournamentSlug={tournamentSlug}
          />
        </div>
      </AdminWrapper>
    </Fragment>
  );
};

export default PhaseNotFound;
