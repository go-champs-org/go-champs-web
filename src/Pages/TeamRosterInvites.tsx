import React, { useEffect, useState } from 'react';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import {
  DEFAULT_REGISTRATION_INVITE,
  DEFAULT_REGISTRATION_RESPONSE,
  RegistrationInvityEntity,
  RegistrationResponseEntity
} from '../Registrations/state';
import TeamRosterInviteResponseForm, {
  LoadingForm
} from '../Registrations/TeamRosterInviteResponseForm';
import { Form, FormRenderProps } from 'react-final-form';
import * as registrationInviteHttpClient from '../Registrations/registrationInviteHttpClient';
import * as registrationResponseHttpClient from '../Registrations/registrationResponseHttpClient';
import { mapApiRegistrationInviteToRegistrationInviteEntity } from '../Registrations/dataMappers';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
import { mapApiTournamentToTournamentEntity } from '../Tournaments/dataMappers';

interface TeamRosterInvitesProps extends RouteComponentProps<RouteProps> {}

function TeamRosterInvites({ match }: TeamRosterInvitesProps) {
  const { registrationInviteId } = match.params;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [invite, setInvite] = useState<RegistrationInvityEntity>(
    DEFAULT_REGISTRATION_INVITE
  );
  const [tournament, setTournament] = useState<TournamentEntity>(
    DEFAULT_TOURNAMENT
  );

  useEffect(() => {
    const fetchInvite = async () => {
      if (!registrationInviteId) return;

      const invite = await registrationInviteHttpClient.getForInvitePage(
        registrationInviteId
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
  }, [registrationInviteId]);

  const onSubmit = async (registrationResponse: RegistrationResponseEntity) => {
    debugger;
    console.log(registrationResponse);
    if (!registrationInviteId) return;

    try {
      const respost = await registrationResponseHttpClient.post(
        registrationResponse,
        registrationInviteId
      );
      console.log(respost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingForm />
      ) : (
        <>
          <h1>Bem-vinda à: {tournament.name}</h1>
          <Form
            onSubmit={onSubmit}
            initialValues={DEFAULT_REGISTRATION_RESPONSE}
            render={(props: FormRenderProps<RegistrationResponseEntity>) => (
              <TeamRosterInviteResponseForm {...props} />
            )}
          />
        </>
      )}
    </div>
  );
}

export default TeamRosterInvites;
