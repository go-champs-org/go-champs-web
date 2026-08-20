import {
  REQUEST_ATHLETE_PROFILE_SCHEDULE,
  REQUEST_ATHLETE_PROFILE_SCHEDULE_FAILURE,
  REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS
} from './actions';
import reducer from './reducer';
import {
  DEFAULT_SCHEDULE_GAME,
  ScheduleState,
  initialState
} from '../../Shared/Schedules/state';

const gameWith = (id: string, datetime: string) => ({
  ...DEFAULT_SCHEDULE_GAME,
  id,
  datetime
});

describe('schedule reducer', () => {
  it('sets loading and clears the error on request start', () => {
    const state: ScheduleState = {
      ...initialState,
      hasErrorRequestSchedule: true
    };

    expect(reducer(state, { type: REQUEST_ATHLETE_PROFILE_SCHEDULE })).toEqual({
      ...initialState,
      isLoadingRequestSchedule: true,
      hasErrorRequestSchedule: false
    });
  });

  it('flags the error and stops loading on failure', () => {
    const state: ScheduleState = {
      ...initialState,
      isLoadingRequestSchedule: true
    };

    expect(
      reducer(state, {
        type: REQUEST_ATHLETE_PROFILE_SCHEDULE_FAILURE,
        payload: new Error('boom')
      })
    ).toEqual({
      ...initialState,
      isLoadingRequestSchedule: false,
      hasErrorRequestSchedule: true
    });
  });

  it('stores the returned games keyed by id on success', () => {
    const game = gameWith('game-1', '2026-08-20T19:30:00Z');

    expect(
      reducer(
        { ...initialState, isLoadingRequestSchedule: true },
        {
          type: REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS,
          payload: [game]
        }
      )
    ).toEqual({
      isLoadingRequestSchedule: false,
      hasErrorRequestSchedule: false,
      games: { 'game-1': game }
    });
  });

  it('merges an adjacent window into the games already loaded', () => {
    const loaded = gameWith('game-1', '2026-08-20T19:30:00Z');
    const olderWindow = gameWith('game-2', '2026-05-01T19:30:00Z');

    const state = reducer(
      { ...initialState, games: { 'game-1': loaded } },
      {
        type: REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS,
        payload: [olderWindow]
      }
    );

    expect(state.games).toEqual({
      'game-1': loaded,
      'game-2': olderWindow
    });
  });

  it('keeps the loaded games when a window comes back empty', () => {
    const loaded = gameWith('game-1', '2026-08-20T19:30:00Z');

    const state = reducer(
      { ...initialState, games: { 'game-1': loaded } },
      { type: REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS, payload: [] }
    );

    expect(state.games).toEqual({ 'game-1': loaded });
  });
});
