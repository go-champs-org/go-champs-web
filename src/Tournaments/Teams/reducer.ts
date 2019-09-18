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
  DELETE_TOURNAMENT_TEAM,
  DELETE_TOURNAMENT_TEAM_FAILURE,
  DELETE_TOURNAMENT_TEAM_SUCCESS,
  PATCH_TOURNAMENT_TEAM,
  PATCH_TOURNAMENT_TEAM_FAILURE,
  PATCH_TOURNAMENT_TEAM_SUCCESS,
  POST_TOURNAMENT_TEAM,
  POST_TOURNAMENT_TEAM_FAILURE,
  POST_TOURNAMENT_TEAM_SUCCESS,
  UPDATE_TOURNAMENT_TEAM_BY_GROUP
} from './actions';
import {
  initialState,
  TournamentTeamEntity,
  TournamentTeamState
} from './state';

export const NO_GROUP_KEY = 'no-group';

const tournamentTeamMapEntities = mapEntities<TournamentTeamEntity>(
  returnProperty('id')
);

const returnGroupIdProperty = (apiData: any) =>
  apiData.group.id || NO_GROUP_KEY;

const tournamentTeamToTeamByGroup = mapEntities<TournamentTeamEntity>(
  returnGroupIdProperty
);

export const deleteTournamentTeam = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentTeam: true
});

export const deleteTournamentTeamFailure = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentTeam: false
});

export const deleteTournamentTeamSuccess = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes, string>
) => {
  const tournamentTeams = Object.keys(state.tournamentTeams)
    .filter(entityById(state.tournamentTeams, action.payload!))
    .reduce(mapEntitiesByKey(state.tournamentTeams), {});
  return {
    ...state,
    tournamentTeams,
    isLoadingDeleteTournamentTeam: false
  };
};

export const patchTournamentTeam = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentTeam: true
});

export const patchTournamentTeamFailure = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentTeam: false
});

export const patchTournamentTeamSuccess = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes, TournamentTeamEntity>
) => ({
  ...state,
  isLoadingPatchTournamentTeam: false,
  tournamentTeams: [action.payload].reduce(
    tournamentTeamMapEntities,
    state.tournamentTeams
  )
});

export const postTournamentTeam = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentTeam: true
});

export const postTournamentTeamFailure = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentTeam: false
});

export const postTournamentTeamSuccess = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes, TournamentTeamEntity>
) => ({
  ...state,
  isLoadingPostTournamentTeam: false,
  tournamentTeams: [action.payload].reduce(
    tournamentTeamMapEntities,
    state.tournamentTeams
  )
});

export const requestTournament = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentFailure = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentSuccess = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  tournamentTeams: action.payload!.teams.reduce(tournamentTeamMapEntities, {})
});

export const updateTournamentTeamByGroup = (
  state: TournamentTeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  tournamentTeamsByGroup: Object.keys(state.tournamentTeams)
    .map((key: string) => state.tournamentTeams[key])
    .reduce(tournamentTeamToTeamByGroup, {})
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_TEAM]: deleteTournamentTeam,
  [DELETE_TOURNAMENT_TEAM_FAILURE]: deleteTournamentTeamFailure,
  [DELETE_TOURNAMENT_TEAM_SUCCESS]: deleteTournamentTeamSuccess,
  [PATCH_TOURNAMENT_TEAM]: patchTournamentTeam,
  [PATCH_TOURNAMENT_TEAM_FAILURE]: patchTournamentTeamFailure,
  [PATCH_TOURNAMENT_TEAM_SUCCESS]: patchTournamentTeamSuccess,
  [POST_TOURNAMENT_TEAM]: postTournamentTeam,
  [POST_TOURNAMENT_TEAM_FAILURE]: postTournamentTeamFailure,
  [POST_TOURNAMENT_TEAM_SUCCESS]: postTournamentTeamSuccess,
  [REQUEST_TOURNAMENT]: requestTournament,
  [REQUEST_TOURNAMENT_FAILURE]: requestTournamentFailure,
  [REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess,
  [UPDATE_TOURNAMENT_TEAM_BY_GROUP]: updateTournamentTeamByGroup
});
