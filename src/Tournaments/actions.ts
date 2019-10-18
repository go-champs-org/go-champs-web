import { requestGamesByFilter } from '../Games/actions';
import { getPhase } from '../Phases/actions';
import { displayToast } from '../Shared/bulma/toast';
import { HttpAction } from '../Shared/store/interfaces';
import { updateTeamByGroup } from '../Teams/actions';
import { currentPhaseId } from './dataMappers';
import { TournamentEntity } from './state';
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
export const GET_TOURNAMENTS_BY_FILTER = 'API_GET_TOURNAMENTS_BY_FILTER';
export const GET_TOURNAMENTS_BY_FILTER_SUCCESS =
  'API_GET_TOURNAMENTS_BY_FILTER_SUCCESS';
export const GET_TOURNAMENTS_BY_FILTER_FAILURE =
  'API_GET_TOURNAMENTS_BY_FILTER_FAILURE';
export const GET_TOURNAMENT = 'API_GET_TOURNAMENT';
export const GET_TOURNAMENT_SUCCESS = 'API_GET_TOURNAMENT_SUCCESS';
export const GET_TOURNAMENT_FAILURE = 'API_GET_TOURNAMENT_FAILURE';

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
  dispatch({ type: GET_TOURNAMENTS_BY_FILTER });

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
  type: GET_TOURNAMENTS_BY_FILTER_SUCCESS,
  payload
});

export const requestFilterTournamentsFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENTS_BY_FILTER_FAILURE,
  payload
});

export const getTournament = (tournamentId: string) => async (
  dispatch: any
) => {
  dispatch({ type: GET_TOURNAMENT });

  try {
    const response = await tournamentHttpClient.get(tournamentId);
    const phaseId = currentPhaseId(response);

    dispatch(getPhase(phaseId));
    dispatch(requestGamesByFilter({ phase_id: phaseId }));
    dispatch(getTournamentSuccess(response));
    dispatch(updateTeamByGroup());
  } catch (err) {
    dispatch(getTournamentFailure(err));
  }
};

export const getTournamentSuccess = (
  payload: any
): HttpAction<ActionTypes, TournamentEntity> => ({
  type: GET_TOURNAMENT_SUCCESS,
  payload
});

export const getTournamentFailure = (
  payload: any
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_FAILURE,
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
  | typeof GET_TOURNAMENTS_BY_FILTER
  | typeof GET_TOURNAMENTS_BY_FILTER_FAILURE
  | typeof GET_TOURNAMENTS_BY_FILTER_SUCCESS
  | typeof GET_TOURNAMENT
  | typeof GET_TOURNAMENT_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
