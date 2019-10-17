import { ApiPhase, ApiStat } from '../../Shared/httpClient/apiTypes';
import {
  apiDataToEntities,
  createReducer,
  returnProperty
} from '../../Shared/store/helpers';
import { HttpAction } from '../../Shared/store/interfaces';
import { ActionTypes, GET_PHASE_SUCCESS } from '../actions';
import { mapApiStatToPhaseEliminationStatEntity } from './dataMappers';
import {
  initialState,
  PhaseEliminationStatEntity,
  PhaseEliminationStatState
} from './state';

const apiPhaseStatsToEliminationStatsEntities = apiDataToEntities<
  ApiStat,
  PhaseEliminationStatEntity
>(mapApiStatToPhaseEliminationStatEntity, returnProperty('id'));

export const getPhaseSuccess = (
  state: PhaseEliminationStatState,
  action: HttpAction<ActionTypes, ApiPhase>
) => ({
  ...state,
  eliminationStats: action.payload!.elimination_stats
    ? action.payload!.elimination_stats.reduce(
        apiPhaseStatsToEliminationStatsEntities,
        {}
      )
    : {}
});

export default createReducer(initialState, {
  [GET_PHASE_SUCCESS]: getPhaseSuccess
});
