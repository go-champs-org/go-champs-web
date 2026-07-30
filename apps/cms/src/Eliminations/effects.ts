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
  postEliminationSuccess,
  batchPatchEliminationSuccess
} from './actions';
import eliminationHttpClient from './eliminationHttpClient';
import { EliminationEntity } from './state';
import { Dispatch } from 'redux';

export const deleteElimination = (elimination: EliminationEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(deleteEliminationStart());

  try {
    const response = await eliminationHttpClient.delete(elimination.id);

    dispatch(deleteEliminationSuccess(response));
    displayToast(`${elimination.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteEliminationFailure(err));
  }
};

export const patchElimination = (elimination: EliminationEntity) => async (
  dispatch: Dispatch
) => {
  dispatch(patchEliminationStart());

  try {
    const response = await eliminationHttpClient.patch(elimination);

    dispatch(patchEliminationSuccess(response));
    displayToast(`${elimination.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchEliminationFailure(err));
  }
};

export const patchBatchElimination = (
  eliminations: EliminationEntity[]
) => async (dispatch: Dispatch) => {
  dispatch(patchEliminationStart());

  try {
    const response = await eliminationHttpClient.patchBatch(eliminations);

    dispatch(batchPatchEliminationSuccess(response));
    displayToast(`Eliminations updated!`, 'is-success');
  } catch (err) {
    dispatch(patchEliminationFailure(err));
  }
};

export const postElimination = (
  elimination: EliminationEntity,
  phaseId: string
) => async (dispatch: Dispatch) => {
  dispatch(postEliminationStart());

  try {
    const response = await eliminationHttpClient.post(elimination, phaseId);

    dispatch(postEliminationSuccess(response));
    displayToast(`${elimination.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postEliminationFailure(err));
  }
};
