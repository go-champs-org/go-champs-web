import {
  ApiRegistrationPatchRequest,
  ApiRegistrationPostRequest,
  ApiRegistration,
  ApiRegistrationInvite
} from '../Shared/httpClient/apiTypes';
import { RegistrationEntity, RegistrationInvityEntity } from './state';

export const mapApiRegistrationInviteToRegistrationInviteEntity = (
  apiRegistrationInvite: ApiRegistrationInvite
) => {
  return {
    id: apiRegistrationInvite.id,
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
