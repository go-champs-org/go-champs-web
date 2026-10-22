'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { AggregatedPlayerStatsLogEntity } from '@gochamps/api-client';
import {
  tournamentStatRowsInStatsOrder,
  type PickedPlayer,
  type PickedTeam,
  type TournamentStatRow
} from '@/src/stats/tournamentStats';
import type { StatColumnView, StatScope } from '@/src/stats/rosterStats';
import { RosterStatsTable } from '../team/[teamId]/RosterStatsTable';
import {
  NO_STATS_FILTERS,
  TournamentStatsFilters,
  withMinimum,
  type StatsFilterOption,
  type TournamentStatsFilterLabels,
  type TournamentStatsFilterValues
} from './TournamentStatsFilters';

interface TournamentStatsTableProps {
  tournamentId: string;
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
  defaultSortSlugs: Record<string, string>;
  phases: StatsFilterOption[];
  minStatFilters: StatsFilterOption[];
  filterLabels: TournamentStatsFilterLabels;
  noFilteredStatsLabel: string;
}

const statsUrl = (
  tournamentId: string,
  slug: string,
  filters: TournamentStatsFilterValues
): string => {
  const params = new URLSearchParams({ tournamentId, sort: slug });
  if (filters.phaseId) params.set('phaseId', filters.phaseId);
  if (filters.teamId) params.set('teamId', filters.teamId);
  Object.entries(filters.minStats).forEach(([statSlug, minimum]) =>
    params.set(`min[${statSlug}]`, String(minimum))
  );

  return `/api/tournament-stats?${params.toString()}`;
};

// The stat highlights on the tournament home link here as `?stat=<key>`, the
// ranking the card had in view. Its own component behind a Suspense boundary:
// reading the URL in the browser is what lets the rest of the page stay
// static.
function RequestedStat({ onRead }: { onRead: (slug: string) => void }) {
  const stat = useSearchParams()?.get('stat') || '';

  useEffect(() => onRead(stat), [stat]);

  return null;
}

const teamOptions = (teams: PickedTeam[]): StatsFilterOption[] =>
  teams
    .map(team => ({ id: team.id, label: team.name }))
    .sort((left, right) => left.label.localeCompare(right.label));

// The sort fetch lives here, not in the (server) page component, because a
// function prop can't cross the server-to-client boundary. The filters live
// here too: every ranking the table asks for is narrowed by them.
export function TournamentStatsTable({
  tournamentId,
  players,
  teams,
  phases,
  minStatFilters,
  filterLabels,
  noFilteredStatsLabel,
  ...tableProps
}: TournamentStatsTableProps) {
  const [filters, setFilters] = useState(NO_STATS_FILTERS);
  const [requestedSortSlug, setRequestedSortSlug] = useState('');

  const onSortRequest = useCallback(
    async (slug: string) => {
      const response = await fetch(statsUrl(tournamentId, slug, filters));

      // A failed request is not a valid (empty) ranking — throwing here lets
      // the table's requestSort leave the rows it already has on screen
      // instead of replacing them with nothing.
      if (!response.ok) throw new Error('tournament_stats_sort_failed');

      const statsLogs: AggregatedPlayerStatsLogEntity[] = await response.json();

      return tournamentStatRowsInStatsOrder(players, statsLogs, teams);
    },
    [tournamentId, players, teams, filters]
  );

  return (
    <>
      <Suspense fallback={null}>
        <RequestedStat onRead={setRequestedSortSlug} />
      </Suspense>
      <RosterStatsTable
        {...tableProps}
        hasTeamColumn
        showPosition
        onSortRequest={onSortRequest}
        refetchKey={JSON.stringify(filters)}
        emptyLabel={noFilteredStatsLabel}
        requestedSortSlug={requestedSortSlug}
        filters={
          <TournamentStatsFilters
            phases={phases}
            teams={teamOptions(teams)}
            minStatFilters={minStatFilters}
            values={filters}
            onPhaseChange={phaseId => setFilters(current => ({ ...current, phaseId }))}
            onTeamChange={teamId => setFilters(current => ({ ...current, teamId }))}
            onMinStatChange={(slug, minimum) =>
              setFilters(current => {
                const minStats = withMinimum(current.minStats, slug, minimum);

                return minStats === current.minStats ? current : { ...current, minStats };
              })
            }
            labels={filterLabels}
          />
        }
      />
    </>
  );
}
