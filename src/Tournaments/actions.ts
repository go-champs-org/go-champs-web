import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import { currentPhaseId } from './dataMappers';
import { requestTournamentGames } from './Games/actions';
import { requestTournamentPhase } from './Phases/actions';
import { TournamentEntity } from './state';
import { updateTournamentTeamByGroup } from './Teams/actions';
import tournamentHttpClient, { RequestFilter } from './tournamentHttpClient';

export const DELETE_TOURNAMENT = 'API_DELETE_TOURNAMENT';
export const DELETE_TOURNAMENT_SUCCESS = 'API_DELETE_TOURNAMENT_SUCCESS';
export const DELETE_TOURNAMENT_FAILURE = 'API_DELETE_TOURNAMENT_FAILURE';
export const PATCH_TOURNAMENT = 'API_PATCH_TOURNAMENT';
export const PATCH_TOURNAMENT_SUCCESS = 'API_PATCH_TOURNAMENT_SUCCESS';
export const PATCH_TOURNAMENT_FAILURE = 'API_PATCH_TOURNAMENT_FAILURE';
export const POST_TOURNAMENT = 'API_POST_TOURNAMENT';
export const POST_TOURNAMENT_SUCCESS = 'API_POST_TOURNAMENT_SUCCESS';
export const POST_TOURNAMENT_FAILURE = 'API_POST_TOURNAMENT_FAILURE';
export const REQUEST_FILTER_TOURNAMENTS = 'API_REQUEST_FILTER_TOURNAMENTS';
export const REQUEST_FILTER_TOURNAMENTS_SUCCESS =
  'API_REQUEST_FILTER_TOURNAMENTS_SUCCESS';
export const REQUEST_FILTER_TOURNAMENTS_FAILURE =
  'API_REQUEST_FILTER_TOURNAMENTS_FAILURE';
export const REQUEST_TOURNAMENTS = 'API_REQUEST_TOURNAMENTS';
export const REQUEST_TOURNAMENTS_SUCCESS = 'API_REQUEST_TOURNAMENTS_SUCCESS';
export const REQUEST_TOURNAMENTS_FAILURE = 'API_REQUEST_TOURNAMENTS_FAILURE';
export const REQUEST_TOURNAMENT = 'API_REQUEST_TOURNAMENT';
export const REQUEST_TOURNAMENT_SUCCESS = 'API_REQUEST_TOURNAMENT_SUCCESS';
export const REQUEST_TOURNAMENT_FAILURE = 'API_REQUEST_TOURNAMENT_FAILURE';

export const deleteTournament = (tournament: TournamentEntity) => async (
  dispatch: any
) => {
  dispatch({ type: DELETE_TOURNAMENT });

  try {
    const response = await tournamentHttpClient.delete(tournament.id);

    dispatch(deleteTournamentSuccess(response));
    displayToast(`${tournament.name} deleted!`, 'is-success');
  } catch (err) {
    dispatch(deleteTournamentFailure(err));
  }
};

export const deleteTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_SUCCESS,
  payload
});

export const deleteTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_FAILURE,
  payload
});

export const patchTournament = (organizationId: string) => (
  tournament: TournamentEntity
) => async (dispatch: any) => {
  dispatch({ type: PATCH_TOURNAMENT });

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

export const patchTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_SUCCESS,
  payload
});

export const patchTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_FAILURE,
  payload
});

export const postTournament = (organizationId: string) => (
  tournament: TournamentEntity
) => async (dispatch: any) => {
  dispatch({ type: POST_TOURNAMENT });

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

export const postTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_SUCCESS,
  payload
});

export const postTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_FAILURE,
  payload
});

export const requestFilterTournaments = (where: RequestFilter) => async (
  dispatch: any
) => {
  dispatch({ type: REQUEST_FILTER_TOURNAMENTS });

  try {
    const response = await tournamentHttpClient.getByFilter(where);

    dispatch(requestFilterTournamentsSuccess(response));
  } catch (err) {
    dispatch(requestFilterTournamentsFailure(err));
  }
};

export const requestFilterTournamentsSuccess = (
  payload: any
): HttpAction<ActionTypes, TournamentEntity[]> => ({
  type: REQUEST_FILTER_TOURNAMENTS_SUCCESS,
  payload
});

export const requestFilterTournamentsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_FILTER_TOURNAMENTS_FAILURE,
  payload
});

export const requestTournament = (tournamentId: string) => async (
  dispatch: any
) => {
  dispatch({ type: REQUEST_TOURNAMENT });

  try {
    const response = await tournamentHttpClient.get(tournamentId);
    const phaseId = currentPhaseId(response);

    dispatch(requestTournamentPhase(phaseId));
    dispatch(requestTournamentGames(phaseId));
    dispatch(requestTournamentSuccess(response));
    dispatch(updateTournamentTeamByGroup());
  } catch (err) {
    dispatch(requestTournamentFailure(err));
  }
};

export const requestTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes, TournamentEntity> => ({
  type: REQUEST_TOURNAMENT_SUCCESS,
  payload
});

export const requestTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENT_FAILURE,
  payload
});

export const requestTournaments = () => async (dispatch: any) => {
  dispatch({ type: REQUEST_TOURNAMENTS });

  try {
    const response = await tournamentHttpClient.getAll();

    dispatch(requestTournamentsSuccess(response));
  } catch (err) {
    dispatch(requestTournamentsFailure(err));
  }
};

export const requestTournamentsSuccess = (
  payload: any
): HttpAction<ActionTypes, TournamentEntity[]> => ({
  type: REQUEST_TOURNAMENTS_SUCCESS,
  payload
});

export const requestTournamentsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: REQUEST_TOURNAMENTS_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT
  | typeof DELETE_TOURNAMENT_FAILURE
  | typeof DELETE_TOURNAMENT_SUCCESS
  | typeof PATCH_TOURNAMENT
  | typeof PATCH_TOURNAMENT_FAILURE
  | typeof PATCH_TOURNAMENT_SUCCESS
  | typeof POST_TOURNAMENT
  | typeof POST_TOURNAMENT_FAILURE
  | typeof POST_TOURNAMENT_SUCCESS
  | typeof REQUEST_FILTER_TOURNAMENTS
  | typeof REQUEST_FILTER_TOURNAMENTS_FAILURE
  | typeof REQUEST_FILTER_TOURNAMENTS_SUCCESS
  | typeof REQUEST_TOURNAMENT
  | typeof REQUEST_TOURNAMENT_FAILURE
  | typeof REQUEST_TOURNAMENT_SUCCESS
  | typeof REQUEST_TOURNAMENTS
  | typeof REQUEST_TOURNAMENTS_FAILURE
  | typeof REQUEST_TOURNAMENTS_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
