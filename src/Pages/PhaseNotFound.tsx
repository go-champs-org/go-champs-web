import React, { Fragment } from 'react';
import AuthenticatedWrapper, {
  NotAuthenticatedWrapper
} from '../Shared/UI/AdminWrapper';
import AdminMenu from '../Tournaments/AdminMenu';
import { RouteComponentProps, Link } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { Trans } from 'react-i18next';

const PhaseNotFound: React.FC<RouteComponentProps<RouteProps>> = ({
  match
}) => {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <NotAuthenticatedWrapper>
          <div className="notification is-danger is-light">
            <div className="content has-text-centered">
              <h2 className="subtitle">
                <Trans>thisTournamentIsUnderContruction</Trans>
              </h2>
            </div>
          </div>
        </NotAuthenticatedWrapper>

        <AuthenticatedWrapper>
          <div className="notification is-danger is-light">
            <div className="content has-text-centered">
              <h2 className="subtitle">
                <Trans>youNeedCreateTeams</Trans>
              </h2>

              <Link to={`/${organizationSlug}/${tournamentSlug}/NewTeam`}>
                <button className="button is-large is-fullwidth">
                  <Trans>newTeam</Trans>
                </button>
              </Link>
            </div>
          </div>

          <div className="notification is-danger is-light">
            <div className="content has-text-centered">
              <h2 className="subtitle">
                <Trans>youNeedCreatePhases</Trans>
              </h2>

              <Link to={`/${organizationSlug}/${tournamentSlug}/NewPhase`}>
                <button className="button is-large is-fullwidth">
                  <Trans>newPhase</Trans>
                </button>
              </Link>
            </div>
          </div>
        </AuthenticatedWrapper>
      </div>

      <AuthenticatedWrapper>
        <div className="is-divider-vertical is-hidden-tablet-only"></div>

        <div className="column is-4-desktop is-12-tablet">
          <AdminMenu
            organizationSlug={organizationSlug}
            tournamentSlug={tournamentSlug}
          />
        </div>
      </AuthenticatedWrapper>
    </Fragment>
  );
};

export default PhaseNotFound;
