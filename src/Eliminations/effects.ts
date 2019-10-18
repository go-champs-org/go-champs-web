import { displayToast } from '../Shared/bulma/toast';
import {
  deleteEliminationFailure,
  deleteEliminationStart,
  deleteEliminationSuccess,
  patchEliminationFailure,
  patchEliminationStart,
  patchEliminationSuccess,
  postEliminationFailure,
  postEliminationStart,
  postEliminationSuccess
} from './actions';
import eliminationHttpClient from './eliminationHttpClient';
import { EliminationEntity } from './state';

export const deleteElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch(deleteEliminationStart());

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

export const patchElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch(patchEliminationStart());

  try {
    const response = await eliminationHttpClient.patch(phaseId, elimination);

    dispatch(patchEliminationSuccess(response));
    displayToast(`${elimination.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchEliminationFailure(err));
  }
};

export const postElimination = (phaseId: string) => (
  elimination: EliminationEntity
) => async (dispatch: any) => {
  dispatch(postEliminationStart());

  try {
    const response = await eliminationHttpClient.post(phaseId, elimination);

    dispatch(postEliminationSuccess(response));
    displayToast(`${elimination.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postEliminationFailure(err));
  }
};
