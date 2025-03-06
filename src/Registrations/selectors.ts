import {
  DEFAULT_REGISTRATION,
  DEFAULT_REGISTRATION_INVITE,
  RegistrationEntity,
  RegistrationState
} from './state';

export const registrations = (
  state: RegistrationState
): RegistrationEntity[] => {
  return Object.keys(state.registrations).map((key: string) => {
    const currentRegistration = state.registrations[key];

    return currentRegistration;
  });
};

export const registrationById = (
  state: RegistrationState,
  registrationId?: string
): RegistrationEntity => {
  if (!registrationId || !state.registrations[registrationId]) {
    return DEFAULT_REGISTRATION;
  }

  return state.registrations[registrationId];
};

export const registrationInviteById = (
  state: RegistrationState,
  inviteId?: string
) => {
  if (!inviteId || !state.registrationsInvites[inviteId]) {
    return DEFAULT_REGISTRATION_INVITE;
  }

  return state.registrationsInvites[inviteId];
};

export const registrationsLoading = (state: RegistrationState) =>
  state.isLoadingRequestTournament;
export const gettingRegistration = (state: RegistrationState): boolean =>
  state.isGetLoadingRegistration;
export const gettingRegistrationInvite = (state: RegistrationState): boolean =>
  state.isLoadingGetRegistrationInvite;
export const patchingRegistration = (state: RegistrationState): boolean =>
  state.isLoadingPatchRegistration;
export const puttingRegistrationGenerateInvites = (state: RegistrationState) =>
  state.isLoadingPutRegistrationGenerateInvites;
export const postingRegistration = (state: RegistrationState): boolean =>
  state.isLoadingPostRegistration;
export const deletingRegistration = (state: RegistrationState): boolean =>
  state.isLoadingDeleteRegistration;
