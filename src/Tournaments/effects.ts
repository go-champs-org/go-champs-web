import { getGamesByFilter } from '../Games/effects';
import { getPhase } from '../Phases/effects';
import { displayToast } from '../Shared/bulma/toast';
import {
  deleteTournamentFailure,
  deleteTournamentStart,
  deleteTournamentSuccess,
  getTournamentFailure,
  getTournamentsByFilterFailure,
  getTournamentsByFilterStart,
  getTournamentsByFilterSuccess,
  getTournamentStart,
  getTournamentSuccess,
  patchTournamentFailure,
  patchTournamentStart,
  patchTournamentSuccess,
  postTournamentFailure,
  postTournamentStart,
  postTournamentSuccess
} from './actions';
import { currentPhaseId } from './dataMappers';
import { TournamentEntity } from './state';
import tournamentHttpClient, { RequestFilter } from './tournamentHttpClient';

export const deleteTournament = (tournament: TournamentEntity) => async (
  dispatch: any
) => {
  dispatch(deleteTournamentStart());

  try {
    const response = await tournamentHttpClient.delete(tournament.id);

    dispatch(deleteTournamentSuccess(response));
    displayToast(`${tournament.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentFailure(err));
  }
};

export const patchTournament = (organizationId: string) => (
  tournament: TournamentEntity
) => async (dispatch: any) => {
  dispatch(patchTournamentStart());

  try {
    const response = await tournamentHttpClient.patch(
      organizationId,
      tournament
    );

    dispatch(patchTournamentSuccess(response));
    displayToast(`${tournament.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentFailure(err));
  }
};

export const postTournament = (organizationId: string) => (
  tournament: TournamentEntity
) => async (dispatch: any) => {
  dispatch(postTournamentStart());

  try {
    const response = await tournamentHttpClient.post(
      organizationId,
      tournament
    );

    dispatch(postTournamentSuccess(response));
    displayToast(`${tournament.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentFailure(err));
  }
};

export const getTournamentsByFilter = (where: RequestFilter) => async (
  dispatch: any
) => {
  dispatch(getTournamentsByFilterStart());

  try {
    const response = await tournamentHttpClient.getByFilter(where);

    dispatch(getTournamentsByFilterSuccess(response));
  } catch (err) {
    dispatch(getTournamentsByFilterFailure(err));
  }
};

export const getTournament = (tournamentId: string) => async (
  dispatch: any
) => {
  dispatch(getTournamentStart());

  try {
    const response = await tournamentHttpClient.get(tournamentId);
    const phaseId = currentPhaseId(response);

    dispatch(getPhase(phaseId));
    dispatch(getGamesByFilter({ phase_id: phaseId }));
    dispatch(getTournamentSuccess(response));
  } catch (err) {
    dispatch(getTournamentFailure(err));
  }
};
