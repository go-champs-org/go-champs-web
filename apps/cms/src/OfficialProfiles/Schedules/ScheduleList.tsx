import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Shimmer from '../../Shared/UI/Shimmer';
import ScheduleGameCard from './ScheduleGameCard';
import { ScheduleGameEntity } from './state';

const LoadingCard: React.FC = () => (
  <div className="card item" style={{ marginBottom: '.75rem' }}>
    <div className="card-content">
      <Shimmer>
        <div style={{ height: '13px', marginBottom: '13px', width: '60%' }} />
      </Shimmer>
      <Shimmer>
        <div style={{ height: '13px', marginBottom: '13px', width: '80%' }} />
      </Shimmer>
      <Shimmer>
        <div style={{ height: '13px', width: '40%' }} />
      </Shimmer>
    </div>
  </div>
);

export const ScheduleListLoading: React.FC = () => (
  <div aria-busy="true">
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </div>
);

export const ScheduleListError: React.FC<{ onRetry: () => void }> = ({
  onRetry
}) => (
  <div className="notification is-danger" role="alert">
    <p style={{ marginBottom: '.75rem' }}>
      <Trans>scheduleLoadError</Trans>
    </p>
    <button className="button is-small" onClick={onRetry} type="button">
      <Trans>tryAgain</Trans>
    </button>
  </div>
);

export const ScheduleListEmpty: React.FC<{ messageKey: string }> = ({
  messageKey
}) => (
  <div className="hero is-dark is-small">
    <div className="hero-body">
      <div className="container">
        <p className="subtitle has-text-centered">
          <Trans>{messageKey}</Trans>
        </p>
      </div>
    </div>
  </div>
);

interface ScheduleListProps {
  dates: string[];
  gamesByDate: { [date: string]: ScheduleGameEntity[] };
}

const ScheduleList: React.FC<ScheduleListProps> = ({ dates, gamesByDate }) => {
  const { t } = useTranslation();

  return (
    <div>
      {dates.map((date: string) => (
        <section key={date} style={{ marginBottom: '1.5rem' }}>
          <h3 className="title is-6">{t('date', { date })}</h3>
          {gamesByDate[date].map((game: ScheduleGameEntity) => (
            <ScheduleGameCard key={game.id} game={game} />
          ))}
        </section>
      ))}
    </div>
  );
};

export default ScheduleList;
