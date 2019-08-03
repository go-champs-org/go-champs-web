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
import { initialState, TournamentTeamState } from './state';

const mapTournamentTeam = (apiData: any) => ({
  id: apiData.id,
  name: apiData.name,
  stats: apiData.stats || {}
});

const tournamentTeamMapEntities = mapEntities(
  returnProperty('id'),
  mapTournamentTeam
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
  action: HttpAction<ActionTypes>
) => {
  const tournamentTeams = Object.keys(state.tournamentTeams)
    .filter(entityById(state.tournamentTeams, action.payload))
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
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentTeam: false,
  tournamentTeams: [action.payload.data].reduce(
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
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentTeam: false,
  tournamentTeams: [action.payload.data].reduce(
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
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  tournamentTeams: action.payload.data.teams.reduce(
    tournamentTeamMapEntities,
    {}
  )
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
  [REQUEST_TOURNAMENT_SUCCESS]: requestTournamentSuccess
});
