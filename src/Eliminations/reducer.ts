import { GET_PHASE_SUCCESS } from '../Phases/actions';
import { ApiElimination, ApiPhase } from '../Shared/httpClient/apiTypes';
import {
  apiDataToEntitiesOverride,
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_ELIMINATION,
  DELETE_ELIMINATION_FAILURE,
  DELETE_ELIMINATION_SUCCESS,
  PATCH_ELIMINATION,
  PATCH_ELIMINATION_FAILURE,
  PATCH_ELIMINATION_SUCCESS,
  POST_ELIMINATION,
  POST_ELIMINATION_FAILURE,
  POST_ELIMINATION_SUCCESS,
  PATCH_BATCH_ELIMINATION_SUCCESS
} from './actions';
import { mapApiEliminationToEliminationEntity } from './dataMappers';
import { EliminationEntity, EliminationState, initialState } from './state';
import { ApiEliminationBatchResponseData } from './eliminationHttpClient';

const eliminationMapEntities = mapEntities<EliminationEntity>(
  returnProperty('id')
);

const apiEliminationToEntities = apiDataToEntitiesOverride<
  ApiElimination,
  EliminationEntity
>(mapApiEliminationToEliminationEntity, returnProperty('id'));

const deleteElimination = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteElimination: true
});

const deleteEliminationFailure = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteElimination: false
});

const deleteEliminationSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, string>
) => {
  const eliminations = Object.keys(state.eliminations)
    .filter(entityById(state.eliminations, action.payload!))
    .reduce(mapEntitiesByKey(state.eliminations), {});
  return {
    ...state,
    eliminations,
    isLoadingDeleteElimination: false
  };
};

const patchElimination = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchElimination: true
});

const patchEliminationFailure = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPatchElimination: false
});

const patchEliminationSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, EliminationEntity>
) => ({
  ...state,
  isLoadingPatchElimination: false,
  eliminations: [action.payload].reduce(
    eliminationMapEntities,
    state.eliminations
  )
});

const batchPatchEliminationSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, ApiEliminationBatchResponseData>
) => ({
  isLoadingPatchElimination: false,
  eliminations: Object.keys(action.payload!).reduce(
    (
      currentEntities: { [id: string]: EliminationEntity },
      eliminationId: string
    ) => {
      const mappedElimination = mapApiEliminationToEliminationEntity(
        action.payload![eliminationId]
      );
      const patchedElimination = {
        ...currentEntities[eliminationId],
        ...mappedElimination
      };

      return {
        ...currentEntities,
        [eliminationId]: patchedElimination
      };
    },
    state.eliminations
  )
});

const postElimination = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostElimination: true
});

const postEliminationFailure = (
  state: EliminationState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostElimination: false
});

const postEliminationSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, EliminationEntity>
) => ({
  ...state,
  isLoadingPostElimination: false,
  eliminations: [action.payload].reduce(
    eliminationMapEntities,
    state.eliminations
  )
});

const getPhaseSuccess = (
  state: EliminationState,
  action: HttpAction<ActionTypes, ApiPhase>
) => ({
  ...state,
  isLoadingRequestTournament: false,
  eliminations: action.payload!.eliminations
    ? action.payload!.eliminations.reduce(apiEliminationToEntities, {})
    : {}
});

export default createReducer<EliminationState>(initialState, {
  [DELETE_ELIMINATION]: deleteElimination,
  [DELETE_ELIMINATION_FAILURE]: deleteEliminationFailure,
  [DELETE_ELIMINATION_SUCCESS]: deleteEliminationSuccess,
  [PATCH_ELIMINATION]: patchElimination,
  [PATCH_ELIMINATION_FAILURE]: patchEliminationFailure,
  [PATCH_ELIMINATION_SUCCESS]: patchEliminationSuccess,
  [PATCH_BATCH_ELIMINATION_SUCCESS]: batchPatchEliminationSuccess,
  [POST_ELIMINATION]: postElimination,
  [POST_ELIMINATION_FAILURE]: postEliminationFailure,
  [POST_ELIMINATION_SUCCESS]: postEliminationSuccess,
  [GET_PHASE_SUCCESS]: getPhaseSuccess
});
