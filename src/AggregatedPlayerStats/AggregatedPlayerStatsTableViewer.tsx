import React from 'react';
import { PlayerStatEntity, TournamentEntity } from '../Tournaments/state';
import { PlayersMap } from '../Players/state';
import { PlayerStatsLogRenderEntity } from '../PlayerStatsLog/View';
import PlayerStatLogView from '../PlayerStatsLog/View';
import { Scope } from '../Sports/state';
import LoadingTable from '../Shared/LoadingTable';

const AGGREGATED_PLAYER_STATS_TABLES: {
  [key: string]: React.ComponentType<AggregatedPlayerStatsTableViewerProps>;
} = {
  basketball_5x5: React.lazy(() =>
    import('../Sports/Basketball5x5/AggregatedPlayerStatsTableViewer')
  )
};

export interface AggregatedPlayerStatsTableViewerProps {
  onHeaderClick?: (sortKey: string) => void;
  players: PlayersMap;
  playersStats: PlayerStatEntity[];
  playerStatLogs: PlayerStatsLogRenderEntity[];
  playerViewBasePath: string;
  scope: Scope;
  tournament: TournamentEntity;
}

function AggregatedPlayerStatsTableViewer({
  onHeaderClick,
  players,
  playersStats,
  playerStatLogs,
  playerViewBasePath,
  scope,
  tournament
}: AggregatedPlayerStatsTableViewerProps): React.ReactElement {
  if (AGGREGATED_PLAYER_STATS_TABLES[tournament.sportSlug]) {
    const AggregatedPlayerStatsTableViewer =
      AGGREGATED_PLAYER_STATS_TABLES[tournament.sportSlug];
    return (
      <React.Suspense fallback={<LoadingTable />}>
        <AggregatedPlayerStatsTableViewer
          onHeaderClick={onHeaderClick}
          players={players}
          playersStats={playersStats}
          playerStatLogs={playerStatLogs}
          playerViewBasePath={playerViewBasePath}
          scope={scope}
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
      playerViewBasePath={playerViewBasePath}
      scope={scope}
      tournament={tournament}
    />
  );
}

export default AggregatedPlayerStatsTableViewer;
