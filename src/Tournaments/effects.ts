import { displayToast } from '../Shared/bulma/toast';
import { RequestFilter } from '../Shared/httpClient/requestFilter';
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
import { TournamentEntity } from './state';
import tournamentHttpClient from './tournamentHttpClient';
import { Dispatch } from 'redux';

export const deleteTournament = (tournament: TournamentEntity) => async (
  dispatch: Dispatch
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

export const patchTournament = (
  organizationId: string,
  tournament: TournamentEntity
) => async (dispatch: Dispatch) => {
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

export const postTournament = (
  organizationId: string,
  tournament: TournamentEntity
) => async (dispatch: Dispatch) => {
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
  dispatch: Dispatch
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
  dispatch: Dispatch
) => {
  dispatch(getTournamentStart());

  try {
    const response = await tournamentHttpClient.get(tournamentId);

    dispatch(getTournamentSuccess(response));
  } catch (err) {
    dispatch(getTournamentFailure(err));
  }
};

export const getTournamentBySlug = (
  organizationSlug: string,
  tournamentSlug: string
) => async (dispatch: Dispatch) => {
  dispatch(getTournamentStart());

  try {
    const tournaments = await tournamentHttpClient.getByFilter({
      organization_slug: organizationSlug,
      slug: tournamentSlug
    });

    const tournamentId = tournaments[0].id;

    const response = await tournamentHttpClient.get(tournamentId);

    dispatch(getTournamentSuccess(response));
  } catch (err) {
    dispatch(getTournamentFailure(err));
  }
};
