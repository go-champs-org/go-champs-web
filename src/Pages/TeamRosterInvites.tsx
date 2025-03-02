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
  LoadingForm,
  Success
} from '../Registrations/TeamRosterInviteResponseForm';
import { Form, FormRenderProps } from 'react-final-form';
import * as registrationInviteHttpClient from '../Registrations/registrationInviteHttpClient';
import * as registrationResponseHttpClient from '../Registrations/registrationResponseHttpClient';
import { mapApiRegistrationInviteToRegistrationInviteEntity } from '../Registrations/dataMappers';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
import { mapApiTournamentToTournamentEntity } from '../Tournaments/dataMappers';
import { Trans } from 'react-i18next';
import ApiError from '../Shared/httpClient/ApiError';
import { FORM_ERROR } from 'final-form';

interface TeamRosterInvitesProps extends RouteComponentProps<RouteProps> {}

function TeamRosterInvites({ match }: TeamRosterInvitesProps) {
  const { registrationInviteId } = match.params;
  const [invite, setInvite] = useState<RegistrationInvityEntity>(
    DEFAULT_REGISTRATION_INVITE
  );
  const [tournament, setTournament] = useState<TournamentEntity>(
    DEFAULT_TOURNAMENT
  );
  const [page, setPage] = useState<'loading' | 'form' | 'success'>('loading');

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

      setPage('form');
    };

    fetchInvite();
  }, [registrationInviteId]);

  const onSubmit = async (registrationResponse: RegistrationResponseEntity) => {
    if (!registrationInviteId) return;

    try {
      await registrationResponseHttpClient.post(
        registrationResponse,
        registrationInviteId
      );

      setPage('success');
    } catch (error) {
      if (error instanceof ApiError) {
        const responseErrors = error.payload.data.errors.response;
        return {
          response: {
            email: [responseErrors]
          },
          [FORM_ERROR]: {
            message: responseErrors
          }
        };
      } else {
        console.error('Unexpected Error:', error);
      }
    }
  };

  return (
    <div>
      {page === 'loading' && <LoadingForm />}
      {page === 'form' && (
        <div className="columns is-multiline">
          <div className="column is-12 has-text-centered">
            <h1 className="title">{tournament.name}</h1>
            <span className="subtitle">
              <Trans>registrationForm</Trans>
            </span>
            {invite.invitee && (
              <p>
                <Trans>team</Trans>: {invite.invitee.name}
              </p>
            )}
          </div>
          <div className="column is-12">
            <Form
              onSubmit={onSubmit}
              initialValues={DEFAULT_REGISTRATION_RESPONSE}
              render={(props: FormRenderProps<RegistrationResponseEntity>) => (
                <TeamRosterInviteResponseForm {...props} />
              )}
            />
          </div>
        </div>
      )}
      {page === 'success' && (
        <div className="columns is-multiline">
          <div className="column is-12 has-text-centered">
            <h1 className="title">{tournament.name}</h1>
            <span className="subtitle">
              <Trans>registrationForm</Trans>
            </span>
          </div>
          <div className="column is-12">
            <Success />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamRosterInvites;
