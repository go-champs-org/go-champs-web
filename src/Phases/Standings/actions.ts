import { displayToast } from '../../Shared/bulma/toast';
import { HttpAction } from '../../Shared/store/interfaces';
import phaseStandingsHttpClient from './standingsHttpClient';
import { PhaseStandingsEntity } from './state';

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
export const REQUEST_PHASE_STANDINGS = 'API_REQUEST_PHASE_STANDINGS';
export const REQUEST_PHASE_STANDINGS_SUCCESS =
  'API_REQUEST_PHASE_STANDINGS_SUCCESS';
export const REQUEST_PHASE_STANDINGS_FAILURE =
  'API_REQUEST_PHASE_STANDINGS_FAILURE';

export const deletePhaseStandings = (phaseId: string) => (
  phaseStandings: PhaseStandingsEntity
) => async (dispatch: any) => {
  dispatch({ type: DELETE_PHASE_STANDINGS });

  try {
    const response = await phaseStandingsHttpClient.delete(
      phaseId,
      phaseStandings.id
    );

    dispatch(deletePhaseStandingsSuccess(response));
    displayToast(`${phaseStandings.title} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deletePhaseStandingsFailure(err));
  }
};

export const deletePhaseStandingsSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_PHASE_STANDINGS_SUCCESS,
  payload
});

export const deletePhaseStandingsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_PHASE_STANDINGS_FAILURE,
  payload
});

export const patchPhaseStandings = (phaseId: string) => (
  phaseStandings: PhaseStandingsEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_PHASE_STANDINGS });

  try {
    const response = await phaseStandingsHttpClient.patch(
      phaseId,
      phaseStandings
    );

    dispatch(patchPhaseStandingsSuccess(response));
    displayToast(`${phaseStandings.title} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchPhaseStandingsFailure(err));
  }
};

export const patchPhaseStandingsSuccess = (
  payload: PhaseStandingsEntity
): HttpAction<ActionTypes, PhaseStandingsEntity> => ({
  type: PATCH_PHASE_STANDINGS_SUCCESS,
  payload
});

export const patchPhaseStandingsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_PHASE_STANDINGS_FAILURE,
  payload
});

export const postPhaseStandings = (phaseId: string) => (
  phaseStandings: PhaseStandingsEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_PHASE_STANDINGS });

  try {
    const response = await phaseStandingsHttpClient.post(
      phaseId,
      phaseStandings
    );

    dispatch(postPhaseStandingsSuccess(response));
    displayToast(`${phaseStandings.title} created!`, 'is-success');
  } catch (err) {
    dispatch(postPhaseStandingsFailure(err));
  }
};

export const postPhaseStandingsSuccess = (
  payload: PhaseStandingsEntity
): HttpAction<ActionTypes, PhaseStandingsEntity> => ({
  type: POST_PHASE_STANDINGS_SUCCESS,
  payload
});

export const postPhaseStandingsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_PHASE_STANDINGS_FAILURE,
  payload
});

export const requestPhaseStandings = (
  phaseId: string,
  phaseStandingsId: string
) => async (dispatch: any) => {
  dispatch({ type: REQUEST_PHASE_STANDINGS });

  try {
    const response = await phaseStandingsHttpClient.get(
      phaseId,
      phaseStandingsId
    );

    dispatch(requestPhaseStandingsSuccess(response));
  } catch (err) {
    dispatch(requestPhaseStandingsFailure(err));
  }
};

export const requestPhaseStandingsSuccess = (
  payload: any
): HttpAction<ActionTypes, PhaseStandingsEntity> => ({
  type: REQUEST_PHASE_STANDINGS_SUCCESS,
  payload
});

export const requestPhaseStandingsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_PHASE_STANDINGS_FAILURE,
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
  | typeof POST_PHASE_STANDINGS_FAILURE
  | typeof REQUEST_PHASE_STANDINGS
  | typeof REQUEST_PHASE_STANDINGS_FAILURE
  | typeof REQUEST_PHASE_STANDINGS_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
