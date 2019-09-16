import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../../Shared/store/helpers';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../actions';
import { TournamentEntity } from '../state';
import {
  ActionTypes,
  DELETE_TOURNAMENT_PHASE,
  DELETE_TOURNAMENT_PHASE_FAILURE,
  DELETE_TOURNAMENT_PHASE_SUCCESS,
  PATCH_TOURNAMENT_PHASE,
  PATCH_TOURNAMENT_PHASE_FAILURE,
  PATCH_TOURNAMENT_PHASE_SUCCESS,
  POST_TOURNAMENT_PHASE,
  POST_TOURNAMENT_PHASE_FAILURE,
  POST_TOURNAMENT_PHASE_SUCCESS
} from './actions';
import {
  initialState,
  TournamentPhaseEntity,
  TournamentPhaseState
} from './state';

// TODO (lairjr): Remove this function
const mapTournamentPhase = (apiData: any) => ({
  id: apiData.id,
  order: apiData.order,
  title: apiData.title,
  type: apiData.type
});

const tournamentPhaseMapEntities = mapEntities(
  returnProperty('id'),
  mapTournamentPhase
);

export const deleteTournamentPhase = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentPhase: true
});

export const deleteTournamentPhaseFailure = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentPhase: false
});

export const deleteTournamentPhaseSuccess = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes, string>
) => {
  const tournamentPhases = Object.keys(state.tournamentPhases)
    .filter(entityById(state.tournamentPhases, action.payload!))
    .reduce(mapEntitiesByKey(state.tournamentPhases), {});
  return {
    ...state,
    tournamentPhases,
    isLoadingDeleteTournamentPhase: false
  };
};

export const patchTournamentPhase = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentPhase: true
});

export const patchTournamentPhaseFailure = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentPhase: false
});

export const patchTournamentPhaseSuccess = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes, TournamentPhaseEntity>
) => ({
  ...state,
  isLoadingPatchTournamentPhase: false,
  tournamentPhases: [action.payload].reduce(
    tournamentPhaseMapEntities,
    state.tournamentPhases
  )
});

export const postTournamentPhase = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentPhase: true
});

export const postTournamentPhaseFailure = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentPhase: false
});

export const postTournamentPhaseSuccess = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes, TournamentPhaseEntity>
) => ({
  ...state,
  isLoadingPostTournamentPhase: false,
  tournamentPhases: [action.payload].reduce(
    tournamentPhaseMapEntities,
    state.tournamentPhases
  )
});

export const requestTournament = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentFailure = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentSuccess = (
  state: TournamentPhaseState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  tournamentPhases: action.payload!.phases.reduce(
    tournamentPhaseMapEntities,
    {}
  )
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_PHASE]: deleteTournamentPhase,
  [DELETE_TOURNAMENT_PHASE_FAILURE]: deleteTournamentPhaseFailure,
  [DELETE_TOURNAMENT_PHASE_SUCCESS]: deleteTournamentPhaseSuccess,
  [PATCH_TOURNAMENT_PHASE]: patchTournamentPhase,
  [PATCH_TOURNAMENT_PHASE_FAILURE]: patchTournamentPhaseFailure,
  [PATCH_TOURNAMENT_PHASE_SUCCESS]: patchTournamentPhaseSuccess,
  [POST_TOURNAMENT_PHASE]: postTournamentPhase,
  [POST_TOURNAMENT_PHASE_FAILURE]: postTournamentPhaseFailure,
  [POST_TOURNAMENT_PHASE_SUCCESS]: postTournamentPhaseSuccess,
  [REQUEST_TOURNAMENT]: requestTournament,
  [REQUEST_TOURNAMENT_FAILURE]: requestTournamentFailure,
  [REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess
});
