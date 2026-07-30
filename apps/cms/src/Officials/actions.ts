import { OfficialEntity } from './state';

export enum ActionTypes {
  DELETE_OFFICIAL_FAILURE = 'DELETE_OFFICIAL_FAILURE',
  DELETE_OFFICIAL_START = 'DELETE_OFFICIAL_START',
  DELETE_OFFICIAL_SUCCESS = 'DELETE_OFFICIAL_SUCCESS',
  PATCH_OFFICIAL_FAILURE = 'PATCH_OFFICIAL_FAILURE',
  PATCH_OFFICIAL_START = 'PATCH_OFFICIAL_START',
  PATCH_OFFICIAL_SUCCESS = 'PATCH_OFFICIAL_SUCCESS',
  POST_OFFICIAL_FAILURE = 'POST_OFFICIAL_FAILURE',
  POST_OFFICIAL_START = 'POST_OFFICIAL_START',
  POST_OFFICIAL_SUCCESS = 'POST_OFFICIAL_SUCCESS'
}

export const deleteOfficialFailure = (payload: unknown) => ({
  type: ActionTypes.DELETE_OFFICIAL_FAILURE,
  payload
});

export const deleteOfficialStart = () => ({
  type: ActionTypes.DELETE_OFFICIAL_START
});

export const deleteOfficialSuccess = (payload: string) => ({
  type: ActionTypes.DELETE_OFFICIAL_SUCCESS,
  payload
});

export const patchOfficialFailure = (payload: unknown) => ({
  type: ActionTypes.PATCH_OFFICIAL_FAILURE,
  payload
});

export const patchOfficialStart = () => ({
  type: ActionTypes.PATCH_OFFICIAL_START
});

export const patchOfficialSuccess = (payload: OfficialEntity) => ({
  type: ActionTypes.PATCH_OFFICIAL_SUCCESS,
  payload
});

export const postOfficialFailure = (payload: unknown) => ({
  type: ActionTypes.POST_OFFICIAL_FAILURE,
  payload
});

export const postOfficialStart = () => ({
  type: ActionTypes.POST_OFFICIAL_START
});

export const postOfficialSuccess = (payload: OfficialEntity) => ({
  type: ActionTypes.POST_OFFICIAL_SUCCESS,
  payload
});
