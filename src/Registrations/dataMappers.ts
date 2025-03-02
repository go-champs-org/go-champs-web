import {
  ApiRegistrationPatchRequest,
  ApiRegistrationPostRequest,
  ApiRegistration,
  ApiRegistrationInvite,
  ApiRegistrationResponseResourcePostRequest
} from '../Shared/httpClient/apiTypes';
import { mapApiTeamToTeamEntity } from '../Teams/dataMappers';
import { TeamEntity } from '../Teams/state';
import {
  RegistrationEntity,
  RegistrationInvityEntity,
  RegistrationResponseEntity
} from './state';

export const mapApiInviteeToInviteeEntity = (
  apiRegistrationInvite: ApiRegistrationInvite
): TeamEntity | null => {
  switch (apiRegistrationInvite.invitee_type) {
    case 'team':
      if (!apiRegistrationInvite.invitee) {
        return null;
      }

      return mapApiTeamToTeamEntity(apiRegistrationInvite.invitee);
    default:
      return null;
  }
};

export const mapApiRegistrationInviteToRegistrationInviteEntity = (
  apiRegistrationInvite: ApiRegistrationInvite
): RegistrationInvityEntity => {
  const invitee = mapApiInviteeToInviteeEntity(apiRegistrationInvite);
  return {
    id: apiRegistrationInvite.id,
    invitee,
    inviteeId: apiRegistrationInvite.invitee_id,
    inviteeType: apiRegistrationInvite.invitee_type
  };
};

export const mapApiRegistrationToRegistrationEntity = (
  apiRegistration: ApiRegistration
): RegistrationEntity => {
  return {
    id: apiRegistration.id,
    title: apiRegistration.title,
    startDate: apiRegistration.start_date ? apiRegistration.start_date : '',
    endDate: apiRegistration.end_date ? apiRegistration.end_date : '',
    type: apiRegistration.type,
    autoApprove: apiRegistration.auto_approve
      ? apiRegistration.auto_approve
      : false,
    customFields: apiRegistration.custom_fields
      ? apiRegistration.custom_fields
      : [],
    registrationInvites: apiRegistration.registration_invites
      ? apiRegistration.registration_invites.map(
          mapApiRegistrationInviteToRegistrationInviteEntity
        )
      : []
  };
};

export const mapRegistrationEntityToApiRegistrationPostRequest = (
  registration: RegistrationEntity,
  tournamentId: string
): ApiRegistrationPostRequest => {
  return {
    registration: {
      id: registration.id,
      tournament_id: tournamentId,
      title: registration.title,
      start_date: registration.startDate && registration.startDate,
      end_date: registration.endDate && registration.endDate,
      type: registration.type,
      auto_approve: registration.autoApprove,
      custom_fields:
        registration.customFields.length > 0 ? registration.customFields : []
    }
  };
};

export const mapRegistrationEntityToApiRegistrationPatchRequest = (
  registration: RegistrationEntity
): ApiRegistrationPatchRequest => {
  return {
    registration: {
      id: registration.id,
      title: registration.title,
      start_date: registration.startDate && registration.startDate,
      end_date: registration.endDate && registration.endDate,
      type: registration.type,
      auto_approve: registration.autoApprove,
      custom_fields:
        registration.customFields.length > 0 ? registration.customFields : []
    }
  };
};

export const mapRegistrationInviteUrl = (
  registrationInvite: RegistrationInvityEntity
) => {
  const goChampsHost = window.location.origin;
  return `${goChampsHost}/Invite/${registrationInvite.id}`;
};

export const mapRegistrationResponseEntityToApiRegistrationResponseResourceRequest = (
  registrationResponse: RegistrationResponseEntity,
  registrationInviteId: string
): ApiRegistrationResponseResourcePostRequest => {
  return {
    registration_response: {
      registration_invite_id: registrationInviteId,
      response: registrationResponse.response
    }
  };
};

export const mapApiRegistrationResponseResourceResponseToRegistrationResponse = (
  apiRegistrationResponse: ApiRegistrationResponseResourceRequest
): RegistrationResponseEntity => {
  return {
    id: apiRegistrationResponse.id,
    registrationInviteId: apiRegistrationResponse.registration_invite_id,
    response: apiRegistrationResponse.response
  };
};
