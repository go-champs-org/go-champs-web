import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import { LOAD_DEFAULT_PHASE } from '../Shared/store/routerActions';
import {
  ActionTypes,
  DELETE_TOURNAMENT,
  DELETE_TOURNAMENT_FAILURE,
  DELETE_TOURNAMENT_SUCCESS,
  GET_TOURNAMENT,
  GET_TOURNAMENTS_BY_FILTER,
  GET_TOURNAMENTS_BY_FILTER_FAILURE,
  GET_TOURNAMENTS_BY_FILTER_SUCCESS,
  GET_TOURNAMENT_FAILURE,
  GET_TOURNAMENT_SUCCESS,
  PATCH_TOURNAMENT,
  PATCH_TOURNAMENT_FAILURE,
  PATCH_TOURNAMENT_SUCCESS,
  POST_TOURNAMENT,
  POST_TOURNAMENT_FAILURE,
  POST_TOURNAMENT_SUCCESS
} from './actions';
import { initialState, PhaseEliminationState, TournamentEntity } from './state';

const tournamentMapEntities = mapEntities<TournamentEntity>(
  returnProperty('slug')
);

export const deleteTournament = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournament: true
});

export const deleteTournamentFailure = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournament: false
});

export const deleteTournamentSuccess = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes, string>
) => {
  const tournaments = Object.keys(state.tournaments)
    .filter(entityById(state.tournaments, action.payload!))
    .reduce(mapEntitiesByKey(state.tournaments), {});
  return {
    ...state,
    isLoadingDeleteTournament: false,
    tournaments
  };
};

export const patchTournament = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournament: true
});

export const patchTournamentFailure = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournament: false
});

export const patchTournamentSuccess = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingPatchTournament: false,
  tournaments: [action.payload].reduce(tournamentMapEntities, state.tournaments)
});

export const postTournament = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournament: true
});

export const postTournamentFailure = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournament: false
});

export const postTournamentSuccess = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingPostTournament: false,
  tournaments: [action.payload].reduce(tournamentMapEntities, state.tournaments)
});

export const requestFilterTournaments = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true,
  isLoadingRequestTournaments: true
});

export const requestFilterTournamentsFailure = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournaments: false
});

export const requestFilterTournamentsSuccess = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes, TournamentEntity[]>
) => ({
  ...state,
  isLoadingRequestTournaments: false,
  tournaments: action.payload!.reduce(tournamentMapEntities, {})
});

export const getTournament = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const getTournamentFailure = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const getTournamentSuccess = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  tournaments: [action.payload].reduce(tournamentMapEntities, state.tournaments)
});

export const loadDefaultPhasePayload = (state: PhaseEliminationState) => ({
  ...state,
  isLoadingRequestTournaments: true,
  isLoadingRequestTournament: true
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT]: deleteTournament,
  [DELETE_TOURNAMENT_FAILURE]: deleteTournamentFailure,
  [DELETE_TOURNAMENT_SUCCESS]: deleteTournamentSuccess,
  [LOAD_DEFAULT_PHASE]: loadDefaultPhasePayload,
  [PATCH_TOURNAMENT]: patchTournament,
  [PATCH_TOURNAMENT_FAILURE]: patchTournamentFailure,
  [PATCH_TOURNAMENT_SUCCESS]: patchTournamentSuccess,
  [POST_TOURNAMENT]: postTournament,
  [POST_TOURNAMENT_FAILURE]: postTournamentFailure,
  [POST_TOURNAMENT_SUCCESS]: postTournamentSuccess,
  [GET_TOURNAMENTS_BY_FILTER]: requestFilterTournaments,
  [GET_TOURNAMENTS_BY_FILTER_FAILURE]: requestFilterTournamentsFailure,
  [GET_TOURNAMENTS_BY_FILTER_SUCCESS]: requestFilterTournamentsSuccess,
  [GET_TOURNAMENT]: getTournament,
  [GET_TOURNAMENT_FAILURE]: getTournamentFailure,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
