import React, { useEffect, useState } from 'react';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import {
  DEFAULT_REGISTRATION_INVITE,
  RegistrationInvityEntity
} from '../Registrations/state';
import TeamRosterInviteResponseForm from '../Registrations/TeamRosterInviteResponseForm';
import { Form, FormRenderProps } from 'react-final-form';

interface TeamRosteInvitesProps extends RouteComponentProps<RouteProps> {}

const TeamRosteInvites = ({ match }: TeamRosteInvitesProps) => {
  const { inviteId } = match.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invite, setInvite] = useState<RegistrationInvityEntity>(
    DEFAULT_REGISTRATION_INVITE
  );

  useEffect(() => {
    console.log('Invite ID:', inviteId);
    setIsLoading(false);
  }, [inviteId]);

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Form
          onSubmit={() => {}}
          initialValues={invite}
          render={(props: FormRenderProps<RegistrationInvityEntity>) => (
            <TeamRosterInviteResponseForm />
          )}
        />
      )}
    </div>
  );
};

export default TeamRosteInvites;
