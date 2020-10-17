import React from 'react';
import { PlayerEntity } from '../Players/state';
import { PlayerStatEntity } from '../Tournaments/state';
import { PlayerStatLog } from './selectors';
import StringInput from '../Shared/UI/Form/StringInput';
import { Field } from 'react-final-form';

interface PlayerStatLogFormRowProps {
  players: { [id: string]: PlayerEntity };
  playersStats: PlayerStatEntity[];
  playerStatLog: PlayerStatLog;
}

function PlayerStatLogFormRow({
  players,
  playersStats,
  playerStatLog
}: PlayerStatLogFormRowProps): React.ReactElement {
  return (
    <tr>
      <td
        style={{
          paddingLeft: '0',
          width: '225px'
        }}
      >
        {players[playerStatLog.playerId] &&
          players[playerStatLog.playerId].name}
      </td>

      {playersStats.map((playerStat: PlayerStatEntity) => (
        <td
          key={playerStat.id}
          className="has-text-centered"
          style={{ minWidth: '90px' }}
        >
          {/* TODO (lairjr): Enable form array
             <Field
            name={`${name}.stats.${playerStat.id}`}
            component={StringInput}
            type="text"
          /> */}
        </td>
      ))}
    </tr>
  );
}

const PlayerStatLogHeader: React.FC<{
  playetStatLog: PlayerStatEntity;
}> = ({ playetStatLog }) => (
  <th className="has-text-centered">{playetStatLog.title}</th>
);

interface FormProps {
  players: { [id: string]: PlayerEntity };
  playersStats: PlayerStatEntity[];
  playerStatLogs: PlayerStatLog[];
}

function Form({
  players,
  playersStats,
  playerStatLogs
}: FormProps): React.ReactElement {
  return (
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
          {playerStatLogs.map((playerStatLog: PlayerStatLog) => (
            <PlayerStatLogFormRow
              playerStatLog={playerStatLog}
              players={players}
              playersStats={playersStats}
              key={playerStatLog.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Form;
