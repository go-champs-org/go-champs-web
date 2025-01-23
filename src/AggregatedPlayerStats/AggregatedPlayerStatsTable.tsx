import React from 'react';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { PlayersMap } from '../Players/state';
import { PlayerStatsLogRenderEntity } from '../PlayerStatsLog/View';
import PlayerStatLogView, { ViewLoading } from '../PlayerStatsLog/View';

const AGGREGATED_PLAYER_STATS_TABLES: {
  [key: string]: React.ComponentType<AggregatedPlayerStatsTableProps>;
} = {
  basketball_5x5: React.lazy(() =>
    import('../Sports/Basketball5x5/AggregatedPlayerStatsTable')
  )
};

interface AggregatedPlayerStatsTableProps {
  onHeaderClick?: (playerStat: PlayerStatEntity) => void;
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  playerStatLogs: PlayerStatsLogRenderEntity[];
  tournament: TournamentEntity;
}

function AggregatedPlayerStatsTable({
  onHeaderClick,
  players,
  playersStats,
  playerStatLogs,
  tournament
}: AggregatedPlayerStatsTableProps): React.ReactElement {
  if (AGGREGATED_PLAYER_STATS_TABLES[tournament.sportSlug]) {
    const AggregatedPlayerStatsTable = AGGREGATED_PLAYER_STATS_TABLES[
      tournament.sportSlug
    ];
    return (
      <React.Suspense fallback={<ViewLoading />}>
        <AggregatedPlayerStatsTable
          onHeaderClick={onHeaderClick}
          players={players}
          playersStats={playersStats}
          playerStatLogs={playerStatLogs}
          tournament={tournament}
        />
      </React.Suspense>
    );
  }

  return (
    <PlayerStatLogView
      onHeaderClick={onHeaderClick}
      players={players}
      playersStats={playersStats}
      playerStatLogs={playerStatLogs}
      tournament={tournament}
    />
  );
}

export default AggregatedPlayerStatsTable;
