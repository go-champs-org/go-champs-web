import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  REQUEST_TOURNAMENT,
  REQUEST_TOURNAMENT_FAILURE,
  REQUEST_TOURNAMENT_SUCCESS
} from '../Tournaments/actions';
import { TournamentEntity } from '../Tournaments/state';
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
  POST_TOURNAMENT_TEAM_SUCCESS
} from './actions';
import { initialState, TeamEntity, TeamState } from './state';

const tournamentTeamMapEntities = mapEntities<TeamEntity>(returnProperty('id'));

export const deleteTeam = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTeam: true
});

export const deleteTeamFailure = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTeam: false
});

export const deleteTeamSuccess = (
  state: TeamState,
  action: HttpAction<ActionTypes, string>
) => {
  const teams = Object.keys(state.teams)
    .filter(entityById(state.teams, action.payload!))
    .reduce(mapEntitiesByKey(state.teams), {});
  return {
    ...state,
    teams,
    isLoadingDeleteTeam: false
  };
};

export const patchTeam = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTeam: true
});

export const patchTeamFailure = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTeam: false
});

export const patchTeamSuccess = (
  state: TeamState,
  action: HttpAction<ActionTypes, TeamEntity>
) => ({
  ...state,
  isLoadingPatchTeam: false,
  teams: [action.payload].reduce(tournamentTeamMapEntities, state.teams)
});

export const postTeam = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTeam: true
});

export const postTeamFailure = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTeam: false
});

export const postTeamSuccess = (
  state: TeamState,
  action: HttpAction<ActionTypes, TeamEntity>
) => ({
  ...state,
  isLoadingPostTeam: false,
  teams: [action.payload].reduce(tournamentTeamMapEntities, state.teams)
});

export const requestTournament = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentFailure = (
  state: TeamState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentSuccess = (
  state: TeamState,
  action: HttpAction<ActionTypes, TournamentEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  teams: action.payload!.teams.reduce(tournamentTeamMapEntities, {})
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_TEAM]: deleteTeam,
  [DELETE_TOURNAMENT_TEAM_FAILURE]: deleteTeamFailure,
  [DELETE_TOURNAMENT_TEAM_SUCCESS]: deleteTeamSuccess,
  [PATCH_TOURNAMENT_TEAM]: patchTeam,
  [PATCH_TOURNAMENT_TEAM_FAILURE]: patchTeamFailure,
  [PATCH_TOURNAMENT_TEAM_SUCCESS]: patchTeamSuccess,
  [POST_TOURNAMENT_TEAM]: postTeam,
  [POST_TOURNAMENT_TEAM_FAILURE]: postTeamFailure,
  [POST_TOURNAMENT_TEAM_SUCCESS]: postTeamSuccess,
  [REQUEST_TOURNAMENT]: requestTournament,
  [REQUEST_TOURNAMENT_FAILURE]: requestTournamentFailure,
  [REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess
});
