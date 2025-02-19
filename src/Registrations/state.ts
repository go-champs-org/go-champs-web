import { ApiRegistrationType } from '../Shared/httpClient/apiTypes';

export interface CustomFieldEntity {
  id: string;
  label: string;
  type: string;
}

export interface RegistrationEntity {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: ApiRegistrationType;
  autoApprove: boolean;
  customFields: CustomFieldEntity[];
}

export interface RegistrationState {
  isLoadingDeleteRegistration: boolean;
  isLoadingPatchRegistration: boolean;
  isLoadingPutRegistrationGenerateInvites: boolean;
  isLoadingPostRegistration: boolean;
  isLoadingRequestTournament: boolean;
  registrations: { [key: string]: RegistrationEntity };
}

export const initialState: RegistrationState = {
  isLoadingDeleteRegistration: false,
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
  customFields: []
};
