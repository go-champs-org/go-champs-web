import React, { useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import moment from 'moment';
import ComponentLoader from '../UI/ComponentLoader';
import { RequestFilter } from '../httpClient/requestFilter';
import {
  initialScheduleDate,
  nextScheduleDate,
  previousScheduleDate
} from './selectors';
import ScheduleCalendar from './ScheduleCalendar';
import ScheduleList, {
  ScheduleListEmpty,
  ScheduleListError,
  ScheduleListLoading
} from './ScheduleList';
import { ScheduleGameEntity } from './state';

/** How much schedule is pulled in one request, in days. Walking off either end
 * of the loaded range pulls another window of the same size, so the schedule
 * reaches as far back and as far ahead as the profile owner keeps navigating. */
const WINDOW_IN_DAYS = 30;

const today = () => moment().format('YYYY-MM-DD');

const shiftDate = (date: string, days: number) =>
  moment(date)
    .add(days, 'days')
    .format('YYYY-MM-DD');

interface DateRange {
  startDate: string;
  endDate: string;
}

interface PendingJump {
  direction: 'past' | 'upcoming';
  afterLoad: number;
}

export interface ScheduleProps {
  dates: string[];
  gamesByDate: { [date: string]: ScheduleGameEntity[] };
  hasError: boolean;
  /** Nothing to schedule until the profile is linked to a tournament, which
   * reads better than an empty day. */
  hasLinkedTournaments: boolean;
  isLoading: boolean;
  notLinkedMessageKey: string;
  requestSchedule: (where: RequestFilter) => Promise<void>;
  sectionTitleClassName: string;
}

function Schedule({
  dates,
  gamesByDate,
  hasError,
  hasLinkedTournaments,
  isLoading,
  notLinkedMessageKey,
  requestSchedule,
  sectionTitleClassName
}: ScheduleProps) {
  const [selectedDate, setSelectedDate] = useState(today);
  // The range already asked for. Extending it never refetches what is loaded:
  // only the new slice is requested, and the reducer merges it in.
  const [loadedRange, setLoadedRange] = useState<DateRange>(() => ({
    startDate: shiftDate(today(), -WINDOW_IN_DAYS),
    endDate: shiftDate(today(), WINDOW_IN_DAYS)
  }));
  const [rangeToRequest, setRangeToRequest] = useState<DateRange>(loadedRange);
  // Counts responses rather than reading isLoading: a request dispatched from
  // this render is not yet reflected in the isLoading of this render, so the
  // effects below would otherwise act on the previous window's games.
  const [completedLoads, setCompletedLoads] = useState(0);
  const [hasPickedInitialDate, setHasPickedInitialDate] = useState(false);
  // Set while a day off the loaded edge was asked for, so the newly loaded
  // games can be jumped to once they arrive.
  const [pendingJump, setPendingJump] = useState<PendingJump | null>(null);

  const loadRange = useCallback(
    (range: DateRange) =>
      requestSchedule({
        start_date: range.startDate,
        end_date: range.endDate
      }),
    [requestSchedule]
  );

  useEffect(() => {
    let isCurrent = true;

    loadRange(rangeToRequest).then(() => {
      if (isCurrent) {
        setCompletedLoads((loads: number) => loads + 1);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, [loadRange, rangeToRequest]);

  // Today is only worth opening on when it has games. Otherwise the calendar
  // starts on the next day that does, or on the last one that did.
  useEffect(() => {
    if (hasPickedInitialDate || completedLoads === 0) {
      return;
    }

    setSelectedDate((currentDate: string) =>
      initialScheduleDate(dates, currentDate)
    );
    setHasPickedInitialDate(true);
  }, [completedLoads, dates, hasPickedInitialDate]);

  // Jump to the closest day of the range that was just loaded. Staying put is
  // the right outcome when it came back empty — the arrow can be pressed again
  // to reach further out.
  useEffect(() => {
    if (!pendingJump || completedLoads <= pendingJump.afterLoad) {
      return;
    }

    const target =
      pendingJump.direction === 'past'
        ? previousScheduleDate(dates, selectedDate)
        : nextScheduleDate(dates, selectedDate);

    if (target) {
      setSelectedDate(target);
    }

    setPendingJump(null);
  }, [completedLoads, dates, pendingJump, selectedDate]);

  const goToPreviousDate = () => {
    const previousDate = previousScheduleDate(dates, selectedDate);

    if (previousDate) {
      setSelectedDate(previousDate);
      return;
    }

    const startDate = shiftDate(loadedRange.startDate, -WINDOW_IN_DAYS);
    setRangeToRequest({
      startDate,
      endDate: shiftDate(loadedRange.startDate, -1)
    });
    setLoadedRange({ ...loadedRange, startDate });
    setPendingJump({ direction: 'past', afterLoad: completedLoads });
  };

  const goToNextDate = () => {
    const nextDate = nextScheduleDate(dates, selectedDate);

    if (nextDate) {
      setSelectedDate(nextDate);
      return;
    }

    const endDate = shiftDate(loadedRange.endDate, WINDOW_IN_DAYS);
    setRangeToRequest({
      startDate: shiftDate(loadedRange.endDate, 1),
      endDate
    });
    setLoadedRange({ ...loadedRange, endDate });
    setPendingJump({ direction: 'upcoming', afterLoad: completedLoads });
  };

  const renderContent = () => {
    if (hasError) {
      return <ScheduleListError onRetry={() => loadRange(rangeToRequest)} />;
    }

    if (!hasLinkedTournaments) {
      return <ScheduleListEmpty messageKey={notLinkedMessageKey} />;
    }

    return <ScheduleList games={gamesByDate[selectedDate] || []} />;
  };

  // Only the very first load has nothing to show behind it; later loads keep
  // the current day on screen and spin the arrows instead.
  const isFirstLoad = completedLoads === 0 && !hasError;

  return (
    <div>
      <h2 className={sectionTitleClassName}>
        <Trans>mySchedule</Trans>
      </h2>

      <ScheduleCalendar
        isLoading={isLoading}
        onNextDate={goToNextDate}
        onPreviousDate={goToPreviousDate}
        selectedDate={selectedDate}
      >
        <ComponentLoader
          canRender={!isFirstLoad}
          loader={<ScheduleListLoading />}
        >
          {renderContent()}
        </ComponentLoader>
      </ScheduleCalendar>
    </div>
  );
}

export default Schedule;
