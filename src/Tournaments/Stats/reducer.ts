import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../../Shared/store/helpers';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_TOURNAMENT_STAT,
  DELETE_TOURNAMENT_STAT_FAILURE,
  DELETE_TOURNAMENT_STAT_SUCCESS,
  PATCH_TOURNAMENT_STAT,
  PATCH_TOURNAMENT_STAT_FAILURE,
  PATCH_TOURNAMENT_STAT_SUCCESS,
  POST_TOURNAMENT_STAT,
  POST_TOURNAMENT_STAT_FAILURE,
  POST_TOURNAMENT_STAT_SUCCESS
} from './actions';
import {
  initialState,
  TournamentStatEntity,
  TournamentStatState
} from './state';

// TODO (lairjr): Remove this function
const mapTournamentStat = (apiData: any) => ({
  id: apiData.id,
  title: apiData.title
});

const tournamentStatMapEntities = mapEntities(
  returnProperty('id'),
  mapTournamentStat
);

export const deleteTournamentStat = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentStat: true
});

export const deleteTournamentStatFailure = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentStat: false
});

export const deleteTournamentStatSuccess = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes, string>
) => {
  const tournamentStats = Object.keys(state.tournamentStats)
    .filter(entityById(state.tournamentStats, action.payload!))
    .reduce(mapEntitiesByKey(state.tournamentStats), {});
  return {
    ...state,
    tournamentStats,
    isLoadingDeleteTournamentStat: false
  };
};

export const patchTournamentStat = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentStat: true
});

export const patchTournamentStatFailure = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentStat: false
});

export const patchTournamentStatSuccess = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes, TournamentStatEntity>
) => ({
  ...state,
  isLoadingPatchTournamentStat: false,
  tournamentStats: [action.payload].reduce(
    tournamentStatMapEntities,
    state.tournamentStats
  )
});

export const postTournamentStat = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentStat: true
});

export const postTournamentStatFailure = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentStat: false
});

export const postTournamentStatSuccess = (
  state: TournamentStatState,
  action: HttpAction<ActionTypes, TournamentStatEntity>
) => ({
  ...state,
  isLoadingPostTournamentStat: false,
  tournamentStats: [action.payload].reduce(
    tournamentStatMapEntities,
    state.tournamentStats
  )
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_STAT]: deleteTournamentStat,
  [DELETE_TOURNAMENT_STAT_FAILURE]: deleteTournamentStatFailure,
  [DELETE_TOURNAMENT_STAT_SUCCESS]: deleteTournamentStatSuccess,
  [PATCH_TOURNAMENT_STAT]: patchTournamentStat,
  [PATCH_TOURNAMENT_STAT_FAILURE]: patchTournamentStatFailure,
  [PATCH_TOURNAMENT_STAT_SUCCESS]: patchTournamentStatSuccess,
  [POST_TOURNAMENT_STAT]: postTournamentStat,
  [POST_TOURNAMENT_STAT_FAILURE]: postTournamentStatFailure,
  [POST_TOURNAMENT_STAT_SUCCESS]: postTournamentStatSuccess
});
