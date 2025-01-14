import React from 'react';
import { PlayersMap } from '../Players/state';
import { PlayerStatEntity } from '../Tournaments/state';
import StringInput from '../Shared/UI/Form/StringInput';
import { Field, FormRenderProps } from 'react-final-form';
import { GameEntity } from '../Games/state';
import { TeamEntity } from '../Teams/state';
import { FieldArray } from 'react-final-form-arrays';
import { PlayerStatsLogEntity, PlayerStatsLogsForm } from './state';
import LoadingButton from '../Shared/UI/LoadingButton';
import { Trans } from 'react-i18next';

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

const PlayerStatLogHeader: React.FC<{
  playetStatLog: PlayerStatEntity;
}> = ({ playetStatLog }) => (
  <th className="has-text-centered">{playetStatLog.title}</th>
);

interface FormProps extends FormRenderProps<PlayerStatsLogsForm> {
  game: GameEntity;
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  team: TeamEntity;
}

function Form({
  handleSubmit,
  players,
  playersStats,
  pristine,
  submitting,
  team
}: FormProps): React.ReactElement {
  return (
    <form onSubmit={handleSubmit} className="form column is-12">
      <div className="columns is-gapless is-mobile">
        <div className="column is-8">
          <h2 className="subtitle">{team.name}</h2>
        </div>

        <div className="column is-4 has-text-right">
          <LoadingButton
            isLoading={false}
            className="button is-primary"
            type="submit"
            disabled={submitting || pristine}
          >
            <Trans>save</Trans>
          </LoadingButton>
        </div>
      </div>

      <FieldArray name="playerStatsLogs">
        {({ fields }) => (
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
        )}
      </FieldArray>
    </form>
  );
}

export default Form;
