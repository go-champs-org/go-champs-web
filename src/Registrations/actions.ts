import { ApiRegistration } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import { RegistrationEntity } from './state';

export const DELETE_REGISTRATION = 'API_DELETE_REGISTRATION';
export const DELETE_REGISTRATION_SUCCESS = 'API_DELETE_REGISTRATION_SUCCESS';
export const DELETE_REGISTRATION_FAILURE = 'API_DELETE_REGISTRATION_FAILURE';
export const PUT_REGISTRATION_GENERATE_INVITES =
  'API_PUT_REGISTRATION_GENERATE_INVITES';
export const PUT_REGISTRATION_GENERATE_INVITES_SUCCESS =
  'API_PUT_REGISTRATION_GENERATE_INVITES_SUCCESS';
export const PUT_REGISTRATION_GENERATE_INVITES_FAILURE =
  'API_PUT_REGISTRATION_GENERATE_INVITES_FAILURE';
export const PATCH_REGISTRATION = 'API_PATCH_REGISTRATION';
export const PATCH_REGISTRATION_SUCCESS = 'API_PATCH_REGISTRATION_SUCCESS';
export const PATCH_REGISTRATION_FAILURE = 'API_PATCH_REGISTRATION_FAILURE';
export const POST_REGISTRATION = 'API_POST_REGISTRATION';
export const POST_REGISTRATION_SUCCESS = 'API_POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_FAILURE = 'API_POST_REGISTRATION_FAILURE';

export const deleteRegistrationStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_REGISTRATION
});

export const deleteRegistrationSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_REGISTRATION_SUCCESS,
  payload
});

export const deleteRegistrationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_REGISTRATION_FAILURE,
  payload
});

export const patchRegistrationStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_REGISTRATION
});

export const patchRegistrationSuccess = (
  payload: RegistrationEntity
): HttpAction<ActionTypes, ApiRegistration> => ({
  type: PATCH_REGISTRATION_SUCCESS,
  payload
});

export const patchRegistrationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_REGISTRATION_FAILURE,
  payload
});

export const putRegistrationGenerateInvitesStart = (): HttpAction<ActionTypes> => ({
  type: PUT_REGISTRATION_GENERATE_INVITES
});

export const putRegistrationGenerateInvitesSuccess = (
  payload: RegistrationEntity
): HttpAction<ActionTypes, ApiRegistration> => ({
  type: PUT_REGISTRATION_GENERATE_INVITES_SUCCESS,
  payload
});

export const putRegistrationGenerateInvitesFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PUT_REGISTRATION_GENERATE_INVITES_FAILURE,
  payload
});

export const postRegistrationStart = (): HttpAction<ActionTypes> => ({
  type: POST_REGISTRATION
});

export const postRegistrationSuccess = (
  payload: RegistrationEntity
): HttpAction<ActionTypes, ApiRegistration> => ({
  type: POST_REGISTRATION_SUCCESS,
  payload
});

export const postRegistrationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_REGISTRATION_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_REGISTRATION
  | typeof DELETE_REGISTRATION_SUCCESS
  | typeof DELETE_REGISTRATION_FAILURE
  | typeof PATCH_REGISTRATION
  | typeof PATCH_REGISTRATION_SUCCESS
  | typeof PATCH_REGISTRATION_FAILURE
  | typeof PUT_REGISTRATION_GENERATE_INVITES
  | typeof PUT_REGISTRATION_GENERATE_INVITES_SUCCESS
  | typeof PUT_REGISTRATION_GENERATE_INVITES_FAILURE
  | typeof POST_REGISTRATION
  | typeof POST_REGISTRATION_SUCCESS
  | typeof POST_REGISTRATION_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
