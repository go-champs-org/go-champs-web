import { Dispatch } from 'redux';
import {
  requestFilterTournamentsSuccess,
  requestTournamentSuccess
} from '../../Tournaments/actions';
import { currentPhaseId } from '../../Tournaments/dataMappers';
import { requestTournamentGamesSuccess } from '../../Tournaments/Games/actions';
import gameHttpClient from '../../Tournaments/Games/gameHttpClient';
import { requestTournamentPhaseSuccess } from '../../Tournaments/Phases/actions';
import phaseHttpClient from '../../Tournaments/Phases/phaseHttpClient';
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

    dispatch(requestFilterTournamentsSuccess(tournaments));

    const tournamentId = tournaments[0].id;
    const tournament = await tournamentHttpClient.get(tournamentId);

    dispatch(requestTournamentSuccess(tournament));

    const defaultPhaseId = currentPhaseId(tournament);

    const [phase, games] = await Promise.all([
      phaseHttpClient.get(tournamentId, defaultPhaseId),
      gameHttpClient.getAll(defaultPhaseId)
    ]);

    dispatch(requestTournamentPhaseSuccess(phase));
    dispatch(requestTournamentGamesSuccess(games));
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

    dispatch(requestFilterTournamentsSuccess(tournaments));

    const tournamentId = tournaments[0].id;

    const [tournament, phase, games] = await Promise.all([
      tournamentHttpClient.get(tournamentId),
      phaseHttpClient.get(tournamentId, payload.phaseId),
      gameHttpClient.getAll(payload.phaseId)
    ]);

    dispatch(requestTournamentSuccess(tournament));
    dispatch(requestTournamentPhaseSuccess(phase));
    dispatch(requestTournamentGamesSuccess(games));
  } catch (err) {
    dispatch(loadDefaultPhasePayloadFailure(err));
  }
};

export type ActionTypes = typeof LOAD_DEFAULT_PHASE | typeof LOAD_PHASE;
export type Actions = HttpAction<ActionTypes>;
