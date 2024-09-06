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
import ApiError from '../Shared/httpClient/ApiError';
import { getFixedPlayerStatsTablesByFilter } from '../FixedPlayerStatsTables/effects';
import { postRecentlyView } from '../RecentlyViews/effects';

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
    displayToast(`${response.name} updated!`, 'is-success');
  } catch (err) {
    dispatch(patchTournamentFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
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
    displayToast(`${response.name} created!`, 'is-success');
  } catch (err) {
    dispatch(postTournamentFailure(err));

    if (err instanceof ApiError) {
      return err.payload.data.errors ? err.payload.data.errors : {};
    }
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
    postRecentlyView(tournamentId);
    getFixedPlayerStatsTablesByFilter({ tournament_id: tournamentId })(
      dispatch
    );
  } catch (err) {
    dispatch(getTournamentFailure(err));
  }
};
