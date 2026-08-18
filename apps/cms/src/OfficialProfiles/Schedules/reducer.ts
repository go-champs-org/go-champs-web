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
  // The window toggle reuses this slice, so the previous window is replaced
  // rather than merged.
  games: action.payload!.reduce(scheduleGameMapEntities, {})
});

export default createReducer(initialState, {
  [REQUEST_OFFICIAL_PROFILE_SCHEDULE]: requestSchedule,
  [REQUEST_OFFICIAL_PROFILE_SCHEDULE_FAILURE]: requestScheduleFailure,
  [REQUEST_OFFICIAL_PROFILE_SCHEDULE_SUCCESS]: requestScheduleSuccess
});
