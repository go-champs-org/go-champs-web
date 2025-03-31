import React, { useState } from 'react';
import { BoxScoreViewerProps } from '../../Pages/GameView';
import { PlayerStatsLogRenderEntity } from '../../PlayerStatsLog/View';
import { TeamEntity } from '../../Teams/state';
import { PlayersMap } from '../../Players/state';
import GameBoxScoreTable, { StatColumn } from '../../Shared/GameBoxScoreTable';
import { Trans, useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { PercetualCell, ValueOrEmptyCell } from './TableCells';

function byStatValue(key: string) {
  return (
    playerStatLogA: PlayerStatsLogRenderEntity,
    playerStatLogB: PlayerStatsLogRenderEntity
  ) => Number(playerStatLogB.stats[key]) - Number(playerStatLogA.stats[key]);
}

interface BaseStatColumn {
  id: string;
  cell: (playerStatLog: PlayerStatsLogRenderEntity) => React.ReactElement;
  cellStyle?: React.CSSProperties;
  sortFunction: (
    playerStatLogA: PlayerStatsLogRenderEntity,
    playerStatLogB: PlayerStatsLogRenderEntity
  ) => number;
}

const BASE_BASKETBALL_STAT_COLUMNS: BaseStatColumn[] = [
  {
    id: 'points',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.points} />
    ),
    sortFunction: byStatValue('points')
  },
  {
    id: 'rebounds',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds} />
    ),
    sortFunction: byStatValue('rebounds')
  },
  {
    id: 'assists',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.assists} />
    ),
    sortFunction: byStatValue('assists')
  },
  {
    id: 'blocks',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.blocks} />
    ),
    sortFunction: byStatValue('blocks')
  },
  {
    id: 'steals',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.steals} />
    ),
    sortFunction: byStatValue('steals')
  },
  {
    id: 'turnovers',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.turnovers} />
    ),
    sortFunction: byStatValue('turnovers')
  },
  {
    id: 'onePointers',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
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
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <PercetualCell value={playerStatLog.stats.free_throw_percentage} />
    ),
    sortFunction: byStatValue('free_throw_percentage')
  },
  {
    id: 'twoPointers',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
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
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <PercetualCell value={playerStatLog.stats.field_goal_percentage} />
    ),
    sortFunction: byStatValue('field_goal_percentage')
  },
  {
    id: 'threePointers',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
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
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <PercetualCell
        value={playerStatLog.stats.three_point_field_goal_percentage}
      />
    ),
    sortFunction: byStatValue('three_point_field_goal_percentage')
  },
  {
    id: 'reboundsOffensive',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds_offensive} />
    ),
    sortFunction: byStatValue('rebounds_offensive')
  },
  {
    id: 'reboundsDefensive',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds_defensive} />
    ),
    sortFunction: byStatValue('rebounds_defensive')
  },
  {
    id: 'foulsPersonal',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
      <ValueOrEmptyCell value={playerStatLog.stats.fouls_personal} />
    ),
    sortFunction: byStatValue('fouls_personal')
  },
  {
    id: 'foulsTechnical',
    cell: (playerStatLog: PlayerStatsLogRenderEntity) => (
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
    playerStatLogA: PlayerStatsLogRenderEntity,
    playerStatLogB: PlayerStatsLogRenderEntity
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
  playerStatsLogs: PlayerStatsLogRenderEntity[];
  playersMap: PlayersMap;
  playerViewBasePath: string;
  team: TeamEntity;
}

function BoxScore({
  playerStatsLogs,
  playersMap,
  playerViewBasePath,
  team
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
        statColumns={statColumns}
        onHeaderClick={onHeaderClick}
      />
    </div>
  );
}

function GameBoxScoreViewer({
  awayTeam,
  awayPlayerStatsLogs,
  homeTeam,
  homePlayerStatsLogs,
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
      />
      <BoxScore
        playerStatsLogs={awayPlayerStatsLogs}
        playersMap={playersMap}
        playerViewBasePath={playerViewBasePath}
        team={awayTeam}
      />
      <Legend />
    </div>
  );
}

export default GameBoxScoreViewer;
