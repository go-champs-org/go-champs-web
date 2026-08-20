import * as toast from '../../Shared/bulma/toast';
import {
  REQUEST_ATHLETE_PROFILE_SCHEDULE,
  REQUEST_ATHLETE_PROFILE_SCHEDULE_FAILURE,
  REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS
} from './actions';
import { requestSchedule } from './effects';
import scheduleHttpClient from './scheduleHttpClient';
import { DEFAULT_SCHEDULE_GAME } from '../../Shared/Schedules/state';

describe('requestSchedule', () => {
  const game = {
    ...DEFAULT_SCHEDULE_GAME,
    id: 'game-1',
    datetime: '2026-08-20T19:30:00Z'
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(toast, 'displayToast').mockImplementation(() => undefined);
  });

  it('dispatches start and success with the returned games', async () => {
    const getByFilter = jest
      .spyOn(scheduleHttpClient, 'getByFilter')
      .mockResolvedValue([game]);
    const dispatch = jest.fn();

    await requestSchedule()(dispatch);

    expect(getByFilter).toHaveBeenCalledWith({});
    expect(dispatch).toHaveBeenCalledWith({
      type: REQUEST_ATHLETE_PROFILE_SCHEDULE
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: REQUEST_ATHLETE_PROFILE_SCHEDULE_SUCCESS,
      payload: [game]
    });
  });

  it('forwards the filter to the http client', async () => {
    const getByFilter = jest
      .spyOn(scheduleHttpClient, 'getByFilter')
      .mockResolvedValue([]);
    const dispatch = jest.fn();

    await requestSchedule({
      start_date: '2026-05-01',
      end_date: '2026-08-16'
    })(dispatch);

    expect(getByFilter).toHaveBeenCalledWith({
      start_date: '2026-05-01',
      end_date: '2026-08-16'
    });
  });

  it('dispatches failure and displays a toast when the request fails', async () => {
    const error = new Error('network down');
    jest.spyOn(scheduleHttpClient, 'getByFilter').mockRejectedValue(error);
    const dispatch = jest.fn();

    await requestSchedule()(dispatch);

    expect(dispatch).toHaveBeenCalledWith({
      type: REQUEST_ATHLETE_PROFILE_SCHEDULE_FAILURE,
      payload: error
    });
    expect(toast.displayToast).toHaveBeenCalledWith(
      expect.any(String),
      'is-danger'
    );
  });
});
