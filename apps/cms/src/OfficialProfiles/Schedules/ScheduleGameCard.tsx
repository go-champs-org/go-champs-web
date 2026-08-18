import React from 'react';
import { Link } from 'react-router-dom';
import { timeFromDate } from '../../Shared/datetime/format';
import { ScheduleGameEntity } from './state';

const teamLabel = (name: string, placeholder: string) =>
  name || placeholder || '-';

const ScheduleGameCard: React.FC<{ game: ScheduleGameEntity }> = ({ game }) => {
  const place = [game.location, game.city].filter(Boolean).join(' - ');

  const content = (
    <div className="card-content">
      <div className="columns is-mobile is-multiline">
        <div className="column is-6 is-size-7 has-text-weight-bold">
          {game.datetime && timeFromDate(game.datetime)}
        </div>

        <div className="column is-6 is-size-7 has-text-right">{place}</div>

        <div className="column is-12">
          <p className="is-size-6 has-text-weight-semibold">
            {teamLabel(game.homeTeamName, game.homePlaceholder)}
          </p>
          <p className="is-size-6 has-text-weight-semibold">
            {teamLabel(game.awayTeamName, game.awayPlaceholder)}
          </p>
        </div>

        <div className="column is-12 is-size-7">{game.tournamentName}</div>
      </div>
    </div>
  );

  const canLinkToGame = !!game.organizationSlug && !!game.tournamentSlug;

  return (
    <article className="card item" style={{ marginBottom: '.75rem' }}>
      {canLinkToGame ? (
        <Link
          to={`/${game.organizationSlug}/${game.tournamentSlug}/GameView/${game.id}`}
          className="has-text-dark"
          aria-label={`${teamLabel(
            game.homeTeamName,
            game.homePlaceholder
          )} x ${teamLabel(game.awayTeamName, game.awayPlaceholder)}`}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
};

export default ScheduleGameCard;
