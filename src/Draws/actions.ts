import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import drawHttpClient from './drawClient';
import { DrawEntity } from './state';

export const DELETE_PHASE_ROUND = 'API_DELETE_PHASE_ROUND';
export const DELETE_PHASE_ROUND_SUCCESS = 'API_DELETE_PHASE_ROUND_SUCCESS';
export const DELETE_PHASE_ROUND_FAILURE = 'API_DELETE_PHASE_ROUND_FAILURE';
export const PATCH_PHASE_ROUND = 'API_PATCH_PHASE_ROUND';
export const PATCH_PHASE_ROUND_SUCCESS = 'API_PATCH_PHASE_ROUND_SUCCESS';
export const PATCH_PHASE_ROUND_FAILURE = 'API_PATCH_PHASE_ROUND_FAILURE';
export const POST_PHASE_ROUND = 'API_POST_PHASE_ROUND';
export const POST_PHASE_ROUND_SUCCESS = 'API_POST_PHASE_ROUND_SUCCESS';
export const POST_PHASE_ROUND_FAILURE = 'API_POST_PHASE_ROUND_FAILURE';

export const deleteDraw = (phaseId: string) => (draw: DrawEntity) => async (
  dispatch: any
) => {
  dispatch({ type: DELETE_PHASE_ROUND });

  try {
    const response = await drawHttpClient.delete(phaseId, draw.id);

    dispatch(deleteDrawSuccess(response));
    displayToast(`${draw.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteDrawFailure(err));
  }
};

export const deleteDrawSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_PHASE_ROUND_SUCCESS,
  payload
});

export const deleteDrawFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: DELETE_PHASE_ROUND_FAILURE,
  payload
});

export const patchDraw = (phaseId: string) => (draw: DrawEntity) => async (
  dispatch: any
) => {
  dispatch({ type: PATCH_PHASE_ROUND });

  try {
    const response = await drawHttpClient.patch(phaseId, draw);

    dispatch(patchDrawSuccess(response));
    displayToast(`${draw.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchDrawFailure(err));
  }
};

export const patchDrawSuccess = (
  payload: DrawEntity
): HttpAction<ActionTypes, DrawEntity> => ({
  type: PATCH_PHASE_ROUND_SUCCESS,
  payload
});

export const patchDrawFailure = (payload: any): HttpAction<ActionTypes> => ({
  type: PATCH_PHASE_ROUND_FAILURE,
  payload
});

export const postDraw = (phaseId: string) => (draw: DrawEntity) => async (
  dispatch: any
) => {
  dispatch({ type: POST_PHASE_ROUND });

  try {
    const response = await drawHttpClient.post(phaseId, draw);

    dispatch(postDrawSuccess(response));
    displayToast(`${draw.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postDrawFailure(err));
  }
};

export const postDrawSuccess = (
  payload: DrawEntity
): HttpAction<ActionTypes, DrawEntity> => ({
  type: POST_PHASE_ROUND_SUCCESS,
  payload
});

export const postDrawFailure = (payload: any): HttpAction<ActionTypes> => ({
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
