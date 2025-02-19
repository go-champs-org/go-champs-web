import {
  ApiRegistration,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import {
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
  POST_REGISTRATION,
  POST_REGISTRATION_FAILURE,
  POST_REGISTRATION_SUCCESS
} from './actions';
import { mapApiRegistrationToRegistrationEntity } from './dataMappers';
import { initialState, RegistrationEntity, RegistrationState } from './state';

const registrationMapEntities = mapEntities<RegistrationEntity>(
  returnProperty('id')
);

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
    ? action.payload!.registrations.reduce(apiRegistrationToEntities, {})
    : {}
});

export default createReducer(initialState, {
  [DELETE_REGISTRATION]: deleteRegistration,
  [DELETE_REGISTRATION_FAILURE]: deleteRegistrationFailure,
  [DELETE_REGISTRATION_SUCCESS]: deleteRegistrationSuccess,
  [PATCH_REGISTRATION]: patchRegistration,
  [PATCH_REGISTRATION_FAILURE]: patchRegistrationFailure,
  [PATCH_REGISTRATION_SUCCESS]: patchRegistrationSuccess,
  [POST_REGISTRATION]: postRegistration,
  [POST_REGISTRATION_FAILURE]: postRegistrationFailure,
  [POST_REGISTRATION_SUCCESS]: postRegistrationSuccess,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
