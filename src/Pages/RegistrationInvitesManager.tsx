import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { deleteTournament, getTournamentBySlug } from '../Tournaments/effects';
import { bindActionCreators, Dispatch } from 'redux';
import { tournaments, tournamentsLoading } from '../Tournaments/selectors';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import withRegistration from './support/withRegistration';
import {
  getRegistration,
  putRegistrationGenerateInvites
} from '../Registrations/effects';
import AdminMenu from '../Tournaments/AdminMenu';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { Trans } from 'react-i18next';
import {
  gettingRegistration,
  puttingRegistrationGenerateInvites,
  registrationById
} from '../Registrations/selectors';
import { ListLoading } from '../Registrations/List';
import InvitationList from '../Registrations/InvitationList';
import { teamsMap } from '../Teams/selectors';
import LoadingButton from '../Shared/UI/LoadingButton';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { registrationId } = props.match.params;
  return {
    generatingInvites: puttingRegistrationGenerateInvites(state.registrations),
    registration: registrationById(state.registrations, registrationId),
    registrationLoading: gettingRegistration(state.registrations),
    teamsMap: teamsMap(state.teams),
    tournaments: tournaments(state.tournaments),
    tournamentsLoading: tournamentsLoading(state.tournaments)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      deleteTournament,
      getTournamentBySlug,
      getRegistration,
      putRegistrationGenerateInvites
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type RegistrationInvitesManagerProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function RegistrationInvitesManager({
  putRegistrationGenerateInvites,
  generatingInvites,
  match,
  registration,
  registrationLoading,
  teamsMap
}: RegistrationInvitesManagerProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <div className="container">
          <div className="columns is-multiline is-mobile is-vcentered">
            <div className="column is-4">
              <h2 className="subtitle">{registration.title}</h2>
            </div>

            <div className="column is-8 has-text-right">
              <LoadingButton
                className="button is-outlined"
                isLoading={generatingInvites}
                onClick={() => putRegistrationGenerateInvites(registration.id)}
              >
                <span className="icon">
                  <i className="fas fa-envelope" />
                </span>
                <span>
                  <Trans>generateInvites</Trans>
                </span>
              </LoadingButton>
            </div>

            <div className="column is-12">
              <ComponentLoader
                canRender={!registrationLoading}
                loader={<ListLoading />}
              >
                <InvitationList
                  registration={registration}
                  teamsMap={teamsMap}
                  organizationSlug={organizationSlug}
                  tournamentSlug={tournamentSlug}
                />
              </ComponentLoader>
            </div>
          </div>
        </div>
      </div>

      <div className="is-divider-vertical is-hidden-tablet-only"></div>

      <div className="column is-4-desktop is-12-tablet">
        <AdminMenu
          organizationSlug={organizationSlug}
          tournamentSlug={tournamentSlug}
        />
      </div>
    </Fragment>
  );
}

export default connector(withRegistration(RegistrationInvitesManager));
