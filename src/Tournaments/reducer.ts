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
  PATCH_TOURNAMENT,
  PATCH_TOURNAMENT_FAILURE,
  PATCH_TOURNAMENT_SUCCESS,
  POST_TOURNAMENT,
  POST_TOURNAMENT_FAILURE,
  POST_TOURNAMENT_SUCCESS,
  REQUEST_FILTER_TOURNAMENTS,
  REQUEST_FILTER_TOURNAMENTS_FAILURE,
  REQUEST_FILTER_TOURNAMENTS_SUCCESS,
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENTS,
  REQUEST_TOURNAMENTS_FAILURE,
  REQUEST_TOURNAMENTS_SUCCESS,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
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

export const requestTournament = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentFailure = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentSuccess = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  tournaments: [action.payload].reduce(tournamentMapEntities, state.tournaments)
});

export const requestTournaments = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournaments: true
});

export const requestTournamentsFailure = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournaments: false
});

export const requestTournamentsSuccess = (
  state: PhaseEliminationState,
  action: HttpAction<ActionTypes, TournamentEntity[]>
) => ({
  ...state,
  isLoadingRequestTournaments: false,
  tournaments: action.payload!.reduce(tournamentMapEntities, {})
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
  [REQUEST_FILTER_TOURNAMENTS]: requestFilterTournaments,
  [REQUEST_FILTER_TOURNAMENTS_FAILURE]: requestFilterTournamentsFailure,
  [REQUEST_FILTER_TOURNAMENTS_SUCCESS]: requestFilterTournamentsSuccess,
  [REQUEST_TOURNAMENT]: requestTournament,
  [REQUEST_TOURNAMENT_FAILURE]: requestTournamentFailure,
  [REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess,
  [REQUEST_TOURNAMENTS]: requestTournaments,
  [REQUEST_TOURNAMENTS_FAILURE]: requestTournamentsFailure,
  [REQUEST_TOURNAMENTS_SUCCESS]: requestTournamentsSuccess
});
