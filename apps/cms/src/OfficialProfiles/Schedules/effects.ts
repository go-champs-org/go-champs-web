import { Dispatch } from 'redux';
import i18n from '../../Shared/translations/i18n';
import { displayToast } from '../../Shared/bulma/toast';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import {
  requestScheduleFailure,
  requestScheduleStart,
  requestScheduleSuccess
} from './actions';
import scheduleHttpClient from './scheduleHttpClient';

export const requestSchedule = (where: RequestFilter = {}) => async (
  dispatch: Dispatch
) => {
  dispatch(requestScheduleStart());

  try {
    const games = await scheduleHttpClient.getByFilter(where);

    dispatch(requestScheduleSuccess(games));
  } catch (err) {
    dispatch(requestScheduleFailure(err));
    displayToast(i18n.t('scheduleLoadError'), 'is-danger');
  }
};
