import {
  getAggregatedPlayerStatsByFilter,
  type AggregatedPlayerStatsFilter
} from '@gochamps/api-client';

const MIN_STAT_PARAM = /^min\[(.+)\]$/;

// `min[game_played]=3` arrives as its own query param per stat (the api-client
// turns it into the API's `where[game_played][gte]=3`); a value that isn't a
// number is left out rather than sent along to fail upstream.
const minStatsFrom = (searchParams: URLSearchParams): Record<string, number> =>
  Object.fromEntries(
    Array.from(searchParams.entries())
      .map(([key, value]) => [key.match(MIN_STAT_PARAM)?.[1], Number(value)] as const)
      .filter(
        (entry): entry is readonly [string, number] =>
          entry[0] !== undefined && Number.isFinite(entry[1])
      )
  );

// An empty param is no filter at all, same as a missing one.
const optionalParam = (searchParams: URLSearchParams, name: string): string | undefined =>
  searchParams.get(name) || undefined;

const statsFilterFrom = (
  tournamentId: string,
  searchParams: URLSearchParams
): AggregatedPlayerStatsFilter => ({
  tournamentId,
  sort: optionalParam(searchParams, 'sort'),
  phaseId: optionalParam(searchParams, 'phaseId'),
  teamId: optionalParam(searchParams, 'teamId'),
  minStats: minStatsFrom(searchParams)
});

// The stats table's client island can't reach API_HOST directly — same
// reason /api/search exists (packages/api-client/src/env.ts).
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const tournamentId = url.searchParams.get('tournamentId');

  if (!tournamentId) {
    return Response.json([], { status: 400 });
  }

  try {
    return Response.json(
      await getAggregatedPlayerStatsByFilter(
        statsFilterFrom(tournamentId, url.searchParams)
      )
    );
  } catch {
    return Response.json(
      { error: 'tournament_stats_failed' },
      { status: 502 }
    );
  }
}
