import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../../Shared/store/helpers';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT_PHASE,
  REQUEST_TOURNAMENT_PHASE_FAILURE,
  REQUEST_TOURNAMENT_PHASE_SUCCESS
} from '../Phases/actions';
import { TournamentPhaseEntity } from '../Phases/state';
import {
  ActionTypes,
  DELETE_TOURNAMENT_GROUP,
  DELETE_TOURNAMENT_GROUP_FAILURE,
  DELETE_TOURNAMENT_GROUP_SUCCESS,
  PATCH_TOURNAMENT_GROUP,
  PATCH_TOURNAMENT_GROUP_FAILURE,
  PATCH_TOURNAMENT_GROUP_SUCCESS,
  POST_TOURNAMENT_GROUP,
  POST_TOURNAMENT_GROUP_FAILURE,
  POST_TOURNAMENT_GROUP_SUCCESS
} from './actions';
import {
  initialState,
  TournamentGroupEntity,
  TournamentGroupState
} from './state';

const tournamentGroupMapEntities = mapEntities<TournamentGroupEntity>(
  returnProperty('id')
);

export const deleteTournamentGroup = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentGroup: true
});

export const deleteTournamentGroupFailure = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentGroup: false
});

export const deleteTournamentGroupSuccess = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes, string>
) => {
  const tournamentGroups = Object.keys(state.tournamentGroups)
    .filter(entityById(state.tournamentGroups, action.payload!))
    .reduce(mapEntitiesByKey(state.tournamentGroups), {});
  return {
    ...state,
    tournamentGroups,
    isLoadingDeleteTournamentGroup: false
  };
};

export const patchTournamentGroup = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentGroup: true
});

export const patchTournamentGroupFailure = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentGroup: false
});

export const patchTournamentGroupSuccess = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes, TournamentGroupEntity>
) => ({
  ...state,
  isLoadingPatchTournamentGroup: false,
  tournamentGroups: [action.payload].reduce(
    tournamentGroupMapEntities,
    state.tournamentGroups
  )
});

export const postTournamentGroup = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentGroup: true
});

export const postTournamentGroupFailure = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentGroup: false
});

export const postTournamentGroupSuccess = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes, TournamentGroupEntity>
) => ({
  ...state,
  isLoadingPostTournamentGroup: false,
  tournamentGroups: [action.payload].reduce(
    tournamentGroupMapEntities,
    state.tournamentGroups
  )
});

export const requestTournamentPhase = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentPhaseFailure = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentPhaseSuccess = (
  state: TournamentGroupState,
  action: HttpAction<ActionTypes, TournamentPhaseEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  tournamentGroups: action.payload!.groups.reduce(
    tournamentGroupMapEntities,
    {}
  )
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_GROUP]: deleteTournamentGroup,
  [DELETE_TOURNAMENT_GROUP_FAILURE]: deleteTournamentGroupFailure,
  [DELETE_TOURNAMENT_GROUP_SUCCESS]: deleteTournamentGroupSuccess,
  [PATCH_TOURNAMENT_GROUP]: patchTournamentGroup,
  [PATCH_TOURNAMENT_GROUP_FAILURE]: patchTournamentGroupFailure,
  [PATCH_TOURNAMENT_GROUP_SUCCESS]: patchTournamentGroupSuccess,
  [POST_TOURNAMENT_GROUP]: postTournamentGroup,
  [POST_TOURNAMENT_GROUP_FAILURE]: postTournamentGroupFailure,
  [POST_TOURNAMENT_GROUP_SUCCESS]: postTournamentGroupSuccess,
  [REQUEST_TOURNAMENT_PHASE]: requestTournamentPhase,
  [REQUEST_TOURNAMENT_PHASE_FAILURE]: requestTournamentPhaseFailure,
  [REQUEST_TOURNAMENT_PHASE_SUCCESS]: requestTournamentPhaseSuccess
});
