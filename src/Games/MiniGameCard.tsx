import React from 'react';
import { GameEntity } from './state';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { timeFromDate } from '../Shared/datetime/format';
import TeamAndScore from './TeamAndScore';

function MiniGameCard({
  baseUrl,
  game
}: {
  baseUrl: string;
  game: GameEntity;
}) {
  const awayTeamClasses = classNames({
    'has-text-weight-semibold': game.awayScore > game.homeScore
  });
  const awayScoreClasses = classNames({
    'has-text-weight-semibold': game.awayScore > game.homeScore
  });
  const homeTeamClasses = classNames({
    'has-text-weight-semibold': game.homeScore > game.awayScore
  });
  const homeScoreClasses = classNames({
    'has-text-weight-semibold': game.homeScore > game.awayScore
  });

  return (
    <div className="card item">
      <Link to={`${baseUrl}/GameView/${game.id}`} className="has-text-dark">
        <div className="card-content">
          <div className="columns is-multiline is-mobile">
            <div className="column is-12 is-size-7 has-text-weight-bold">
              <div className="columns is-mobile">
                <div className="column is-8" style={{ padding: '.3rem' }}>
                  {game.datetime && timeFromDate(game.datetime)}
                </div>

                <div
                  className="column is-4 has-text-right"
                  style={{ padding: '.3rem' }}
                >
                  {game.location}
                </div>
              </div>
            </div>

            <div className="column is-12">
              <TeamAndScore
                team={game.awayTeam}
                score={game.awayScore}
                canDisplayScore={game.isFinished}
                customTeamClasses={awayTeamClasses}
                customScoreClasses={awayScoreClasses}
                placeholder={game.awayPlaceholder}
              />
            </div>

            <div className="column is-12">
              <TeamAndScore
                team={game.homeTeam}
                score={game.homeScore}
                canDisplayScore={game.isFinished}
                customTeamClasses={homeTeamClasses}
                customScoreClasses={homeScoreClasses}
                placeholder={game.homePlaceholder}
              />
            </div>
          </div>
        </div>

        {game.info && (
          <footer className="card-footer has-text-centered">
            <span className="card-footer-item has-text-centered is-paddingless is-size-7">
              {game.info}
            </span>
          </footer>
        )}
      </Link>
    </div>
  );
}

export default MiniGameCard;
