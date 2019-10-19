import { Dispatch } from 'redux';
import {
  getTournamentsByFilterSuccess,
  getTournamentSuccess
} from '../../Tournaments/actions';
import tournamentHttpClient from '../../Tournaments/tournamentHttpClient';
import { HttpAction } from './interfaces';

export const LOAD_DEFAULT_PHASE = 'LOAD_DEFAULT_PHASE';
export const LOAD_DEFAULT_PHASE_FAILURE = 'LOAD_DEFAULT_PHASE_FAILURE';
export const LOAD_PHASE = 'LOAD_PHASE';

export interface LoadDefaultPhasePayload {
  organizationSlug: string;
  tournamentSlug: string;
}

export interface LoadPhasePayload {
  organizationSlug: string;
  tournamentSlug: string;
  phaseId: string;
}

export const loadDefaultPhasePayloadFailure = (err: any) => ({
  type: LOAD_DEFAULT_PHASE_FAILURE,
  payload: err
});

export const loadDefaultPhasePayload = (
  payload: LoadDefaultPhasePayload
) => async (dispatch: Dispatch) => {
  dispatch({ type: LOAD_DEFAULT_PHASE });

  try {
    const tournaments = await tournamentHttpClient.getByFilter({
      organization_slug: payload.organizationSlug,
      slug: payload.tournamentSlug
    });

    dispatch(getTournamentsByFilterSuccess(tournaments));

    const tournamentId = tournaments[0].id;
    const tournament = await tournamentHttpClient.get(tournamentId);

    dispatch(getTournamentSuccess(tournament));
  } catch (err) {
    dispatch(loadDefaultPhasePayloadFailure(err));
  }
};

export const loadPhasePayload = (payload: LoadPhasePayload) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: LOAD_DEFAULT_PHASE });

  try {
    const tournaments = await tournamentHttpClient.getByFilter({
      organization_slug: payload.organizationSlug,
      slug: payload.tournamentSlug
    });

    dispatch(getTournamentsByFilterSuccess(tournaments));

    const tournamentId = tournaments[0].id;

    const [tournament] = await Promise.all([
      tournamentHttpClient.get(tournamentId)
    ]);

    dispatch(getTournamentSuccess(tournament));
  } catch (err) {
    dispatch(loadDefaultPhasePayloadFailure(err));
  }
};

export type ActionTypes = typeof LOAD_DEFAULT_PHASE | typeof LOAD_PHASE;
export type Actions = HttpAction<ActionTypes>;
