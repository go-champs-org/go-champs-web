import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import eliminationHttpClient from './eliminationHttpClient';
import { EliminationEntity } from './state';

export const DELETE_PHASE_STANDINGS = 'API_DELETE_PHASE_STANDINGS';
export const DELETE_PHASE_STANDINGS_SUCCESS =
  'API_DELETE_PHASE_STANDINGS_SUCCESS';
export const DELETE_PHASE_STANDINGS_FAILURE =
  'API_DELETE_PHASE_STANDINGS_FAILURE';
export const PATCH_PHASE_STANDINGS = 'API_PATCH_PHASE_STANDINGS';
export const PATCH_PHASE_STANDINGS_SUCCESS =
  'API_PATCH_PHASE_STANDINGS_SUCCESS';
export const PATCH_PHASE_STANDINGS_FAILURE =
  'API_PATCH_PHASE_STANDINGS_FAILURE';
export const POST_PHASE_STANDINGS = 'API_POST_PHASE_STANDINGS';
export const POST_PHASE_STANDINGS_SUCCESS = 'API_POST_PHASE_STANDINGS_SUCCESS';
export const POST_PHASE_STANDINGS_FAILURE = 'API_POST_PHASE_STANDINGS_FAILURE';

export const deleteElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_PHASE_STANDINGS });

  try {
    const response = await eliminationHttpClient.delete(
      phaseId,
      elimination.id
    );

    dispatch(deleteEliminationSuccess(response));
    displayToast(`${elimination.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteEliminationFailure(err));
  }
};

export const deleteEliminationSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_PHASE_STANDINGS_SUCCESS,
  payload
});

export const deleteEliminationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_PHASE_STANDINGS_FAILURE,
  payload
});

export const patchElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_PHASE_STANDINGS });

  try {
    const response = await eliminationHttpClient.patch(phaseId, elimination);

    dispatch(patchEliminationSuccess(response));
    displayToast(`${elimination.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchEliminationFailure(err));
  }
};

export const patchEliminationSuccess = (
  payload: EliminationEntity
): HttpAction<ActionTypes, EliminationEntity> => ({
  type: PATCH_PHASE_STANDINGS_SUCCESS,
  payload
});

export const patchEliminationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_PHASE_STANDINGS_FAILURE,
  payload
});

export const postElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_PHASE_STANDINGS });

  try {
    const response = await eliminationHttpClient.post(phaseId, elimination);

    dispatch(postEliminationSuccess(response));
    displayToast(`${elimination.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postEliminationFailure(err));
  }
};

export const postEliminationSuccess = (
  payload: EliminationEntity
): HttpAction<ActionTypes, EliminationEntity> => ({
  type: POST_PHASE_STANDINGS_SUCCESS,
  payload
});

export const postEliminationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_PHASE_STANDINGS_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_PHASE_STANDINGS
  | typeof DELETE_PHASE_STANDINGS_SUCCESS
  | typeof DELETE_PHASE_STANDINGS_FAILURE
  | typeof PATCH_PHASE_STANDINGS
  | typeof PATCH_PHASE_STANDINGS_SUCCESS
  | typeof PATCH_PHASE_STANDINGS_FAILURE
  | typeof POST_PHASE_STANDINGS
  | typeof POST_PHASE_STANDINGS_SUCCESS
  | typeof POST_PHASE_STANDINGS_FAILURE;
export type Actions = HttpAction<ActionTypes>;
