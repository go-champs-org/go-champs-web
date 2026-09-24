'use client';

import { useCallback } from 'react';
import type { AggregatedPlayerStatsLogEntity } from '@gochamps/api-client';
import {
  tournamentStatRowsInStatsOrder,
  type PickedPlayer,
  type PickedTeam,
  type TournamentStatRow
} from '@/src/stats/tournamentStats';
import type { StatColumnView, StatScope } from '@/src/stats/rosterStats';
import { RosterStatsTable } from '../times/[teamId]/RosterStatsTable';

interface TournamentStatsTableProps {
  tournamentId: string;
  // Only id/name/shirtNumber/teamId (players) and id/name (teams) — the rest
  // of the roster's fields have nothing to do in this client boundary's RSC
  // payload. See PickedPlayer/PickedTeam.
  players: PickedPlayer[];
  teams: PickedTeam[];
  rows: TournamentStatRow[];
  columnsByScope: Record<string, StatColumnView[]>;
  totalsByScope: Record<string, Record<string, string>>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  title: string;
  scopeLegend: string;
  glossaryLabel: string;
  numberLabel: string;
  nameLabel: string;
  totalLabel: string;
  sortLabel: string;
  teamColumnLabel: string;
  playerHrefBase: string;
  teamHrefBase: string;
}

// The sort fetch lives here, not in the (server) page component, because a
// function prop can't cross the server-to-client boundary.
export function TournamentStatsTable({
  tournamentId,
  players,
  teams,
  ...tableProps
}: TournamentStatsTableProps) {
  const onSortRequest = useCallback(
    async (slug: string) => {
      const response = await fetch(
        `/api/tournament-stats?tournamentId=${encodeURIComponent(tournamentId)}&sort=${encodeURIComponent(slug)}`
      );

      // A failed request is not a valid (empty) ranking — throwing here lets
      // the table's requestSort leave the rows it already has on screen
      // instead of replacing them with nothing.
      if (!response.ok) throw new Error('tournament_stats_sort_failed');

      const statsLogs: AggregatedPlayerStatsLogEntity[] = await response.json();

      return tournamentStatRowsInStatsOrder(players, statsLogs, teams);
    },
    [tournamentId, players, teams]
  );

  return (
    <RosterStatsTable {...tableProps} hasTeamColumn onSortRequest={onSortRequest} />
  );
}
