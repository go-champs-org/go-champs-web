import React, { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import moment from 'moment';
import { StoreState } from '../../store';
import ComponentLoader from '../../Shared/UI/ComponentLoader';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { requestSchedule } from './effects';
import {
  scheduleDates,
  scheduleGamesByDate,
  scheduleHasError,
  scheduleLoading
} from './selectors';
import ScheduleList, {
  ScheduleListEmpty,
  ScheduleListError,
  ScheduleListLoading
} from './ScheduleList';

const PAST_WINDOW_IN_DAYS = 90;

type ScheduleWindow = 'upcoming' | 'past';

const filterForWindow = (scheduleWindow: ScheduleWindow): RequestFilter => {
  if (scheduleWindow === 'upcoming') {
    // No filter: the API defaults to yesterday through 30 days ahead.
    return {};
  }

  return {
    start_date: moment()
      .subtract(PAST_WINDOW_IN_DAYS, 'days')
      .format('YYYY-MM-DD'),
    end_date: moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD')
  };
};

const mapStateToProps = (state: StoreState) => ({
  dates: scheduleDates(state.officialProfiles.schedules),
  gamesByDate: scheduleGamesByDate(state.officialProfiles.schedules),
  hasError: scheduleHasError(state.officialProfiles.schedules),
  isLoading: scheduleLoading(state.officialProfiles.schedules)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ requestSchedule }, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

interface ScheduleOwnProps {
  hasLinkedTournaments: boolean;
}

type ScheduleProps = ConnectedProps<typeof connector> & ScheduleOwnProps;

function Schedule({
  dates,
  gamesByDate,
  hasError,
  hasLinkedTournaments,
  isLoading,
  requestSchedule
}: ScheduleProps) {
  const [scheduleWindow, setScheduleWindow] = useState<ScheduleWindow>(
    'upcoming'
  );

  const loadSchedule = useCallback(() => {
    requestSchedule(filterForWindow(scheduleWindow));
  }, [requestSchedule, scheduleWindow]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  // Past games read most recent first, upcoming games read closest first.
  const orderedDates = scheduleWindow === 'past' ? [...dates].reverse() : dates;

  const renderContent = () => {
    if (hasError) {
      return <ScheduleListError onRetry={loadSchedule} />;
    }

    if (!hasLinkedTournaments) {
      return <ScheduleListEmpty messageKey="notInvitedToTournamentsYet" />;
    }

    if (orderedDates.length === 0) {
      return (
        <ScheduleListEmpty
          messageKey={
            scheduleWindow === 'past' ? 'noPastGames' : 'noScheduledGames'
          }
        />
      );
    }

    return <ScheduleList dates={orderedDates} gamesByDate={gamesByDate} />;
  };

  return (
    <div>
      <h2 className="title is-5">
        <Trans>mySchedule</Trans>
      </h2>

      <div className="tabs is-boxed">
        <ul>
          <li className={scheduleWindow === 'upcoming' ? 'is-active' : ''}>
            <button
              className="button is-text"
              type="button"
              aria-current={scheduleWindow === 'upcoming'}
              onClick={() => setScheduleWindow('upcoming')}
            >
              <Trans>upcomingGames</Trans>
            </button>
          </li>
          <li className={scheduleWindow === 'past' ? 'is-active' : ''}>
            <button
              className="button is-text"
              type="button"
              aria-current={scheduleWindow === 'past'}
              onClick={() => setScheduleWindow('past')}
            >
              <Trans>pastGames</Trans>
            </button>
          </li>
        </ul>
      </div>

      <ComponentLoader canRender={!isLoading} loader={<ScheduleListLoading />}>
        {renderContent()}
      </ComponentLoader>
    </div>
  );
}

export default connector(Schedule);
