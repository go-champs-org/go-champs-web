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
} from '../../Tournaments/Phases/actions';
import { TournamentPhaseEntity } from '../../Tournaments/Phases/state';
import {
  ActionTypes,
  DELETE_PHASE_STANDINGS,
  DELETE_PHASE_STANDINGS_FAILURE,
  DELETE_PHASE_STANDINGS_SUCCESS,
  PATCH_PHASE_STANDINGS,
  PATCH_PHASE_STANDINGS_FAILURE,
  PATCH_PHASE_STANDINGS_SUCCESS,
  POST_PHASE_STANDINGS,
  POST_PHASE_STANDINGS_FAILURE,
  POST_PHASE_STANDINGS_SUCCESS
} from './actions';
import {
  initialState,
  PhaseStandingsEntity,
  PhaseStandingsState
} from './state';

const phaseStandingsMapEntities = mapEntities<PhaseStandingsEntity>(
  returnProperty('id')
);

export const deletePhaseStandings = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePhaseStandings: true
});

export const deletePhaseStandingsFailure = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeletePhaseStandings: false
});

export const deletePhaseStandingsSuccess = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes, string>
) => {
  const standings = Object.keys(state.standings)
    .filter(entityById(state.standings, action.payload!))
    .reduce(mapEntitiesByKey(state.standings), {});
  return {
    ...state,
    standings,
    isLoadingDeletePhaseStandings: false
  };
};

export const patchPhaseStandings = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchPhaseStandings: true
});

export const patchPhaseStandingsFailure = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchPhaseStandings: false
});

export const patchPhaseStandingsSuccess = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes, PhaseStandingsEntity>
) => ({
  ...state,
  isLoadingPatchPhaseStandings: false,
  standings: [action.payload].reduce(phaseStandingsMapEntities, state.standings)
});

export const postPhaseStandings = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPhaseStandings: true
});

export const postPhaseStandingsFailure = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostPhaseStandings: false
});

export const postPhaseStandingsSuccess = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes, PhaseStandingsEntity>
) => ({
  ...state,
  isLoadingPostPhaseStandings: false,
  standings: [action.payload].reduce(phaseStandingsMapEntities, state.standings)
});

export const requestTournamentPhase = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: true
});

export const requestTournamentPhaseFailure = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournament: false
});

export const requestTournamentPhaseSuccess = (
  state: PhaseStandingsState,
  action: HttpAction<ActionTypes, TournamentPhaseEntity>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  standings: action.payload!.standings.reduce(phaseStandingsMapEntities, {})
});

export default createReducer<PhaseStandingsState>(initialState, {
  [DELETE_PHASE_STANDINGS]: deletePhaseStandings,
  [DELETE_PHASE_STANDINGS_FAILURE]: deletePhaseStandingsFailure,
  [DELETE_PHASE_STANDINGS_SUCCESS]: deletePhaseStandingsSuccess,
  [PATCH_PHASE_STANDINGS]: patchPhaseStandings,
  [PATCH_PHASE_STANDINGS_FAILURE]: patchPhaseStandingsFailure,
  [PATCH_PHASE_STANDINGS_SUCCESS]: patchPhaseStandingsSuccess,
  [POST_PHASE_STANDINGS]: postPhaseStandings,
  [POST_PHASE_STANDINGS_FAILURE]: postPhaseStandingsFailure,
  [POST_PHASE_STANDINGS_SUCCESS]: postPhaseStandingsSuccess,
  [REQUEST_TOURNAMENT_PHASE]: requestTournamentPhase,
  [REQUEST_TOURNAMENT_PHASE_FAILURE]: requestTournamentPhaseFailure,
  [REQUEST_TOURNAMENT_PHASE_SUCCESS]: requestTournamentPhaseSuccess
});
