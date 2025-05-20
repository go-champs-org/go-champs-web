import React from 'react';
import { PlayerEntity } from './state';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

function RosterTable({
  players,
  playerBaseUrl
}: {
  players: PlayerEntity[];
  playerBaseUrl: string;
}) {
  return (
    <div className="table-container">
      <table className="table is-striped is-hoverable is-fullwidth is-narrow">
        <thead>
          <tr>
            <th>
              <Trans>fullName</Trans>
            </th>
            <th className="has-text-centered">
              <Trans>shirtName</Trans>
            </th>
            <th className="has-text-centered">
              <Trans>shirtNumber</Trans>
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>
                <Link
                  to={`${playerBaseUrl}/${player.id}`}
                  className="has-text-danger"
                >
                  {player.name}
                </Link>
              </td>
              <td className="has-text-centered">{player.shirtName}</td>
              <td className="has-text-centered">{player.shirtNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RosterTable;
