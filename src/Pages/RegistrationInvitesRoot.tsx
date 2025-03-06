import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import AuthenticatedRoute from '../Accounts/AuthenticatedRoute';
import RegistrationInvitesManager from './RegistrationInvitesManager';
import RegistrationInviteManager from './RegistrationInviteManger';
import withRegistration from './support/withRegistration';
import { StoreState } from '../store';
import { bindActionCreators, Dispatch } from 'redux';
import { getTournamentBySlug } from '../Tournaments/effects';
import { getRegistration } from '../Registrations/effects';
import { connect } from 'react-redux';

const mapStateToProps = (state: StoreState) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getTournamentBySlug,
      getRegistration
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

function RegistrationInvitesRoot() {
  return (
    <Switch>
      <Route
        path={`/:organizationSlug/:tournamentSlug/RegistrationInvites/:registrationId/Invite/:inviteId`}
        render={(props: RouteComponentProps<RouteProps>) => (
          <AuthenticatedRoute>
            <RegistrationInviteManager {...props} />
          </AuthenticatedRoute>
        )}
      />
      <Route
        path={`/:organizationSlug/:tournamentSlug/RegistrationInvites/:registrationId`}
        render={(props: RouteComponentProps<RouteProps>) => (
          <AuthenticatedRoute>
            <RegistrationInvitesManager {...props} />
          </AuthenticatedRoute>
        )}
      />
    </Switch>
  );
}

export default connector(withRegistration(RegistrationInvitesRoot));
