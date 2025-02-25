import React, { useEffect, useState } from 'react';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import {
  DEFAULT_REGISTRATION_INVITE,
  RegistrationInvityEntity
} from '../Registrations/state';
import TeamRosterInviteResponseForm, {
  LoadingForm
} from '../Registrations/TeamRosterInviteResponseForm';
import { Form, FormRenderProps } from 'react-final-form';
import * as registrationInviteHttpClient from '../Registrations/registrationInviteHttpClient';
import { mapApiRegistrationInviteToRegistrationInviteEntity } from '../Registrations/dataMappers';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
import { mapApiTournamentToTournamentEntity } from '../Tournaments/dataMappers';

interface TeamRosteInvitesProps extends RouteComponentProps<RouteProps> {}

function TeamRosteInvites({ match }: TeamRosteInvitesProps) {
  const { inviteId } = match.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invite, setInvite] = useState<RegistrationInvityEntity>(
    DEFAULT_REGISTRATION_INVITE
  );
  const [tournament, setTournament] = useState<TournamentEntity>(
    DEFAULT_TOURNAMENT
  );

  useEffect(() => {
    const fetchInvite = async () => {
      if (!inviteId) return;

      const invite = await registrationInviteHttpClient.getForInvitePage(
        inviteId
      );
      setInvite(
        mapApiRegistrationInviteToRegistrationInviteEntity(invite.data)
      );
      setTournament(
        mapApiTournamentToTournamentEntity(
          invite.data.registration.tournament || DEFAULT_TOURNAMENT
        )
      );

      setIsLoading(false);
    };

    setIsLoading(true);
    fetchInvite();
  }, [inviteId]);

  console.log(invite);
  console.log(tournament);

  return (
    <div>
      {isLoading ? (
        <LoadingForm />
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
}

export default TeamRosteInvites;
