import React from 'react';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { PlayersMap } from '../Players/state';
import { PlayerStatsLogRenderEntity } from '../PlayerStatsLog/View';
import PlayerStatLogView, { ViewLoading } from '../PlayerStatsLog/View';
import { TeamsMap } from '../Teams/state';

const AGGREGATED_PLAYER_STATS_TABLES: {
  [key: string]: React.ComponentType<AggregatedPlayerStatsTableViewerProps>;
} = {
  basketball_5x5: React.lazy(() =>
    import('../Sports/Basketball5x5/AggregatedPlayerStatsTableViewer')
  )
};

export interface AggregatedPlayerStatsTableViewerProps {
  onHeaderClick?: (playerStat: PlayerStatEntity) => void;
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  playerStatLogs: PlayerStatsLogRenderEntity[];
  tournament: TournamentEntity;
}

function AggregatedPlayerStatsTableViewer({
  onHeaderClick,
  players,
  playersStats,
  playerStatLogs,
  tournament
}: AggregatedPlayerStatsTableViewerProps): React.ReactElement {
  if (AGGREGATED_PLAYER_STATS_TABLES[tournament.sportSlug]) {
    const AggregatedPlayerStatsTableViewer =
      AGGREGATED_PLAYER_STATS_TABLES[tournament.sportSlug];
    return (
      <React.Suspense fallback={<ViewLoading />}>
        <AggregatedPlayerStatsTableViewer
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

export default AggregatedPlayerStatsTableViewer;
