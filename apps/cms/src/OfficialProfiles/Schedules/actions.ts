import { ScheduleGameEntity } from './state';

export const REQUEST_OFFICIAL_PROFILE_SCHEDULE =
  'REQUEST_OFFICIAL_PROFILE_SCHEDULE';
export const REQUEST_OFFICIAL_PROFILE_SCHEDULE_SUCCESS =
  'REQUEST_OFFICIAL_PROFILE_SCHEDULE_SUCCESS';
export const REQUEST_OFFICIAL_PROFILE_SCHEDULE_FAILURE =
  'REQUEST_OFFICIAL_PROFILE_SCHEDULE_FAILURE';

export const requestScheduleStart = () => ({
  type: REQUEST_OFFICIAL_PROFILE_SCHEDULE
});

export const requestScheduleSuccess = (games: ScheduleGameEntity[]) => ({
  type: REQUEST_OFFICIAL_PROFILE_SCHEDULE_SUCCESS,
  payload: games
});

export const requestScheduleFailure = (error: unknown) => ({
  type: REQUEST_OFFICIAL_PROFILE_SCHEDULE_FAILURE,
  payload: error
});
