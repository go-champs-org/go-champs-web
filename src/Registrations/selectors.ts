import {
  DEFAULT_REGISTRATION,
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

export const registrationsLoading = (state: RegistrationState) =>
  state.isLoadingRequestTournament;
export const patchingRegistration = (state: RegistrationState): boolean =>
  state.isLoadingPatchRegistration;
export const puttingRegistrationGenerateInvites = (state: RegistrationState) =>
  state.isLoadingPutRegistrationGenerateInvites;
export const postingRegistration = (state: RegistrationState): boolean =>
  state.isLoadingPostRegistration;
export const deletingRegistration = (state: RegistrationState): boolean =>
  state.isLoadingDeleteRegistration;
