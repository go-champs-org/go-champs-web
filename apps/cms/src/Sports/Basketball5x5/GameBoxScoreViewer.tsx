import React, { useState } from 'react';
import { BoxScoreViewerProps } from '../../Pages/GameView';
import { StatsLogRenderEntity } from '../../PlayerStatsLog/View';
import { TeamEntity } from '../../Teams/state';
import { PlayersMap } from '../../Players/state';
import GameBoxScoreTable, { StatColumn } from '../../Shared/GameBoxScoreTable';
import { Trans, useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import {
  MinutesCell,
  PercetualCell,
  ValueOrEmptyCell
} from '../../Shared/UI/TableCells';

function byStatValue(key: string) {
  return (
    playerStatLogA: StatsLogRenderEntity,
    playerStatLogB: StatsLogRenderEntity
  ) => Number(playerStatLogB.stats[key]) - Number(playerStatLogA.stats[key]);
}

interface BaseStatColumn {
  id: string;
  cell: (playerStatLog: StatsLogRenderEntity) => React.ReactElement;
  cellStyle?: React.CSSProperties;
  sortFunction: (
    playerStatLogA: StatsLogRenderEntity,
    playerStatLogB: StatsLogRenderEntity
  ) => number;
}

const BASE_BASKETBALL_STAT_COLUMNS: BaseStatColumn[] = [
  {
    id: 'minutesPlayed',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <MinutesCell value={playerStatLog.stats.minutes_played} />
    ),
    sortFunction: byStatValue('minutes_played')
  },
  {
    id: 'points',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.points} />
    ),
    sortFunction: byStatValue('points')
  },
  {
    id: 'rebounds',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds} />
    ),
    sortFunction: byStatValue('rebounds')
  },
  {
    id: 'assists',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.assists} />
    ),
    sortFunction: byStatValue('assists')
  },
  {
    id: 'blocks',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.blocks} />
    ),
    sortFunction: byStatValue('blocks')
  },
  {
    id: 'steals',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.steals} />
    ),
    sortFunction: byStatValue('steals')
  },
  {
    id: 'turnovers',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.turnovers} />
    ),
    sortFunction: byStatValue('turnovers')
  },
  {
    id: 'efficiency',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.efficiency} />
    ),
    sortFunction: byStatValue('efficiency')
  },

  {
    id: 'plusMinus',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.plus_minus} />
    ),
    sortFunction: byStatValue('plus_minus')
  },
  {
    id: 'onePointers',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <>
        <ValueOrEmptyCell value={playerStatLog.stats.free_throws_made} />
        {' / '}
        <ValueOrEmptyCell value={playerStatLog.stats.free_throws_attempted} />
      </>
    ),
    cellStyle: { minWidth: '75px' },
    sortFunction: byStatValue('free_throw_percentage')
  },
  {
    id: 'onePointersPercentage',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <PercetualCell value={playerStatLog.stats.free_throw_percentage} />
    ),
    sortFunction: byStatValue('free_throw_percentage')
  },
  {
    id: 'twoPointers',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <>
        <ValueOrEmptyCell value={playerStatLog.stats.field_goals_made} />
        {' / '}
        <ValueOrEmptyCell value={playerStatLog.stats.field_goals_attempted} />
      </>
    ),
    cellStyle: { minWidth: '75px' },
    sortFunction: byStatValue('field_goal_percentage')
  },
  {
    id: 'twoPointersPercentage',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <PercetualCell value={playerStatLog.stats.field_goal_percentage} />
    ),
    sortFunction: byStatValue('field_goal_percentage')
  },
  {
    id: 'threePointers',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <>
        <ValueOrEmptyCell
          value={playerStatLog.stats.three_point_field_goals_made}
        />
        {' / '}
        <ValueOrEmptyCell
          value={playerStatLog.stats.three_point_field_goals_attempted}
        />
      </>
    ),
    cellStyle: { minWidth: '75px' },
    sortFunction: byStatValue('three_point_field_goal_percentage')
  },
  {
    id: 'threePointersPercentage',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <PercetualCell
        value={playerStatLog.stats.three_point_field_goal_percentage}
      />
    ),
    sortFunction: byStatValue('three_point_field_goal_percentage')
  },
  {
    id: 'reboundsOffensive',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds_offensive} />
    ),
    sortFunction: byStatValue('rebounds_offensive')
  },
  {
    id: 'reboundsDefensive',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds_defensive} />
    ),
    sortFunction: byStatValue('rebounds_defensive')
  },
  {
    id: 'foulsPersonal',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.fouls_personal} />
    ),
    sortFunction: byStatValue('fouls_personal')
  },
  {
    id: 'foulsTechnical',
    cell: (playerStatLog: StatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.fouls_technical} />
    ),
    sortFunction: byStatValue('fouls_technical')
  }
];

