import React from 'react';

import { FieldArrayRenderProps } from 'react-final-form-arrays';
import { PlayersMap } from '../Players/state';
import { PlayerStatEntity } from '../Tournaments/state';
import { Field } from 'react-final-form';
import StringInput from '../Shared/UI/Form/StringInput';
import { PlayerStatsLogEntity } from './state';

interface PlayerStatLogFormRowProps {
  name: string;
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  playerStatLog: PlayerStatsLogEntity;
}

function PlayerStatLogFormRow({
  name,
  players,
  playersStats,
  playerStatLog
}: PlayerStatLogFormRowProps): React.ReactElement {
  const playerName = players[playerStatLog.playerId]
    ? players[playerStatLog.playerId].shirtName ||
      players[playerStatLog.playerId].name
    : '';
  return (
    <tr>
      <td
        style={{
          paddingLeft: '0',
          width: '225px'
        }}
      >
        {playerName}
      </td>

      {playersStats.map((playerStat: PlayerStatEntity) => {
        const fieldName = playerStat.slug
          ? `${name}.stats.${playerStat.slug}`
          : `${name}.stats.${playerStat.id}`;
        return (
          <td key={playerStat.id} style={{ minWidth: '90px' }}>
            <Field
              name={fieldName}
              component={StringInput}
              className="has-text-centered"
              type="text"
            />
          </td>
        );
      })}
    </tr>
  );
}

function PlayerStatLogHeader({
  playetStatLog
}: {
  playetStatLog: PlayerStatEntity;
}) {
  return <th className="has-text-centered">{playetStatLog.title}</th>;
}

export interface GeneralPlayerStatsLogTableFormProps
  extends FieldArrayRenderProps<PlayerStatsLogEntity, HTMLElement> {
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
}

function GeneralPlayerStatsLogTableForm({
  players,
  fields,
  playersStats
}: GeneralPlayerStatsLogTableFormProps): React.ReactElement {
  return (
    <div className="container">
      <div className="table-container">
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th style={{ paddingLeft: '0' }}>Player</th>

              {playersStats.map((stat: PlayerStatEntity) => (
                <PlayerStatLogHeader key={stat.id} playetStatLog={stat} />
              ))}
            </tr>
          </thead>

          <tbody>
            {fields.map((name, index) => (
              <PlayerStatLogFormRow
                key={name}
                name={name}
                playerStatLog={fields.value[index]}
                players={players}
                playersStats={playersStats}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GeneralPlayerStatsLogTableForm;
