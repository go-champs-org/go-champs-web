import React from 'react';
import { GameEntity } from './state';
import Card from './Card';
import { MigratedRouteLink } from '../Shared/UI/MigratedRouteLink';
import { Trans } from 'react-i18next';

interface ListByDateProps {
  baseUrl: string;
  dates: string[];
  gamesByDate: { [date: string]: GameEntity[] };
}

function ListByDate({ gamesByDate, baseUrl, dates }: ListByDateProps) {
  if (dates.length === 0) {
    return (
      <div className="box">
        <div className="content">
          <h2
            className="title is-6 has-text-centered"
            style={{ margin: 'auto' }}
          >
            <Trans>noGames</Trans>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      {dates.map((date: string) => (
        <div key={date} style={{ marginBottom: '2rem' }}>
          {gamesByDate[date].map((game: GameEntity) => {
            return (
              <MigratedRouteLink
                key={game.id}
                to={`${baseUrl}/GameView/${game.id}`}
              >
                <Card game={game} />
              </MigratedRouteLink>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ListByDate;
