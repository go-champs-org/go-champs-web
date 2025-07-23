import React, { useEffect, useRef } from 'react';
import { GeneralPlayerStatsLogTableFormProps } from '../../PlayerStatsLog/GeneralPlayerStatsLogTableForm';
import { PlayerStatEntity } from '../../Tournaments/state';
import { TFunction, Trans, useTranslation } from 'react-i18next';
import { mapPlayerMapToPlayerDisplayName } from '../../Players/dataMappers';
import { PlayerStatsLogEntity } from '../../PlayerStatsLog/state';
import { PlayersMap } from '../../Players/state';
import { Field, FieldInputProps } from 'react-final-form';
import './PlayerStatsLogTableForm.scss';

function MinutesCell({ value, onChange }: FieldInputProps<string>) {
  const totalSeconds = parseInt(value || '0', 10);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const timeValue = `${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = e.target.value; // Format: "MM:SS"
    if (timeString) {
      const [minutesStr, secondsStr] = timeString.split(':');
      const newMinutes = parseInt(minutesStr || '0', 10);
      const newSeconds = parseInt(secondsStr || '0', 10);
      const newTotalSeconds = newMinutes * 60 + newSeconds;
      onChange(newTotalSeconds.toString());
    } else {
      onChange('0');
    }
  };

  return (
    <input
      type="time"
      className="input"
      value={timeValue}
      onChange={handleTimeChange}
      style={{ width: '90px' }}
      title="Playing time (MM:SS)"
    />
  );
}

function PointsCell({
  playerStatLog
}: {
  playerStatLog: PlayerStatsLogEntity;
}) {
  const onePointMade = playerStatLog.stats.free_throws_made
    ? Number(playerStatLog.stats.free_throws_made)
    : 0;
  const twoPointsMade = playerStatLog.stats.field_goals_made
    ? Number(playerStatLog.stats.field_goals_made)
    : 0;
  const threePointsMade = playerStatLog.stats.three_point_field_goals_made
    ? Number(playerStatLog.stats.three_point_field_goals_made)
    : 0;
  const points = onePointMade + twoPointsMade * 2 + threePointsMade * 3;
  return <>{points}</>;
}

function CheckCell({ value, onChange }: FieldInputProps<string>) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked ? '1' : '0');
  };
  return (
    <input type="checkbox" checked={value === '1'} onChange={handleOnChange} />
  );
}

function NumberCell({ value, onChange }: FieldInputProps<string>) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? '0' : e.target.value;

    onChange(newValue);
  };
  return (
    <input
      type="number"
      className="input"
      value={value || '0'}
      onChange={handleOnChange}
      min={0}
    />
  );
}

interface BaseStatConfig {
  order: number;
  slug: string;
  translationKey: string;
  cell: (
    input: FieldInputProps<string>,
    playerStatLog: PlayerStatsLogEntity
  ) => React.ReactElement;
}

const STATS_CONFIG: { [key: string]: BaseStatConfig } = {
  game_played: {
    order: 1,
    slug: 'game_played',
    translationKey: 'gamePlayed',
    cell: (input, playerStatLog) => (
      <>
        <CheckCell {...input} />
      </>
    )
  },
  game_started: {
    order: 2,
    slug: 'game_started',
    translationKey: 'gameStarted',
    cell: (input, playerStatLog) => (
      <>
        <CheckCell {...input} />
      </>
    )
  },
  points: {
    order: 3,
    slug: 'points',
    translationKey: 'points',
    cell: (input, playerStatLog) => (
      <>
        <PointsCell playerStatLog={playerStatLog} />
      </>
    )
  },
  free_throws_made: {
    order: 4,
    slug: 'free_throws_made',
    translationKey: 'freeThrowsMade',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  free_throws_missed: {
    order: 5,
    slug: 'free_throws_missed',
    translationKey: 'freeThrowsMissed',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  field_goals_made: {
    order: 6,
    slug: 'field_goals_made',
    translationKey: 'fieldGoalsMade',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  field_goals_missed: {
    order: 7,
    slug: 'field_goals_missed',
    translationKey: 'fieldGoalsMissed',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  three_point_field_goals_made: {
    order: 8,
    slug: 'three_point_field_goals_made',
    translationKey: 'threePointFieldGoalsMade',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  three_point_field_goals_missed: {
    order: 9,
    slug: 'three_point_field_goals_missed',
    translationKey: 'threePointFieldGoalsMissed',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  rebounds_defensive: {
    order: 10,
    slug: 'rebounds_defensive',
    translationKey: 'reboundsDefensive',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  rebounds_offensive: {
    order: 11,
    slug: 'rebounds_offensive',
    translationKey: 'reboundsOffensive',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  assists: {
    order: 12,
    slug: 'assists',
    translationKey: 'assists',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  blocks: {
    order: 13,
    slug: 'blocks',
    translationKey: 'blocks',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  steals: {
    order: 14,
    slug: 'steals',
    translationKey: 'steals',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  turnovers: {
    order: 15,
    slug: 'turnovers',
    translationKey: 'turnovers',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  fouls_personal: {
    order: 16,
    slug: 'fouls_personal',
    translationKey: 'foulsPersonal',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  fouls_flagrant: {
    order: 17,
    slug: 'fouls_flagrant',
    translationKey: 'foulsFlagrant',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  fouls_technical: {
    order: 18,
    slug: 'fouls_technical',
    translationKey: 'foulsTechnical',
    cell: (input, playerStatLog) => (
      <>
        <NumberCell {...input} />
      </>
    )
  },
  minutes_played: {
    order: 19,
    slug: 'minutes_played',
    translationKey: 'minutesPlayed',
    cell: (input, playerStatLog) => (
      <>
        <MinutesCell {...input} />
      </>
    )
  }
};

interface StatConfig extends BaseStatConfig {
  header: string;
  legend: string;
}

function PlayerStatsLogTableHeader({
  header,
  tooltipText
}: {
  header: string;
  tooltipText: string;
}) {
  return (
    <th
      className="has-text-centered has-tooltip-bottom"
      data-tooltip={tooltipText}
    >
      {header}
    </th>
  );
}

interface PlayerStatsLogTableRowProps {
  name: string;
  players: PlayersMap;
  playerStatLog: PlayerStatsLogEntity;
  statConfigs: StatConfig[];
}

function PlayerStatsLogTableRow({
  name,
  players,
  playerStatLog,
  statConfigs
}: PlayerStatsLogTableRowProps) {
  const playerName = mapPlayerMapToPlayerDisplayName(
    players,
    playerStatLog.playerId
  );
  return (
    <tr>
      <td className="player">{playerName}</td>
      <td className="player-span"></td>
      {statConfigs.map(statConfig => {
        const fieldName = `${name}.stats.${statConfig.slug}`;
        return (
          <td key={statConfig.slug} className="stat-control has-text-centered">
            <Field
              name={fieldName}
              render={({ input }) =>
                statConfig.cell ? statConfig.cell(input, playerStatLog) : <></>
              }
            />
          </td>
        );
      })}
    </tr>
  );
}

function generateStatsFormConfigs(
  playersStats: PlayerStatEntity[],
  t: TFunction
): StatConfig[] {
  return playersStats
    .map(playerStat => {
      const statConfig = STATS_CONFIG[playerStat.slug];
      return statConfig
        ? {
            order: statConfig.order,
            cell: statConfig.cell,
            slug: statConfig.slug,
            translationKey: statConfig.translationKey,
            header: t(
              `sports.basketball_5x5.playerStatFormTable.statColums.${statConfig.translationKey}.abbreviation`,
              {
                keySeparator: '.',
                defaultValue: statConfig.slug
              }
            ),
            legend: t(
              `sports.basketball_5x5.playerStatFormTable.statColums.${statConfig.translationKey}.legend`,
              {
                keySeparator: '.',
                defaultValue: statConfig.slug
              }
            )
          }
        : null;
    })
    .filter(statConfig => statConfig !== null)
    .sort((a, b) => (a.order > b.order ? 1 : -1));
}

function PlayerStatsLogTableForm({
  playersStats,
  fields,
  players
}: GeneralPlayerStatsLogTableFormProps) {
  const { t } = useTranslation();
  const statsFormConfigs = generateStatsFormConfigs(playersStats, t);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        if (tableContainerRef.current.scrollLeft > 0) {
          tableContainerRef.current.classList.add('is-scrolling');
        } else {
          tableContainerRef.current.classList.remove('is-scrolling');
        }
      }
    };

    const tableContainerElem = tableContainerRef.current;
    if (tableContainerElem) {
      tableContainerElem.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainerElem) {
        tableContainerElem.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="basketball-5x5-stats-table-form container">
      <div className="table-container" ref={tableContainerRef}>
        <table className="table is-fullwidth is-custom-striped is-narrow">
          <thead>
            <tr>
              <th className="player">
                <Trans>player</Trans>
              </th>

              <th className="player-span"></th>

              {statsFormConfigs.map(statConfig => (
                <PlayerStatsLogTableHeader
                  key={statConfig.slug}
                  header={statConfig.header}
                  tooltipText={statConfig.legend}
                />
              ))}
            </tr>
          </thead>

          <tbody>
            {fields.map((name, index) => (
              <PlayerStatsLogTableRow
                key={name}
                name={name}
                players={players}
                playerStatLog={fields.value[index]}
                statConfigs={statsFormConfigs}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerStatsLogTableForm;
