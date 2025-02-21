import {
  ApiRegistrationInviteeType,
  ApiRegistrationType
} from '../Shared/httpClient/apiTypes';

export interface CustomFieldEntity {
  id: string;
  label: string;
  type: string;
}

export interface RegistrationInvityEntity {
  id: string;
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
  registrationInvites: RegistrationInvityEntity[];
}

export interface RegistrationState {
  isLoadingDeleteRegistration: boolean;
  isGetLoadingRegistration: boolean;
  isLoadingPatchRegistration: boolean;
  isLoadingPutRegistrationGenerateInvites: boolean;
  isLoadingPostRegistration: boolean;
  isLoadingRequestTournament: boolean;
  registrations: { [key: string]: RegistrationEntity };
}

export const initialState: RegistrationState = {
  isLoadingDeleteRegistration: false,
  isGetLoadingRegistration: false,
  isLoadingPatchRegistration: false,
  isLoadingPutRegistrationGenerateInvites: false,
  isLoadingPostRegistration: false,
  isLoadingRequestTournament: false,
  registrations: {}
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

export const DEFAULT_REGISTRATION_INVITE: RegistrationInvityEntity = {
  id: '',
  inviteeId: '',
  inviteeType: 'team'
};
