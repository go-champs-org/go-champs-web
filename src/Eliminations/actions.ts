import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import eliminationHttpClient from './eliminationHttpClient';
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

export const deleteElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_ELIMINATION });

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
  type: DELETE_ELIMINATION_SUCCESS,
  payload
});

export const deleteEliminationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_ELIMINATION_FAILURE,
  payload
});

export const patchElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_ELIMINATION });

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
  type: PATCH_ELIMINATION_SUCCESS,
  payload
});

export const patchEliminationFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_ELIMINATION_FAILURE,
  payload
});

export const postElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_ELIMINATION });

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
