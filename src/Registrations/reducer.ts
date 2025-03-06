import {
  ApiRegistration,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntities,
  apiDataToEntitiesOverride,
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import {
  ActionTypes,
  DELETE_REGISTRATION,
  DELETE_REGISTRATION_FAILURE,
  DELETE_REGISTRATION_SUCCESS,
  PATCH_REGISTRATION,
  PATCH_REGISTRATION_FAILURE,
  PATCH_REGISTRATION_SUCCESS,
  PUT_REGISTRATION_GENERATE_INVITES,
  PUT_REGISTRATION_GENERATE_INVITES_FAILURE,
  PUT_REGISTRATION_GENERATE_INVITES_SUCCESS,
  POST_REGISTRATION,
  POST_REGISTRATION_FAILURE,
  POST_REGISTRATION_SUCCESS,
  GET_REGISTRATION,
  GET_REGISTRATION_FAILURE,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_INVITE,
  GET_REGISTRATION_INVITE_FAILURE,
  GET_REGISTRATION_INVITE_SUCCESS
} from './actions';
import { mapApiRegistrationToRegistrationEntity } from './dataMappers';
import {
  initialState,
  RegistrationEntity,
  RegistrationInviteEntity,
  RegistrationState
} from './state';

const registrationMapEntities = mapEntities<RegistrationEntity>(
  returnProperty('id')
);

const registrationInviteMapEntities = mapEntities<RegistrationInviteEntity>(
  returnProperty('id')
);

const apiPhaseToEntities = apiDataToEntities<
  ApiRegistration,
  RegistrationEntity
>(mapApiRegistrationToRegistrationEntity, returnProperty('id'));

const apiRegistrationToEntities = apiDataToEntitiesOverride<
  ApiRegistration,
  RegistrationEntity
>(mapApiRegistrationToRegistrationEntity, returnProperty('id'));

const deleteRegistration = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteRegistration: true
});

const deleteRegistrationFailure = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteRegistration: false
});

const deleteRegistrationSuccess = (
  state: RegistrationState,
  action: HttpAction<ActionTypes, string>
) => {
  const registrations = Object.keys(state.registrations)
    .filter(entityById(state.registrations, action.payload!))
    .reduce(mapEntitiesByKey(state.registrations), {});
  return {
    ...state,
    registrations,
    isLoadingDeleteRegistration: false
  };
};

const getRegistration = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isGetLoadingRegistration: true
});

const getRegistrationSuccess = (
  state: RegistrationState,
  action: HttpAction<ActionTypes, RegistrationEntity>
) => ({
  ...state,
  isGetLoadingRegistration: false,
  registrations: [action.payload!].reduce(
    registrationMapEntities,
    state.registrations
  )
});

const getRegistrationFailure = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isGetLoadingRegistration: false
});

const getRegistrationInvite = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingGetRegistrationInvite: true
});

const getRegistrationInviteFailure = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingGetRegistrationInvite: false
});

const getRegistrationInviteSuccess = (
  state: RegistrationState,
  action: HttpAction<ActionTypes, RegistrationInviteEntity>
) => ({
  ...state,
  isLoadingGetRegistrationInvite: false,
  registrationsInvites: [action.payload!].reduce(
    registrationInviteMapEntities,
    state.registrationsInvites
  )
});

const patchRegistration = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchRegistration: true
});

const patchRegistrationFailure = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchRegistration: false
});

const patchRegistrationSuccess = (
  state: RegistrationState,
  action: HttpAction<ActionTypes, RegistrationEntity>
) => ({
  ...state,
  isLoadingPatchRegistration: false,
  registrations: [action.payload!].reduce(
    registrationMapEntities,
    state.registrations
  )
});

const putRegistrationGenerateInvites = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPutRegistrationGenerateInvites: true
});

const putRegistrationGenerateInvitesFailure = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPutRegistrationGenerateInvites: false
});

const putRegistrationGenerateInvitesSuccess = (
  state: RegistrationState,
  action: HttpAction<ActionTypes, RegistrationEntity>
) => ({
  ...state,
  isLoadingPutRegistrationGenerateInvites: false,
  registrations: [action.payload!].reduce(
    registrationMapEntities,
    state.registrations
  )
});

const postRegistration = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostRegistration: true
});

const postRegistrationFailure = (
  state: RegistrationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostRegistration: false
});

const postRegistrationSuccess = (
  state: RegistrationState,
  action: HttpAction<ActionTypes, ApiRegistration>
) => ({
  ...state,
  isLoadingPostRegistration: false,
  registrations: [action.payload!].reduce(
    apiRegistrationToEntities,
    state.registrations
  )
});

const getTournamentSuccess = (
  state: RegistrationState,
  action: HttpAction<ActionTypes, ApiTournamentWithDependecies>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  registrations: action.payload!.registrations
    ? action.payload!.registrations.reduce(
        apiPhaseToEntities(state.registrations),
        {}
      )
    : {}
});

export default createReducer(initialState, {
  [DELETE_REGISTRATION]: deleteRegistration,
  [DELETE_REGISTRATION_FAILURE]: deleteRegistrationFailure,
  [DELETE_REGISTRATION_SUCCESS]: deleteRegistrationSuccess,
  [GET_REGISTRATION]: getRegistration,
  [GET_REGISTRATION_FAILURE]: getRegistrationFailure,
  [GET_REGISTRATION_SUCCESS]: getRegistrationSuccess,
  [GET_REGISTRATION_INVITE]: getRegistrationInvite,
  [GET_REGISTRATION_INVITE_FAILURE]: getRegistrationInviteFailure,
  [GET_REGISTRATION_INVITE_SUCCESS]: getRegistrationInviteSuccess,
  [PATCH_REGISTRATION]: patchRegistration,
  [PATCH_REGISTRATION_FAILURE]: patchRegistrationFailure,
  [PATCH_REGISTRATION_SUCCESS]: patchRegistrationSuccess,
  [PUT_REGISTRATION_GENERATE_INVITES]: putRegistrationGenerateInvites,
  [PUT_REGISTRATION_GENERATE_INVITES_FAILURE]: putRegistrationGenerateInvitesFailure,
  [PUT_REGISTRATION_GENERATE_INVITES_SUCCESS]: putRegistrationGenerateInvitesSuccess,
  [POST_REGISTRATION]: postRegistration,
  [POST_REGISTRATION_FAILURE]: postRegistrationFailure,
  [POST_REGISTRATION_SUCCESS]: postRegistrationSuccess,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
