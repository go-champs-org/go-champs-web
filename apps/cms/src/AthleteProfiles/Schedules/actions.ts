import { ScheduleGameEntity } from '../../Shared/Schedules/state';

export const REQUEST_ATHLETE_PROFILE_SCHEDULE =
  'REQUEST_ATHLETE_PROFILE_SCHEDULE';
export const REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS =
  'REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS';
export const REQUEST_ATHLETE_PROFILE_SCHEDULE_FAILURE =
  'REQUEST_ATHLETE_PROFILE_SCHEDULE_FAILURE';

export const requestScheduleStart = () => ({
  type: REQUEST_ATHLETE_PROFILE_SCHEDULE
});

export const requestScheduleSuccess = (games: ScheduleGameEntity[]) => ({
  type: REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS,
  payload: games
});

export const requestScheduleFailure = (error: unknown) => ({
  type: REQUEST_ATHLETE_PROFILE_SCHEDULE_FAILURE,
  payload: error
});
