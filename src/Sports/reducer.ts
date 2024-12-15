import {} from '../Shared/httpClient/apiTypes';
import {
  createReducer,
  mapEntities,
  returnProperty
} from '../Shared/store/helpers';
import { HttpAction } from '../Shared/store/interfaces';
import {
  ActionTypes,
  GET_SPORT,
  GET_SPORT_FAILURE,
  GET_SPORT_SUCCESS,
  GET_SPORTS,
  GET_SPORTS_FAILURE,
  GET_SPORTS_SUCCESS
} from './actions';
import { initialState, SportEntity, SportState } from './state';

const sportMapEntities = mapEntities<SportEntity>(returnProperty('slug'));

const getSport = (state: SportState, action: HttpAction<ActionTypes>) => ({
  ...state,
  isLoadingRequestSports: true
});

const getSportFailure = (
  state: SportState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestSports: false
});

const getSportSuccess = (
  state: SportState,
  action: HttpAction<ActionTypes, SportEntity>
) => ({
  ...state,
  isLoadingRequestSports: false,
  sports: {
    ...state.sports,
    [action.payload!.slug]: action.payload!
  }
});

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
  [GET_SPORT]: getSport,
  [GET_SPORT_FAILURE]: getSportFailure,
  [GET_SPORT_SUCCESS]: getSportSuccess,
  [GET_SPORTS]: getSports,
  [GET_SPORTS_FAILURE]: getSportsFailure,
  [GET_SPORTS_SUCCESS]: getSportsSuccess
});
