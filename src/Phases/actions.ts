import { displayToast } from '../Shared/bulma/toast';
import { ApiPhase } from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';
import {
  GET_TOURNAMENT,
  GET_TOURNAMENT_FAILURE,
  GET_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import phaseHttpClient from './phaseHttpClient';
import { PhaseEntity } from './state';

export const DELETE_TOURNAMENT_PHASE = 'API_DELETE_TOURNAMENT_PHASE';
export const DELETE_TOURNAMENT_PHASE_SUCCESS =
  'API_DELETE_TOURNAMENT_PHASE_SUCCESS';
export const DELETE_TOURNAMENT_PHASE_FAILURE =
  'API_DELETE_TOURNAMENT_PHASE_FAILURE';
export const PATCH_TOURNAMENT_PHASE = 'API_PATCH_TOURNAMENT_PHASE';
export const PATCH_TOURNAMENT_PHASE_SUCCESS =
  'API_PATCH_TOURNAMENT_PHASE_SUCCESS';
export const PATCH_TOURNAMENT_PHASE_FAILURE =
  'API_PATCH_TOURNAMENT_PHASE_FAILURE';
export const POST_TOURNAMENT_PHASE = 'API_POST_TOURNAMENT_PHASE';
export const POST_TOURNAMENT_PHASE_SUCCESS =
  'API_POST_TOURNAMENT_PHASE_SUCCESS';
export const POST_TOURNAMENT_PHASE_FAILURE =
  'API_POST_TOURNAMENT_PHASE_FAILURE';
export const GET_PHASE = 'API_GET_PHASE';
export const GET_PHASE_SUCCESS = 'API_GET_PHASE_SUCCESS';
export const GET_PHASE_FAILURE = 'API_GET_PHASE_FAILURE';

export const deletePhase = (tournamentPhase: PhaseEntity) => async (
  dispatch: any
) => {
  dispatch({ type: DELETE_TOURNAMENT_PHASE });

  try {
    const response = await phaseHttpClient.delete(tournamentPhase.id);

    dispatch(deletePhaseSuccess(response));
    displayToast(`${tournamentPhase.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deletePhaseFailure(err));
  }
};

export const deletePhaseSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_TOURNAMENT_PHASE_SUCCESS,
  payload
});

export const deletePhaseFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_PHASE_FAILURE,
  payload
});

export const patchPhase = (tournamentPhase: PhaseEntity) => async (
  dispatch: any
) => {
  dispatch({ type: PATCH_TOURNAMENT_PHASE });

  try {
    const response = await phaseHttpClient.patch(tournamentPhase);

    dispatch(patchPhaseSuccess(response));
    displayToast(`${tournamentPhase.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchPhaseFailure(err));
  }
};

export const patchPhaseSuccess = (
  payload: PhaseEntity
): HttpAction<ActionTypes, PhaseEntity> => ({
  type: PATCH_TOURNAMENT_PHASE_SUCCESS,
  payload
});

export const patchPhaseFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_PHASE_FAILURE,
  payload
});

export const postPhase = (tournamentPhase: PhaseEntity) => async (
  dispatch: any
) => {
  dispatch({ type: POST_TOURNAMENT_PHASE });

  try {
    const response = await phaseHttpClient.post(tournamentPhase);

    dispatch(postPhaseSuccess(response));
    displayToast(`${tournamentPhase.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postPhaseFailure(err));
  }
};

export const postPhaseSuccess = (
  payload: PhaseEntity
): HttpAction<ActionTypes, PhaseEntity> => ({
  type: POST_TOURNAMENT_PHASE_SUCCESS,
  payload
});

export const postPhaseFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_PHASE_FAILURE,
  payload
});

export const getPhase = (phaseId: string) => async (dispatch: any) => {
  dispatch({ type: GET_PHASE });

  try {
    const response = await phaseHttpClient.get(phaseId);

    dispatch(getPhaseSuccess(response));
  } catch (err) {
    dispatch(getPhaseFailure(err));
  }
};

export const getPhaseSuccess = (
  payload: ApiPhase
): HttpAction<ActionTypes, ApiPhase> => ({
  type: GET_PHASE_SUCCESS,
  payload
});

export const getPhaseFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: GET_PHASE_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT_PHASE
  | typeof DELETE_TOURNAMENT_PHASE_SUCCESS
  | typeof DELETE_TOURNAMENT_PHASE_FAILURE
  | typeof PATCH_TOURNAMENT_PHASE
  | typeof PATCH_TOURNAMENT_PHASE_SUCCESS
  | typeof PATCH_TOURNAMENT_PHASE_FAILURE
  | typeof POST_TOURNAMENT_PHASE
  | typeof POST_TOURNAMENT_PHASE_SUCCESS
  | typeof POST_TOURNAMENT_PHASE_FAILURE
  | typeof GET_TOURNAMENT
  | typeof GET_TOURNAMENT_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS
  | typeof GET_PHASE
  | typeof GET_PHASE_FAILURE
  | typeof GET_PHASE_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
