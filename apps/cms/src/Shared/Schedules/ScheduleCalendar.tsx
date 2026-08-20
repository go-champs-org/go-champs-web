import React, { Fragment, ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import classNames from 'classnames';

interface ScheduleCalendarProps {
  children: ReactNode;
  isLoading: boolean;
  onNextDate: () => void;
  onPreviousDate: () => void;
  selectedDate: string;
}

/** Day-by-day navigation over the schedule, in the shape of
 * `Games/ListByCalendar`. The arrows never disable: reaching the edge of the
 * loaded window asks the page for the adjacent range instead. */
function ScheduleCalendar({
  children,
  isLoading,
  onNextDate,
  onPreviousDate,
  selectedDate
}: ScheduleCalendarProps) {
  const { t } = useTranslation();

  const buttonClasses = classNames('button', { 'is-loading': isLoading });

  return (
    <Fragment>
      <nav className="columns is-mobile is-vcentered">
        <div className="column is-2">
          <button
            aria-label={t('previousDate')}
            className={buttonClasses}
            onClick={onPreviousDate}
            type="button"
          >
            <span className="icon is-small">
              <i className="fas fa-chevron-left" />
            </span>
          </button>
        </div>

        <div className="column has-text-centered">
          <h3 className="title is-5 notranslate">
            <Trans values={{ date: selectedDate }}>date</Trans>
          </h3>
        </div>

        <div className="column is-2 has-text-right">
          <button
            aria-label={t('nextDate')}
            className={buttonClasses}
            onClick={onNextDate}
            type="button"
          >
            <span className="icon is-small">
              <i className="fas fa-chevron-right" />
            </span>
          </button>
        </div>
      </nav>

      {children}
    </Fragment>
  );
}

export default ScheduleCalendar;
