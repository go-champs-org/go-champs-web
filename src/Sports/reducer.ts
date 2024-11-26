import {} from '../Shared/httpClient/apiTypes';
import {
  createReducer,
  mapEntities,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  GET_SPORTS,
  GET_SPORTS_FAILURE,
  GET_SPORTS_SUCCESS
} from './actions';
import { initialState, SportEntity, SportState } from './state';

const sportMapEntities = mapEntities<SportEntity>(returnProperty('slug'));

const getSports = (state: SportState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingRequestSports: true
});

const getSportsFailure = (
  state: SportState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestSports: false
});

const getSportsSuccess = (
  state: SportState,
  action: HttpAction<ActionTypes, SportEntity[]>
) => ({
  ...state,
  isLoadingRequestSports: false,
  sports: action.payload!.reduce(sportMapEntities, state.sports)
});

export default createReducer(initialState, {
  [GET_SPORTS]: getSports,
  [GET_SPORTS_FAILURE]: getSportsFailure,
  [GET_SPORTS_SUCCESS]: getSportsSuccess
});
