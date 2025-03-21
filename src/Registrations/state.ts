import {
  ApiCustomFieldType,
  ApiRegistrationInviteeType,
  ApiRegistrationResponseResponse,
  ApiRegistrationResponseStatus,
  ApiRegistrationType
} from '../Shared/httpClient/apiTypes';
import { TeamEntity } from '../Teams/state';

export interface CustomFieldEntity {
  id: string;
  label: string;
  description: string;
  required: boolean;
  properties: object;
  type: ApiCustomFieldType;
}

export interface RegistrationResponseEntity {
  id: string;
  registrationInviteId: string;
  response: ApiRegistrationResponseResponse;
  status: ApiRegistrationResponseStatus;
}

export interface RegistrationInviteEntity {
  id: string;
  invitee: TeamEntity | null;
  inviteeId: string;
  inviteeType: ApiRegistrationInviteeType;
  registrationResponses: RegistrationResponseEntity[];
}

export interface RegistrationEntity {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: ApiRegistrationType;
  autoApprove: boolean;
  customFields: CustomFieldEntity[];
  registrationInvites: RegistrationInviteEntity[];
}

export interface RegistrationState {
  isLoadingDeleteRegistration: boolean;
  isGetLoadingRegistration: boolean;
  isLoadingGetRegistrationInvite: boolean;
  isLoadingPatchRegistration: boolean;
  isLoadingPutRegistrationGenerateInvites: boolean;
  isLoadingPostRegistration: boolean;
  isLoadingRegistrationResponseApprove: boolean;
  isLoadingRequestTournament: boolean;
  registrations: { [key: string]: RegistrationEntity };
  registrationsInvites: { [key: string]: RegistrationInviteEntity };
}

export const initialState: RegistrationState = {
  isLoadingDeleteRegistration: false,
  isGetLoadingRegistration: false,
  isLoadingGetRegistrationInvite: false,
  isLoadingPatchRegistration: false,
  isLoadingPutRegistrationGenerateInvites: false,
  isLoadingPostRegistration: false,
  isLoadingRequestTournament: false,
  registrations: {},
  registrationsInvites: {}
};

export const DEFAULT_CUSTOM_FIELD: CustomFieldEntity = {
  id: '',
  label: '',
  type: 'text',
  description: '',
  required: false,
  properties: {}
};

export const DEFAULT_REGISTRATION: RegistrationEntity = {
  id: '',
  title: '',
  startDate: '',
  endDate: '',
  type: 'team_roster_invites',
  autoApprove: false,
  customFields: [],
  registrationInvites: []
};

export const DEFAULT_REGISTRATION_INVITE: RegistrationInviteEntity = {
  id: '',
  invitee: null,
  inviteeId: '',
  inviteeType: 'team',
  registrationResponses: []
};

export const DEFAULT_REGISTRATION_RESPONSE: RegistrationResponseEntity = {
  id: '',
  registrationInviteId: '',
  response: {},
  status: 'pending'
};

export const CUSTOM_FIELDS_TYPE_OPTIONS: {
  label: string;
  value: ApiCustomFieldType;
}[] = [
  { label: 'Text', value: 'text' },
  { label: 'Date', value: 'date' },
  { label: 'Date/time', value: 'datetime' },
  { label: 'Consent', value: 'consent' }
];
