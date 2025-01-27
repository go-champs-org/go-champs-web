import React from 'react';
import { TFunction, useTranslation } from 'react-i18next';
import { PlayerStatsLogRenderEntity } from '../../PlayerStatsLog/View';
import AggregatePlayerStatsTable, {
  StatColumn
} from '../../Shared/AggregatedPlayerStatsTable';
import { AggregatedPlayerStatsTableViewerProps } from '../../AggregatedPlayerStats/AggregatedPlayerStatsTableViewer';
import { PercetualCell, ValueOrEmptyCell } from './TableCells';

interface BaseAggregatedStatColumn {
  id: string;
  cell: (playerStatLog: PlayerStatsLogRenderEntity) => React.ReactElement;
  cellStyle?: React.CSSProperties;
  sortKey: string;
}

const AGGREGATED_TOTAL_STAT_COLUMNS: BaseAggregatedStatColumn[] = [
  {
    id: 'gamesPlayed',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.game_played} />
    ),
    sortKey: 'games_played'
  },
  {
    id: 'points',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.points} />
    ),
    sortKey: 'points'
  },
  {
    id: 'rebounds',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds} />
    ),
    sortKey: 'rebounds'
  },
  {
    id: 'assists',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.assists} />
    ),
    sortKey: 'assists'
  },
  {
    id: 'blocks',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.blocks} />
    ),
    sortKey: 'blocks'
  },
  {
    id: 'steals',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.steals} />
    ),
    sortKey: 'steals'
  },
  {
    id: 'turnovers',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.turnovers} />
    ),
    sortKey: 'turnovers'
  },
  {
    id: 'onePointersMade',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.free_throws_made} />
    ),
    sortKey: 'free_throws_made'
  },
  {
    id: 'onePointersAttempted',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.free_throws_attempted} />
    ),
    sortKey: 'free_throws_attempted'
  },
  {
    id: 'onePointerPercentage',
    cell: playerStatLog => (
      <PercetualCell value={playerStatLog.stats.free_throw_percentage} />
    ),
    sortKey: 'free_throw_percentage'
  },
  {
    id: 'twoPointersMade',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.field_goals_made} />
    ),
    sortKey: 'field_goals_made'
  },
  {
    id: 'twoPointersAttempted',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.field_goals_attempted} />
    ),
    sortKey: 'field_goals_attempted'
  },
  {
    id: 'twoPointerPercentage',
    cell: playerStatLog => (
      <PercetualCell value={playerStatLog.stats.field_goal_percentage} />
    ),
    sortKey: 'field_goal_percentage'
  },
  {
    id: 'threePointersMade',
    cell: playerStatLog => (
      <ValueOrEmptyCell
        value={playerStatLog.stats.three_point_field_goals_made}
      />
    ),
    sortKey: 'three_point_field_goals_made'
  },
  {
    id: 'threePointersAttempted',
    cell: playerStatLog => (
      <ValueOrEmptyCell
        value={playerStatLog.stats.three_point_field_goals_attempted}
      />
    ),
    sortKey: 'three_point_field_goals_attempted'
  },
  {
    id: 'threePointPercentage',
    cell: playerStatLog => (
      <PercetualCell
        value={playerStatLog.stats.three_point_field_goal_percentage}
      />
    ),
    sortKey: 'three_point_field_goal_percentage'
  },
  {
    id: 'reboundsOffensive',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds_offensive} />
    ),
    sortKey: 'rebounds_offensive'
  },
  {
    id: 'reboundsDefensive',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds_offensive} />
    ),
    sortKey: 'rebounds_defensive'
  },
  {
    id: 'foulsPersonal',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.fouls_personal} />
    ),
    sortKey: 'fouls_personal'
  },
  {
    id: 'foulsTechnical',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.fouls_technical} />
    ),
    sortKey: 'fouls_technical'
  }
];

function generateStatColumns(t: TFunction<'translation'>): StatColumn[] {
  return AGGREGATED_TOTAL_STAT_COLUMNS.map(baseStatColumn => ({
    id: baseStatColumn.id,
    cell: baseStatColumn.cell,
    cellStyle: baseStatColumn.cellStyle,
    header: t(
      `sports.basketball_5x5.aggregatedStatsViewer.playerStatColumns.${baseStatColumn.id}.abbreviation`,
      {
        keySeparator: '.',
        defaultValue: baseStatColumn.id
      }
    ),
    sortKey: baseStatColumn.sortKey
  }));
}

function AggregatedPlayerStatsTableViewer({
  playerStatLogs,
  players
}: AggregatedPlayerStatsTableViewerProps) {
  const { t } = useTranslation();
  const statColumns = generateStatColumns(t);
  return (
    <AggregatePlayerStatsTable
      statColumns={statColumns}
      players={players}
      playerStatLogs={playerStatLogs}
    />
  );
}

export default AggregatedPlayerStatsTableViewer;
