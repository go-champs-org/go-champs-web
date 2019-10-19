import { displayToast } from '../Shared/bulma/toast';
import {
  deletePhaseFailure,
  deletePhaseStart,
  deletePhaseSuccess,
  getPhaseFailure,
  getPhaseStart,
  getPhaseSuccess,
  patchPhaseFailure,
  patchPhaseStart,
  patchPhaseSuccess,
  postPhaseFailure,
  postPhaseStart,
  postPhaseSuccess
} from './actions';
import phaseHttpClient from './phaseHttpClient';
import { PhaseEntity } from './state';

export const deletePhase = (tournamentPhase: PhaseEntity) => async (
  dispatch: any
) => {
  dispatch(deletePhaseStart());

  try {
    const response = await phaseHttpClient.delete(tournamentPhase.id);

    dispatch(deletePhaseSuccess(response));
    displayToast(`${tournamentPhase.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deletePhaseFailure(err));
  }
};

export const patchPhase = (tournamentPhase: PhaseEntity) => async (
  dispatch: any
) => {
  dispatch(patchPhaseStart());

  try {
    const response = await phaseHttpClient.patch(tournamentPhase);

    dispatch(patchPhaseSuccess(response));
    displayToast(`${tournamentPhase.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchPhaseFailure(err));
  }
};

export const postPhase = (tournamentPhase: PhaseEntity) => async (
  dispatch: any
) => {
  dispatch(postPhaseStart());

  try {
    const response = await phaseHttpClient.post(tournamentPhase);

    dispatch(postPhaseSuccess(response));
    displayToast(`${tournamentPhase.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postPhaseFailure(err));
  }
};

export const getPhase = (phaseId: string) => async (dispatch: any) => {
  dispatch(getPhaseStart());

  try {
    const response = await phaseHttpClient.get(phaseId);

    dispatch(getPhaseSuccess(response));
  } catch (err) {
    dispatch(getPhaseFailure(err));
  }
};
