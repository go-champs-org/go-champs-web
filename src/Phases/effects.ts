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
import { Dispatch } from 'redux';

export const deletePhase = (phase: PhaseEntity) => async (dispatch: Dispatch) => {
  dispatch(deletePhaseStart());

  try {
    const response = await phaseHttpClient.delete(phase.id);

    dispatch(deletePhaseSuccess(response));
    displayToast(`${phase.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deletePhaseFailure(err));
  }
};

export const patchPhase = (phase: PhaseEntity, tournamentId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(patchPhaseStart());

  try {
    const response = await phaseHttpClient.patch(phase, tournamentId);

    dispatch(patchPhaseSuccess(response));
    displayToast(`${phase.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchPhaseFailure(err));
  }
};

export const postPhase = (phase: PhaseEntity, tournamentId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(postPhaseStart());

  try {
    const response = await phaseHttpClient.post(phase, tournamentId);

    dispatch(postPhaseSuccess(response));
    displayToast(`${phase.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postPhaseFailure(err));
  }
};

export const getPhase = (phaseId: string) => async (dispatch: Dispatch) => {
  dispatch(getPhaseStart());

  try {
    const response = await phaseHttpClient.get(phaseId);

    dispatch(getPhaseSuccess(response));
  } catch (err) {
    dispatch(getPhaseFailure(err));
  }
};
