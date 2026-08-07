import {
  ApiTournamentSetting,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntities,
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import { GET_TOURNAMENT_SUCCESS } from '../Tournaments/actions';
import {
  ActionTypes,
  APPLY_NAME_FORMAT,
  APPLY_NAME_FORMAT_FAILURE,
  APPLY_NAME_FORMAT_SUCCESS,
  DELETE_TOURNAMENT_SETTING,
  DELETE_TOURNAMENT_SETTING_FAILURE,
  DELETE_TOURNAMENT_SETTING_SUCCESS,
  PATCH_TOURNAMENT_SETTING,
  PATCH_TOURNAMENT_SETTING_FAILURE,
  PATCH_TOURNAMENT_SETTING_SUCCESS,
  POST_TOURNAMENT_SETTING,
  POST_TOURNAMENT_SETTING_FAILURE,
  POST_TOURNAMENT_SETTING_SUCCESS
} from './actions';
import { mapApiTournamentSettingToTournamentSettingEntity } from './dataMappers';
import {
  initialState,
  TournamentSettingEntity,
  TournamentSettingState
} from './state';

const tournamentSettingMapEntities = mapEntities<TournamentSettingEntity>(
  returnProperty('id')
);

const apiTournamentSettingToEntitiesNoOverride = apiDataToEntities<
  ApiTournamentSetting,
  TournamentSettingEntity
>(mapApiTournamentSettingToTournamentSettingEntity, returnProperty('id'));

const applyNameFormat = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingApplyNameFormat: true
});

const applyNameFormatFailure = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingApplyNameFormat: false
});

const applyNameFormatSuccess = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingApplyNameFormat: false
});

const deleteTournamentSetting = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentSetting: true
});

const deleteTournamentSettingFailure = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentSetting: false
});

const deleteTournamentSettingSuccess = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes, string>
) => {
  const tournamentSettings = Object.keys(state.tournamentSettings)
    .filter(entityById(state.tournamentSettings, action.payload!))
    .reduce(mapEntitiesByKey(state.tournamentSettings), {});
  return {
    ...state,
    tournamentSettings,
    isLoadingDeleteTournamentSetting: false
  };
};

const patchTournamentSetting = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentSetting: true
});

const patchTournamentSettingFailure = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchTournamentSetting: false
});

const patchTournamentSettingSuccess = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes, TournamentSettingEntity>
) => ({
  ...state,
  isLoadingPatchTournamentSetting: false,
  tournamentSettings: [action.payload].reduce(
    tournamentSettingMapEntities,
    state.tournamentSettings
  )
});

const postTournamentSetting = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentSetting: true
});

const postTournamentSettingFailure = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentSetting: false
});

const postTournamentSettingSuccess = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes, TournamentSettingEntity>
) => ({
  ...state,
  isLoadingPostTournamentSetting: false,
  tournamentSettings: [action.payload!].reduce(
    tournamentSettingMapEntities,
    state.tournamentSettings
  )
});

const getTournamentSuccess = (
  state: TournamentSettingState,
  action: HttpAction<ActionTypes, ApiTournamentWithDependecies>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  tournamentSettings: action.payload!.tournament_setting
    ? [action.payload!.tournament_setting].reduce(
        apiTournamentSettingToEntitiesNoOverride(state.tournamentSettings),
        {}
      )
    : {}
});

export default createReducer(initialState, {
  [APPLY_NAME_FORMAT]: applyNameFormat,
  [APPLY_NAME_FORMAT_FAILURE]: applyNameFormatFailure,
  [APPLY_NAME_FORMAT_SUCCESS]: applyNameFormatSuccess,
  [DELETE_TOURNAMENT_SETTING]: deleteTournamentSetting,
  [DELETE_TOURNAMENT_SETTING_FAILURE]: deleteTournamentSettingFailure,
  [DELETE_TOURNAMENT_SETTING_SUCCESS]: deleteTournamentSettingSuccess,
  [PATCH_TOURNAMENT_SETTING]: patchTournamentSetting,
  [PATCH_TOURNAMENT_SETTING_FAILURE]: patchTournamentSettingFailure,
  [PATCH_TOURNAMENT_SETTING_SUCCESS]: patchTournamentSettingSuccess,
  [POST_TOURNAMENT_SETTING]: postTournamentSetting,
  [POST_TOURNAMENT_SETTING_FAILURE]: postTournamentSettingFailure,
  [POST_TOURNAMENT_SETTING_SUCCESS]: postTournamentSettingSuccess,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
