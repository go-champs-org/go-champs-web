import {
  ApiOfficial,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntitiesOverride,
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import { ActionTypes } from './actions';
import { mapApiOfficialToOfficialEntity } from './dataMappers';
import { initialState, OfficialEntity, OfficialState } from './state';

const officialMapEntities = mapEntities<OfficialEntity>(returnProperty('id'));

const apiOfficialToEntities = apiDataToEntitiesOverride<
  ApiOfficial,
  OfficialEntity
>(mapApiOfficialToOfficialEntity, returnProperty('id'));

const deleteOfficial = (
  state: OfficialState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteOfficial: true
});

const deleteOfficialFailure = (
  state: OfficialState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteOfficial: false
});

const deleteOfficialSuccess = (
  state: OfficialState,
  action: HttpAction<ActionTypes, string>
) => {
  const officials = Object.keys(state.officials)
    .filter(entityById(state.officials, action.payload!))
    .reduce(mapEntitiesByKey(state.officials), {});
  return {
    ...state,
    officials,
    isLoadingDeleteOfficial: false
  };
};

const patchOfficial = (
  state: OfficialState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchOfficial: true
});

const patchOfficialFailure = (
  state: OfficialState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchOfficial: false
});

const patchOfficialSuccess = (
  state: OfficialState,
  action: HttpAction<ActionTypes, OfficialEntity>
) => ({
  ...state,
  isLoadingPatchOfficial: false,
  officials: [action.payload].reduce(officialMapEntities, state.officials)
});

const postOfficial = (
  state: OfficialState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostOfficial: true
});

const postOfficialFailure = (
  state: OfficialState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostOfficial: false
});

const postOfficialSuccess = (
  state: OfficialState,
  action: HttpAction<ActionTypes, OfficialEntity>
) => ({
  ...state,
  isLoadingPostOfficial: false,
  officials: [action.payload!].reduce(officialMapEntities, state.officials)
});

const getTournamentSuccess = (
  state: OfficialState,
  action: HttpAction<ActionTypes, ApiTournamentWithDependecies>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  officials: action.payload!.officials
    ? action.payload!.officials.reduce(apiOfficialToEntities, {})
    : {}
});

export default createReducer(initialState, {
  [ActionTypes.DELETE_OFFICIAL_START]: deleteOfficial,
  [ActionTypes.DELETE_OFFICIAL_FAILURE]: deleteOfficialFailure,
  [ActionTypes.DELETE_OFFICIAL_SUCCESS]: deleteOfficialSuccess,
  [ActionTypes.PATCH_OFFICIAL_START]: patchOfficial,
  [ActionTypes.PATCH_OFFICIAL_FAILURE]: patchOfficialFailure,
  [ActionTypes.PATCH_OFFICIAL_SUCCESS]: patchOfficialSuccess,
  [ActionTypes.POST_OFFICIAL_START]: postOfficial,
  [ActionTypes.POST_OFFICIAL_FAILURE]: postOfficialFailure,
  [ActionTypes.POST_OFFICIAL_SUCCESS]: postOfficialSuccess,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
