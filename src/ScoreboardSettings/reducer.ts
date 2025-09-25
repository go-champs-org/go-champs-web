import {
  ApiScoreboardSetting,
  ApiTournamentWithDependecies
} from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntities,
  apiDataToEntitiesOverride,
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
  DELETE_SCOREBOARD_SETTING,
  DELETE_SCOREBOARD_SETTING_FAILURE,
  DELETE_SCOREBOARD_SETTING_SUCCESS,
  PATCH_SCOREBOARD_SETTING,
  PATCH_SCOREBOARD_SETTING_FAILURE,
  PATCH_SCOREBOARD_SETTING_SUCCESS,
  POST_SCOREBOARD_SETTING,
  POST_SCOREBOARD_SETTING_FAILURE,
  POST_SCOREBOARD_SETTING_SUCCESS
} from './actions';
import { mapApiScoreboardSettingToScoreboardSettingEntity } from './dataMappers';
import {
  initialState,
  ScoreboardSettingEntity,
  ScoreboardSettingState
} from './state';

const scoreboardSettingMapEntities = mapEntities<ScoreboardSettingEntity>(
  returnProperty('id')
);

const apiScoreboardSettingToEntities = apiDataToEntitiesOverride<
  ApiScoreboardSetting,
  ScoreboardSettingEntity
>(mapApiScoreboardSettingToScoreboardSettingEntity, returnProperty('id'));

const apiScoreboardSettingToEntitiesNoOverride = apiDataToEntities<
  ApiScoreboardSetting,
  ScoreboardSettingEntity
>(mapApiScoreboardSettingToScoreboardSettingEntity, returnProperty('id'));

const deleteScoreboardSetting = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteScoreboardSetting: true
});

const deleteScoreboardSettingFailure = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteScoreboardSetting: false
});

const deleteScoreboardSettingSuccess = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes, string>
) => {
  const scoreboardSettings = Object.keys(state.scoreboardSettings)
    .filter(entityById(state.scoreboardSettings, action.payload!))
    .reduce(mapEntitiesByKey(state.scoreboardSettings), {});
  return {
    ...state,
    scoreboardSettings,
    isLoadingDeleteScoreboardSetting: false
  };
};

const patchScoreboardSetting = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchScoreboardSetting: true
});

const patchScoreboardSettingFailure = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchScoreboardSetting: false
});

const patchScoreboardSettingSuccess = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes, ScoreboardSettingEntity>
) => ({
  ...state,
  isLoadingPatchScoreboardSetting: false,
  scoreboardSettings: [action.payload].reduce(
    scoreboardSettingMapEntities,
    state.scoreboardSettings
  )
});

const postScoreboardSetting = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostScoreboardSetting: true
});

const postScoreboardSettingFailure = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostScoreboardSetting: false
});

const postScoreboardSettingSuccess = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes, ScoreboardSettingEntity>
) => ({
  ...state,
  isLoadingPostScoreboardSetting: false,
  scoreboardSettings: [action.payload!].reduce(
    scoreboardSettingMapEntities,
    state.scoreboardSettings
  )
});

const getTournamentSuccess = (
  state: ScoreboardSettingState,
  action: HttpAction<ActionTypes, ApiTournamentWithDependecies>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  scoreboardSettings: action.payload!.scoreboard_setting
    ? [action.payload!.scoreboard_setting].reduce(
        apiScoreboardSettingToEntitiesNoOverride(state.scoreboardSettings),
        {}
      )
    : {}
});

export default createReducer(initialState, {
  [DELETE_SCOREBOARD_SETTING]: deleteScoreboardSetting,
  [DELETE_SCOREBOARD_SETTING_FAILURE]: deleteScoreboardSettingFailure,
  [DELETE_SCOREBOARD_SETTING_SUCCESS]: deleteScoreboardSettingSuccess,
  [PATCH_SCOREBOARD_SETTING]: patchScoreboardSetting,
  [PATCH_SCOREBOARD_SETTING_FAILURE]: patchScoreboardSettingFailure,
  [PATCH_SCOREBOARD_SETTING_SUCCESS]: patchScoreboardSettingSuccess,
  [POST_SCOREBOARD_SETTING]: postScoreboardSetting,
  [POST_SCOREBOARD_SETTING_FAILURE]: postScoreboardSettingFailure,
  [POST_SCOREBOARD_SETTING_SUCCESS]: postScoreboardSettingSuccess,
  [GET_TOURNAMENT_SUCCESS]: getTournamentSuccess
});
