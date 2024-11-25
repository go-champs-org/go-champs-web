import { HttpAction } from '../Shared/store/interfaces';
import { SportEntity } from './state';

export const GET_SPORT = 'API_GET_SPORT';
export const GET_SPORT_SUCCESS = 'API_GET_SPORT_SUCCESS';
export const GET_SPORT_FAILURE = 'API_GET_SPORT_FAILURE';
export const GET_SPORTS = 'API_GET_SPORTS';
export const GET_SPORTS_SUCCESS = 'API_GET_SPORTS_SUCCESS';
export const GET_SPORTS_FAILURE = 'API_GET_SPORTS_FAILURE';

export const getSportStart = (): HttpAction<ActionTypes> => ({
  type: GET_SPORT
});

export const getSportSuccess = (
  payload: SportEntity
): HttpAction<ActionTypes, SportEntity> => ({
  type: GET_SPORT_SUCCESS,
  payload
});

export const getSportFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: GET_SPORT_FAILURE,
  payload
});

export const getSportsStart = (): HttpAction<ActionTypes> => ({
  type: GET_SPORTS
});

export const getSportsSuccess = (
  payload: SportEntity[]
): HttpAction<ActionTypes, SportEntity[]> => ({
  type: GET_SPORTS_SUCCESS,
  payload
});

export const getSportsFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: GET_SPORTS_FAILURE,
  payload
});

export type ActionTypes =
  | typeof GET_SPORT
  | typeof GET_SPORT_FAILURE
  | typeof GET_SPORT_SUCCESS
  | typeof GET_SPORTS
  | typeof GET_SPORTS_FAILURE
  | typeof GET_SPORTS_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
