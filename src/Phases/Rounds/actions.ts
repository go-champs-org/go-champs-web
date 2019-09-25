import { displayToast } from '../../Shared/bulma/toast';
import { HttpAction } from '../../Shared/store/interfaces';
import roundHttpClient from './roundHttpClient';
import { PhaseRoundEntity } from './state';

export const DELETE_PHASE_ROUND = 'API_DELETE_PHASE_ROUND';
export const DELETE_PHASE_ROUND_SUCCESS = 'API_DELETE_PHASE_ROUND_SUCCESS';
export const DELETE_PHASE_ROUND_FAILURE = 'API_DELETE_PHASE_ROUND_FAILURE';
export const PATCH_PHASE_ROUND = 'API_PATCH_PHASE_ROUND';
export const PATCH_PHASE_ROUND_SUCCESS = 'API_PATCH_PHASE_ROUND_SUCCESS';
export const PATCH_PHASE_ROUND_FAILURE = 'API_PATCH_PHASE_ROUND_FAILURE';
export const POST_PHASE_ROUND = 'API_POST_PHASE_ROUND';
export const POST_PHASE_ROUND_SUCCESS = 'API_POST_PHASE_ROUND_SUCCESS';
export const POST_PHASE_ROUND_FAILURE = 'API_POST_PHASE_ROUND_FAILURE';

export const deletePhaseRound = (phaseId: string) => (
  phaseRound: PhaseRoundEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_PHASE_ROUND });

  try {
    const response = await roundHttpClient.delete(phaseId, phaseRound.id);

    dispatch(deletePhaseRoundSuccess(response));
    displayToast(`${phaseRound.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deletePhaseRoundFailure(err));
  }
};

export const deletePhaseRoundSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_PHASE_ROUND_SUCCESS,
  payload
});

export const deletePhaseRoundFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_PHASE_ROUND_FAILURE,
  payload
});

export const patchPhaseRound = (phaseId: string) => (
  phaseRound: PhaseRoundEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_PHASE_ROUND });

  try {
    const response = await roundHttpClient.patch(phaseId, phaseRound);

    dispatch(patchPhaseRoundSuccess(response));
    displayToast(`${phaseRound.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchPhaseRoundFailure(err));
  }
};

export const patchPhaseRoundSuccess = (
  payload: PhaseRoundEntity
): HttpAction<ActionTypes, PhaseRoundEntity> => ({
  type: PATCH_PHASE_ROUND_SUCCESS,
  payload
});

export const patchPhaseRoundFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_PHASE_ROUND_FAILURE,
  payload
});

export const postPhaseRound = (phaseId: string) => (
  phaseRound: PhaseRoundEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_PHASE_ROUND });

  try {
    const response = await roundHttpClient.post(phaseId, phaseRound);

    dispatch(postPhaseRoundSuccess(response));
    displayToast(`${phaseRound.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postPhaseRoundFailure(err));
  }
};

export const postPhaseRoundSuccess = (
  payload: PhaseRoundEntity
): HttpAction<ActionTypes, PhaseRoundEntity> => ({
  type: POST_PHASE_ROUND_SUCCESS,
  payload
});

export const postPhaseRoundFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_PHASE_ROUND_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_PHASE_ROUND
  | typeof DELETE_PHASE_ROUND_SUCCESS
  | typeof DELETE_PHASE_ROUND_FAILURE
  | typeof PATCH_PHASE_ROUND
  | typeof PATCH_PHASE_ROUND_SUCCESS
  | typeof PATCH_PHASE_ROUND_FAILURE
  | typeof POST_PHASE_ROUND
  | typeof POST_PHASE_ROUND_SUCCESS
  | typeof POST_PHASE_ROUND_FAILURE;
export type Actions = HttpAction<ActionTypes>;
