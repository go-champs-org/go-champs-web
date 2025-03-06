import {
  ApiRegistrationInviteeType,
  ApiRegistrationType
} from '../Shared/httpClient/apiTypes';
import { TeamEntity } from '../Teams/state';

export type CustomFieldType = 'date' | 'datetime' | 'text';

export interface CustomFieldEntity {
  id: string;
  label: string;
  description: string;
  type: CustomFieldType;
}

export interface RegistrationResponseEntity {
  id: string;
  registrationInviteId: string;
  response: object;
}

export interface RegistrationInviteEntity {
  id: string;
  invitee: TeamEntity | null;
  inviteeId: string;
  inviteeType: ApiRegistrationInviteeType;
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
  description: ''
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
  inviteeType: 'team'
};

export const DEFAULT_REGISTRATION_RESPONSE: RegistrationResponseEntity = {
  id: '',
  registrationInviteId: '',
  response: {}
};

export const CUSTOM_FIELDS_TYPE_OPTIONS: {
  label: string;
  value: CustomFieldType;
}[] = [
  { label: 'Text', value: 'text' },
  { label: 'Date', value: 'date' },
  { label: 'Date/time', value: 'datetime' }
];
