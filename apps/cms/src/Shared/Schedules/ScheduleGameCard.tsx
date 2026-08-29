import React from 'react';
import { MigratedRouteLink } from '../UI/MigratedRouteLink';
import classNames from 'classnames';
import { timeFromDate } from '../datetime/format';
import { ScheduleGameEntity } from './state';
import './ScheduleGameCard.scss';

const teamLabel = (name: string, placeholder: string) =>
  name || placeholder || '-';

interface TeamRowProps {
  canDisplayScore: boolean;
  isWinning: boolean;
  label: string;
  score: number;
}

function TeamRow({ canDisplayScore, isWinning, label, score }: TeamRowProps) {
  const rowClasses = classNames('columns', 'is-mobile', 'schedule-team-row', {
    'has-text-weight-bold': isWinning
  });

  return (
    <div className={rowClasses}>
      <div className="column is-9">{label}</div>
      <div className="column is-3 has-text-right">
        {canDisplayScore && score}
      </div>
    </div>
  );
}

function ScheduleGameCard({ game }: { game: ScheduleGameEntity }) {
  const place = [game.location, game.city].filter(Boolean).join(' - ');
  // Scores only mean something once the game has been played or is under way.
  const canDisplayScore = game.isFinished || game.liveState === 'in_progress';

  const homeLabel = teamLabel(game.homeTeamName, game.homePlaceholder);
  const awayLabel = teamLabel(game.awayTeamName, game.awayPlaceholder);

  const content = (
    <div className="card-content">
      <div className="columns is-mobile is-multiline">
        <div className="column is-6 is-size-7 has-text-weight-bold">
          {game.datetime && timeFromDate(game.datetime)}
        </div>

        <div className="column is-6 is-size-7 has-text-right">{place}</div>

        <div className="column is-12 is-size-6">
          <TeamRow
            canDisplayScore={canDisplayScore}
            isWinning={game.isFinished && game.homeScore > game.awayScore}
            label={homeLabel}
            score={game.homeScore}
          />
          <TeamRow
            canDisplayScore={canDisplayScore}
            isWinning={game.isFinished && game.awayScore > game.homeScore}
            label={awayLabel}
            score={game.awayScore}
          />
        </div>
      </div>
    </div>
  );

  const canLinkToGame = !!game.organizationSlug && !!game.tournamentSlug;

  return (
    <article className="card item schedule-game-card">
      {canLinkToGame ? (
        <MigratedRouteLink
          to={`/${game.organizationSlug}/${game.tournamentSlug}/GameView/${game.id}`}
          className="has-text-dark"
          aria-label={`${homeLabel} x ${awayLabel}`}
        >
          {content}
        </MigratedRouteLink>
      ) : (
        content
      )}
    </article>
  );
}

export default ScheduleGameCard;
