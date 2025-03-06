import React, { Fragment } from 'react';
import AdminMenu from '../Tournaments/AdminMenu';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import { bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { getRegistrationInvite } from '../Registrations/effects';
import {
  gettingRegistration,
  gettingRegistrationInvite,
  registrationById,
  registrationInviteById
} from '../Registrations/selectors';
import withRegistrationInvite from './support/withRegistrationInvite';
import ResponseList, { Loading } from '../Registrations/ResponseList';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => {
  const { registrationId, inviteId } = props.match.params;
  return {
    registration: registrationById(state.registrations, registrationId),
    registrationLoading: gettingRegistration(state.registrations),
    registrationInvite: registrationInviteById(state.registrations, inviteId),
    registrationInviteLoading: gettingRegistrationInvite(state.registrations)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getRegistrationInvite
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type RegistrationInviteManagerProps = ConnectedProps<typeof connector> &
  RouteComponentProps<RouteProps>;

function RegistrationInviteManager({
  registrationInviteLoading,
  registration,
  registrationInvite,
  match
}: RegistrationInviteManagerProps) {
  const { organizationSlug = '', tournamentSlug = '' } = match.params;
  return (
    <Fragment>
      <div className="column">
        <div className="container">
          <div className="columns is-multiline is-mobile is-vcentered">
            {registrationInviteLoading ? (
              <Loading />
            ) : (
              <ResponseList
                registration={registration}
                registrationInvite={registrationInvite}
                organizationSlug={organizationSlug}
                tournamentSlug={tournamentSlug}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default connector(withRegistrationInvite(RegistrationInviteManager));
