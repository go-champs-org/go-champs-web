import React, { useEffect, useState } from 'react';
import { RouteProps } from './support/routerInterfaces';
import { RouteComponentProps } from 'react-router-dom';
import {
  DEFAULT_REGISTRATION,
  DEFAULT_REGISTRATION_INVITE,
  DEFAULT_REGISTRATION_RESPONSE,
  RegistrationEntity,
  RegistrationInviteEntity,
  RegistrationResponseEntity
} from '../Registrations/state';
import TeamRosterInviteResponseForm, {
  LoadingForm,
  Success
} from '../Registrations/TeamRosterInviteResponseForm';
import { Form, FormRenderProps } from 'react-final-form';
import registrationInviteHttpClient from '../Registrations/registrationInviteHttpClient';
import registrationResponseHttpClient from '../Registrations/registrationResponseHttpClient';
import {
  mapApiRegistrationInviteToRegistrationInviteEntity,
  mapApiRegistrationToRegistrationEntity
} from '../Registrations/dataMappers';
import { DEFAULT_TOURNAMENT, TournamentEntity } from '../Tournaments/state';
import { mapApiTournamentToTournamentEntity } from '../Tournaments/dataMappers';
import { Trans } from 'react-i18next';
import ApiError from '../Shared/httpClient/ApiError';
import { FORM_ERROR } from 'final-form';

interface TeamRosterInvitesProps extends RouteComponentProps<RouteProps> {}

function TeamRosterInvites({ match }: TeamRosterInvitesProps) {
  const { registrationInviteId } = match.params;
  const [invite, setInvite] = useState<RegistrationInviteEntity>(
    DEFAULT_REGISTRATION_INVITE
  );
  const [registration, setRegistration] = useState<RegistrationEntity>(
    DEFAULT_REGISTRATION
  );
  const [tournament, setTournament] = useState<TournamentEntity>(
    DEFAULT_TOURNAMENT
  );
  const [page, setPage] = useState<'loading' | 'form' | 'success'>('loading');
  const [
    submittedResponse,
    setSubmittedResponse
  ] = useState<RegistrationResponseEntity | null>(null);

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
      setRegistration(
        mapApiRegistrationToRegistrationEntity(invite.data.registration)
      );

      setPage('form');
    };

    fetchInvite();
  }, [registrationInviteId]);

  const onSubmit = async (registrationResponse: RegistrationResponseEntity) => {
    if (!registrationInviteId) return;

    try {
      const response = await registrationResponseHttpClient.post(
        registrationResponse,
        registrationInviteId
      );
      setSubmittedResponse(response);

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
                <TeamRosterInviteResponseForm
                  {...props}
                  registration={registration}
                />
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
            <Success
              submittedResponse={
                submittedResponse || DEFAULT_REGISTRATION_RESPONSE
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamRosterInvites;
