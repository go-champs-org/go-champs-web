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
  postTournamentSuccess,
  getAdminTournamentsStart,
  getAdminTournamentsSuccess,
  getAdminTournamentsFailure,
  patchTournamentArchiveStart,
  patchTournamentArchiveSuccess,
  patchTournamentArchiveFailure,
  getBillingAgreementStart,
  getBillingAgreementSuccess,
  getBillingAgreementFailure
} from './actions';
import { TournamentEntity } from './state';
import tournamentHttpClient from './tournamentHttpClient';
import { History } from 'history';
import { Dispatch } from 'redux';
import ApiError from '../Shared/httpClient/ApiError';
import { getFixedPlayerStatsTablesByFilter } from '../FixedPlayerStatsTables/effects';
import { postRecentlyView } from '../RecentlyViews/effects';
import { getSport } from '../Sports/effects';

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
  tournament: TournamentEntity,
  history: History
) => async (dispatch: Dispatch) => {
  dispatch(postTournamentStart());

  try {
    const response = await tournamentHttpClient.post(
      organizationId,
      tournament
    );

    dispatch(postTournamentSuccess(response));
    displayToast(`${response.name} created!`, 'is-success');
    if (response.sport_slug) {
      history.push(
        `/${response.organization.slug}/${response.slug}/LicensingBilling`
      );
    }
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

/**
 * Loads the organization workspace tournaments filtered by archive state.
 * Replaces the tournaments in the store, so the listing always reflects the
 * currently selected tab.
 */
export const getAdminTournaments = (
  organizationId: string,
  archived: boolean
) => async (dispatch: Dispatch) => {
  dispatch(getAdminTournamentsStart());

  try {
    const response = await tournamentHttpClient.getAdminByOrganization(
      organizationId,
      archived
    );

    dispatch(getAdminTournamentsSuccess(response));
  } catch (err) {
    dispatch(getAdminTournamentsFailure(err));
    displayToast(`Could not load tournaments`, 'is-danger');
  }
};

/**
 * Archives or unarchives a tournament in the organization workspace and
 * refetches the currently displayed list, so the card leaves the tab it no
 * longer belongs to without a manual reload.
 */
export const patchTournamentArchive = (
  tournament: TournamentEntity,
  organizationId: string,
  archived: boolean
) => async (dispatch: Dispatch) => {
  dispatch(patchTournamentArchiveStart());

  try {
    const response = archived
      ? await tournamentHttpClient.archive(tournament.id)
      : await tournamentHttpClient.unarchive(tournament.id);

    dispatch(patchTournamentArchiveSuccess(response));
    displayToast(
      archived
        ? `${tournament.name} archived!`
        : `${tournament.name} unarchived!`,
      'is-success'
    );

    // The tournament just left the current tab, so refetch that same tab
    // (active listing when archiving, archived listing when unarchiving).
    await getAdminTournaments(organizationId, !archived)(dispatch);
  } catch (err) {
    dispatch(patchTournamentArchiveFailure(err));
    displayToast(
      archived
        ? `Could not archive ${tournament.name}`
        : `Could not unarchive ${tournament.name}`,
      'is-danger'
    );
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

export const getBillingAgreement = (tournamentId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(getBillingAgreementStart());

  try {
    const response = await tournamentHttpClient.getBillingAgreement(
      tournamentId
    );
    dispatch(getBillingAgreementSuccess(response));
  } catch (err) {
    dispatch(getBillingAgreementFailure(err));
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
    await getFixedPlayerStatsTablesByFilter({ tournament_id: tournamentId })(
      dispatch
    );
    if (response.sport_slug) {
      await getSport(response.sport_slug)(dispatch);
    }
    // Always try to fetch billing agreement, returns null for unauthorized users
    await getBillingAgreement(tournamentId)(dispatch);
  } catch (err) {
    dispatch(getTournamentFailure(err));
  }
};
