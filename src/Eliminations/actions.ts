import { HttpAction } from '../Shared/store/interfaces';
import { EliminationEntity } from './state';

export const DELETE_ELIMINATION = 'API_DELETE_ELIMINATION';
export const DELETE_ELIMINATION_SUCCESS = 'API_DELETE_ELIMINATION_SUCCESS';
export const DELETE_ELIMINATION_FAILURE = 'API_DELETE_ELIMINATION_FAILURE';
export const PATCH_ELIMINATION = 'API_PATCH_ELIMINATION';
export const PATCH_ELIMINATION_SUCCESS = 'API_PATCH_ELIMINATION_SUCCESS';
export const PATCH_ELIMINATION_FAILURE = 'API_PATCH_ELIMINATION_FAILURE';
export const POST_ELIMINATION = 'API_POST_ELIMINATION';
export const POST_ELIMINATION_SUCCESS = 'API_POST_ELIMINATION_SUCCESS';
export const POST_ELIMINATION_FAILURE = 'API_POST_ELIMINATION_FAILURE';

export const deleteEliminationStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_ELIMINATION
});

export const deleteEliminationSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_ELIMINATION_SUCCESS,
  payload
});

export const deleteEliminationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_ELIMINATION_FAILURE,
  payload
});

export const patchEliminationStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_ELIMINATION
});

export const patchEliminationSuccess = (
  payload: EliminationEntity
): HttpAction<ActionTypes, EliminationEntity> => ({
  type: PATCH_ELIMINATION_SUCCESS,
  payload
});

export const patchEliminationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_ELIMINATION_FAILURE,
  payload
});

export const postEliminationStart = (): HttpAction<ActionTypes> => ({
  type: POST_ELIMINATION
});

export const postEliminationSuccess = (
  payload: EliminationEntity
): HttpAction<ActionTypes, EliminationEntity> => ({
  type: POST_ELIMINATION_SUCCESS,
  payload
});

export const postEliminationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_ELIMINATION_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_ELIMINATION
  | typeof DELETE_ELIMINATION_SUCCESS
  | typeof DELETE_ELIMINATION_FAILURE
  | typeof PATCH_ELIMINATION
  | typeof PATCH_ELIMINATION_SUCCESS
  | typeof PATCH_ELIMINATION_FAILURE
  | typeof POST_ELIMINATION
  | typeof POST_ELIMINATION_SUCCESS
  | typeof POST_ELIMINATION_FAILURE;
export type Actions = HttpAction<ActionTypes>;
