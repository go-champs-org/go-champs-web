import React from 'react';
import { Trans } from 'react-i18next';
import Shimmer from '../UI/Shimmer';
import ScheduleGameCard from './ScheduleGameCard';
import { ScheduleTournamentGroup, groupGamesByTournament } from './selectors';
import { ScheduleGameEntity } from './state';

function LoadingCard() {
  return (
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
}

export function ScheduleListLoading() {
  return (
    <div aria-busy="true">
      <LoadingCard />
      <LoadingCard />
      <LoadingCard />
    </div>
  );
}

export function ScheduleListError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="notification is-danger" role="alert">
      <p style={{ marginBottom: '.75rem' }}>
        <Trans>scheduleLoadError</Trans>
      </p>
      <button className="button is-small" onClick={onRetry} type="button">
        <Trans>tryAgain</Trans>
      </button>
    </div>
  );
}

export function ScheduleListEmpty({ messageKey }: { messageKey: string }) {
  return (
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
}

interface ScheduleListProps {
  games: ScheduleGameEntity[];
}

/** The games of a single day, grouped by tournament. */
function ScheduleList({ games }: ScheduleListProps) {
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
}

export default ScheduleList;
