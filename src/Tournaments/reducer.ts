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
import { initialState, TournamentEntity, TournamentState } from './state';

const tournamentMapEntities = mapEntities<TournamentEntity>(
  returnProperty('slug')
);

const deleteTournament = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournament: true
});

const deleteTournamentFailure = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournament: false
});

const deleteTournamentSuccess = (
  state: TournamentState,
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

const patchTournament = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournament: true
});

const patchTournamentFailure = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournament: false
});

const patchTournamentSuccess = (
  state: TournamentState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingPatchTournament: false,
  tournaments: [action.payload].reduce(tournamentMapEntities, state.tournaments)
});

const postTournament = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournament: true
});

const postTournamentFailure = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournament: false
});

const postTournamentSuccess = (
  state: TournamentState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingPostTournament: false,
  tournaments: [action.payload].reduce(tournamentMapEntities, state.tournaments)
});

const getTournamentsByFilter = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true,
  isLoadingRequestTournaments: true
});

const getTournamentsByFilterFailure = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournaments: false
});

const getTournamentsByFilterSuccess = (
  state: TournamentState,
  action: HttpAction<ActionTypes, TournamentEntity[]>
) => ({
  ...state,
  isLoadingRequestTournaments: false,
  tournaments: action.payload!.reduce(tournamentMapEntities, {})
});

const getTournament = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

const getTournamentFailure = (
  state: TournamentState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

const getTournamentSuccess = (
  state: TournamentState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  tournaments: [action.payload].reduce(tournamentMapEntities, state.tournaments)
});

const loadDefaultPhasePayload = (state: TournamentState) => ({
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
  [GET_TOURNAMENTS_BY_FILTER]: getTournamentsByFilter,
  [GET_TOURNAMENTS_BY_FILTER_FAILURE]: getTournamentsByFilterFailure,
  [GET_TOURNAMENTS_BY_FILTER_SUCCESS]: getTournamentsByFilterSuccess,
  [GET_TOURNAMENT]: getTournament,
  [GET_TOURNAMENT_FAILURE]: getTournamentFailure,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
