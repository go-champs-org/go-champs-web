import {
  createReducer,
  mapEntities,
  returnProperty
} from '../../Shared/store/helpers';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  REQUEST_OFFICIAL_PROFILE_SCHEDULE,
  REQUEST_OFFICIAL_PROFILE_SCHEDULE_FAILURE,
  REQUEST_OFFICIAL_PROFILE_SCHEDULE_SUCCESS
} from './actions';
import { ScheduleGameEntity, ScheduleState, initialState } from './state';

const scheduleGameMapEntities = mapEntities<ScheduleGameEntity>(
  returnProperty('id')
);

const requestSchedule = (state: ScheduleState, action: HttpAction<string>) => ({
  ...state,
  isLoadingRequestSchedule: true,
  hasErrorRequestSchedule: false
});

const requestScheduleFailure = (
  state: ScheduleState,
  action: HttpAction<string>
) => ({
  ...state,
  isLoadingRequestSchedule: false,
  hasErrorRequestSchedule: true
});

const requestScheduleSuccess = (
  state: ScheduleState,
  action: HttpAction<string, ScheduleGameEntity[]>
) => ({
  ...state,
  isLoadingRequestSchedule: false,
  hasErrorRequestSchedule: false,
  // The calendar walks past the edges of the loaded window by fetching the
  // adjacent range, so each response is merged into what is already loaded.
  games: action.payload!.reduce(scheduleGameMapEntities, state.games)
});

export default createReducer(initialState, {
  [REQUEST_OFFICIAL_PROFILE_SCHEDULE]: requestSchedule,
  [REQUEST_OFFICIAL_PROFILE_SCHEDULE_FAILURE]: requestScheduleFailure,
  [REQUEST_OFFICIAL_PROFILE_SCHEDULE_SUCCESS]: requestScheduleSuccess
});