function generateStatColumns(t: TFunction): StatColumn[] {
  return BASE_BASKETBALL_STAT_COLUMNS.map(baseStatColumn => {
    return {
      id: baseStatColumn.id,
      header: t(
        `sports.basketball_5x5.boxScoreViewer.playerStatColumns.${baseStatColumn.id}.abbreviation`,
        {
          keySeparator: '.',
          defaultValue: baseStatColumn.id
        }
      ),
      cell: baseStatColumn.cell,
      cellStyle: baseStatColumn.cellStyle,
      legend: t(
        `sports.basketball_5x5.boxScoreViewer.playerStatColumns.${baseStatColumn.id}.legend`,
        {
          keySeparator: '.',
          defaultValue: baseStatColumn.id
        }
      )
    };
  });
}

function findSortFunction(statId: string) {
  const statColumn = BASE_BASKETBALL_STAT_COLUMNS.find(
    baseStatColumn => baseStatColumn.id === statId
  );

  if (statColumn && statColumn.sortFunction) {
    return statColumn.sortFunction;
  }

  return (
    playerStatLogA: StatsLogRenderEntity,
    playerStatLogB: StatsLogRenderEntity
  ) => {
    return (
      Number(playerStatLogB.stats[statId]) -
      Number(playerStatLogA.stats[statId])
    );
  };
}

function Legend(): React.ReactElement {
  const { t } = useTranslation();
  const statColumns = generateStatColumns(t);
  return (
    <>
      <div className="column is-12">
        <span className="title is-6">
          <Trans>legend</Trans>
        </span>
      </div>
      <div className="column is-12">
        <ul>
          {statColumns.map(statColumn => (
            <li key={statColumn.id} className="is-size-7">
              <span className="has-text-weight-bold">{statColumn.header}</span>{' '}
              - {statColumn.legend}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

interface BoxScoreProps {
  playerStatsLogs: StatsLogRenderEntity[];
  playersMap: PlayersMap;
  playerViewBasePath: string;
  team: TeamEntity;
  teamStatsLog: StatsLogRenderEntity;
}

function BoxScore({
  playerStatsLogs,
  playersMap,
  playerViewBasePath,
  team,
  teamStatsLog
}: BoxScoreProps) {
  const { t } = useTranslation();
  const statColumns = generateStatColumns(t);
  const [statIdOrder, setStatIdOrder] = useState('points');
  const [isReverse, setIsReverse] = useState(false);
  const sortFunction = findSortFunction(statIdOrder);
  const sortedPlayerStatLogs = isReverse
    ? playerStatsLogs.sort(sortFunction).reverse()
    : playerStatsLogs.sort(sortFunction);

  const onHeaderClick = (statColumn: StatColumn) => {
    if (statIdOrder === statColumn.id) {
      setIsReverse(!isReverse);
    } else {
      setIsReverse(false);
    }
    setStatIdOrder(statColumn.id);
  };

  return (
    <div className="column is-12">
      <h2 className="subtitle">{team.name}</h2>

      <GameBoxScoreTable
        playersMap={playersMap}
        playerStatLogs={sortedPlayerStatLogs}
        playerViewBasePath={playerViewBasePath}
        teamStatsLog={teamStatsLog}
        statColumns={statColumns}
        onHeaderClick={onHeaderClick}
      />
    </div>
  );
}

function GameBoxScoreViewer({
  awayTeam,
  awayPlayerStatsLogs,
  awayTeamStatsLog,
  homeTeam,
  homePlayerStatsLogs,
  homeTeamStatsLog,
  playersMap,
  playerViewBasePath
}: BoxScoreViewerProps): React.ReactElement {
  return (
    <div className="columns is-multiline has-text-left">
      <BoxScore
        playerStatsLogs={homePlayerStatsLogs}
        playersMap={playersMap}
        playerViewBasePath={playerViewBasePath}
        team={homeTeam}
        teamStatsLog={homeTeamStatsLog}
      />
      <BoxScore
        playerStatsLogs={awayPlayerStatsLogs}
        playersMap={playersMap}
        playerViewBasePath={playerViewBasePath}
        team={awayTeam}
        teamStatsLog={awayTeamStatsLog}
      />
      <Legend />
    </div>
  );
}

export default GameBoxScoreViewer;
