import {
  ApiRegistrationPatchRequest,
  ApiRegistrationPostRequest,
  ApiRegistration,
  ApiRegistrationInvite,
  ApiRegistrationResponseResourcePostRequest,
  ApiRegistrationType,
  ApiRegistrationResponseResourceWithDependencies,
  ApiRegistrationCustomField,
  ApiUploadFile,
  ApiRegistrationResponseResourcePutApproveRequest
} from '../Shared/httpClient/apiTypes';
import { FileReference } from '../Shared/UI/Form/FileUpload';
import { mapApiTeamToTeamEntity } from '../Teams/dataMappers';
import { TeamEntity } from '../Teams/state';
import {
  CustomFieldEntity,
  RegistrationEntity,
  RegistrationInviteEntity,
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
): RegistrationInviteEntity => {
  const invitee = mapApiInviteeToInviteeEntity(apiRegistrationInvite);
  return {
    id: apiRegistrationInvite.id,
    invitee,
    inviteeId: apiRegistrationInvite.invitee_id,
    inviteeType: apiRegistrationInvite.invitee_type,
    registrationResponses: apiRegistrationInvite.registration_responses
      ? apiRegistrationInvite.registration_responses.map(
          mapApiRegistrationResponseResourceResponseToRegistrationResponse
        )
      : []
  };
};

export const mapApiCustomFieldToCustomFieldEntity = (
  apiCustomField: ApiRegistrationCustomField
): CustomFieldEntity => {
  return {
    id: apiCustomField.id,
    label: apiCustomField.label,
    description: apiCustomField.description ? apiCustomField.description : '',
    type: apiCustomField.type,
    required: apiCustomField.required,
    properties: apiCustomField.properties ? apiCustomField.properties : {}
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
      ? apiRegistration.custom_fields.map(mapApiCustomFieldToCustomFieldEntity)
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
  registrationInvite: RegistrationInviteEntity
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

export const mapRegistrationResponseEntitiesToApiRegistrationResponseResourcePutApproveRequest = (
  registrationResponses: RegistrationResponseEntity[]
): ApiRegistrationResponseResourcePutApproveRequest => {
  return {
    registration_responses: registrationResponses.map(response => response.id)
  };
};

export const mapApiRegistrationResponseResourceResponseToRegistrationResponse = (
  apiRegistrationResponse: ApiRegistrationResponseResourceWithDependencies
): RegistrationResponseEntity => {
  return {
    id: apiRegistrationResponse.id ? apiRegistrationResponse.id : '',
    registrationInviteId: apiRegistrationResponse.registration_invite_id,
    response: apiRegistrationResponse.response,
    status: apiRegistrationResponse.status
  };
};

export const parseRegistrationResponseFor = (
  type: ApiRegistrationType,
  registrationResponse: RegistrationResponseEntity
) => {
  switch (type) {
    case 'team_roster_invites':
      return {
        name: registrationResponse.response.name,
        email: registrationResponse.response.email,
        shirtName: registrationResponse.response.shirt_name,
        shirtNumber: registrationResponse.response.shirt_number
      };
    default:
      return {
        name: '',
        email: '',
        shirtName: '',
        shirtNumber: ''
      };
  }
};

export const mapApiFileReferenceToFileReference = (
  apiFileReference: ApiUploadFile
): FileReference => {
  return {
    filename: apiFileReference.filename,
    url: apiFileReference.url,
    publicUrl: apiFileReference.public_url
  };
};

export const mapFileReferenceToApiFileReference = (
  fileReference: FileReference
): ApiUploadFile => {
  return {
    filename: fileReference.filename,
    public_url: fileReference.publicUrl,
    url: fileReference.url
  };
};
