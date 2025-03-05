import React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { RouteProps } from './support/routerInterfaces';
import AuthenticatedRoute from '../Accounts/AuthenticatedRoute';
import RegistrationInvitesManager from './RegistrationInvitesManager';
import RegistrationInviteManager from './RegistrationInviteManger';

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

export default RegistrationInvitesRoot;
