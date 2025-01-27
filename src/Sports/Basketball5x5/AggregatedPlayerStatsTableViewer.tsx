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
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds_defensive} />
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

const PERGAME_STAT_COLUMNS: BaseAggregatedStatColumn[] = [
  {
    id: 'gamesPlayed',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.game_played} />
    ),
    sortKey: 'games_played'
  },
  {
    id: 'gamesStarted',
    cell: playerStatLog => (
      <PercetualCell value={playerStatLog.stats.game_started_per_game} />
    ),
    sortKey: 'game_started_per_game'
  },
  {
    id: 'points',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.points_per_game} />
    ),
    sortKey: 'points_per_game'
  },
  {
    id: 'rebounds',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.rebounds_per_game} />
    ),
    sortKey: 'rebounds_per_game'
  },
  {
    id: 'assists',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.assists_per_game} />
    ),
    sortKey: 'assists_per_game'
  },
  {
    id: 'blocks',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.blocks_per_game} />
    ),
    sortKey: 'blocks_per_game'
  },
  {
    id: 'steals',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.steals_per_game} />
    ),
    sortKey: 'steals_per_game'
  },
  {
    id: 'turnovers',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.turnovers_per_game} />
    ),
    sortKey: 'turnovers_per_game'
  },
  {
    id: 'onePointersMade',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.free_throws_made_per_game} />
    ),
    sortKey: 'free_throws_made_per_game'
  },
  {
    id: 'onePointersAttempted',
    cell: playerStatLog => (
      <ValueOrEmptyCell
        value={playerStatLog.stats.free_throws_attempted_per_game}
      />
    ),
    sortKey: 'free_throws_attempted_per_game'
  },
  {
    id: 'onePointerPercentage',
    cell: playerStatLog => (
      <PercetualCell
        value={playerStatLog.stats.free_throw_percentage_per_game}
      />
    ),
    sortKey: 'free_throw_percentage_per_game'
  },
  {
    id: 'twoPointersMade',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.field_goals_made_per_game} />
    ),
    sortKey: 'field_goals_made_per_game'
  },
  {
    id: 'twoPointersAttempted',
    cell: playerStatLog => (
      <ValueOrEmptyCell
        value={playerStatLog.stats.field_goals_attempted_per_game}
      />
    ),
    sortKey: 'field_goals_attempted_per_game'
  },
  {
    id: 'twoPointerPercentage',
    cell: playerStatLog => (
      <PercetualCell
        value={playerStatLog.stats.field_goal_percentage_per_game}
      />
    ),
    sortKey: 'field_goal_percentage_per_game'
  },
  {
    id: 'threePointersMade',
    cell: playerStatLog => (
      <ValueOrEmptyCell
        value={playerStatLog.stats.three_point_field_goals_made_per_game}
      />
    ),
    sortKey: 'three_point_field_goals_made_per_game'
  },
  {
    id: 'threePointersAttempted',
    cell: playerStatLog => (
      <ValueOrEmptyCell
        value={playerStatLog.stats.three_point_field_goals_attempted_per_game}
      />
    ),
    sortKey: 'three_point_field_goals_attempted_per_game'
  },
  {
    id: 'threePointPercentage',
    cell: playerStatLog => (
      <PercetualCell
        value={playerStatLog.stats.three_point_field_goal_percentage_per_game}
      />
    ),
    sortKey: 'three_point_field_goal_percentage_per_game'
  },
  {
    id: 'reboundsOffensive',
    cell: playerStatLog => (
      <ValueOrEmptyCell
        value={playerStatLog.stats.rebounds_offensive_per_game}
      />
    ),
    sortKey: 'rebounds_offensive_per_game'
  },
  {
    id: 'reboundsDefensive',
    cell: playerStatLog => (
      <ValueOrEmptyCell
        value={playerStatLog.stats.rebounds_defensive_per_game}
      />
    ),
    sortKey: 'rebounds_defensive_per_game'
  },
  {
    id: 'foulsPersonal',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.fouls_personal_per_game} />
    ),
    sortKey: 'fouls_personal_per_game'
  },
  {
    id: 'foulsTechnical',
    cell: playerStatLog => (
      <ValueOrEmptyCell value={playerStatLog.stats.fouls_technical_per_game} />
    ),
    sortKey: 'fouls_technical_per_game'
  }
];

function generateStatColumns(
  t: TFunction<'translation'>,
  baseStatColumns: BaseAggregatedStatColumn[]
): StatColumn[] {
  return baseStatColumns.map(baseStatColumn => ({
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
  players,
  scope
}: AggregatedPlayerStatsTableViewerProps) {
  const { t } = useTranslation();
  const baseStats =
    scope === 'aggregate'
      ? AGGREGATED_TOTAL_STAT_COLUMNS
      : PERGAME_STAT_COLUMNS;
  const statColumns = generateStatColumns(t, baseStats);
  return (
    <AggregatePlayerStatsTable
      players={players}
      playerStatLogs={playerStatLogs}
      statColumns={statColumns}
    />
  );
}

export default AggregatedPlayerStatsTableViewer;
