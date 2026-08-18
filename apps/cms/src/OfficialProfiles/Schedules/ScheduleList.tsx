import React from 'react';
import { Trans } from 'react-i18next';
import Shimmer from '../../Shared/UI/Shimmer';
import ScheduleGameCard from './ScheduleGameCard';
import { ScheduleTournamentGroup, groupGamesByTournament } from './selectors';
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
  games: ScheduleGameEntity[];
}

/** The games of a single day, grouped by tournament. */
const ScheduleList: React.FC<ScheduleListProps> = ({ games }) => {
  if (games.length === 0) {
    return <ScheduleListEmpty messageKey="noGamesScheduled" />;
  }

  return (
    <div>
      {groupGamesByTournament(games).map((group: ScheduleTournamentGroup) => (
        <section key={group.tournamentId} style={{ marginBottom: '1.5rem' }}>
          <h4 className="title is-6">{group.tournamentName}</h4>
          {group.games.map((game: ScheduleGameEntity) => (
            <ScheduleGameCard key={game.id} game={game} />
          ))}
        </section>
      ))}
    </div>
  );
};

export default ScheduleList;
