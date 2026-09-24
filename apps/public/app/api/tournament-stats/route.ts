import { getAggregatedPlayerStatsByFilter } from '@gochamps/api-client';

// The stats table's client island can't reach API_HOST directly — same
// reason /api/search exists (packages/api-client/src/env.ts).
export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const tournamentId = url.searchParams.get('tournamentId');
  const sort = url.searchParams.get('sort');

  if (!tournamentId) {
    return Response.json([], { status: 400 });
  }

  try {
    return Response.json(
      await getAggregatedPlayerStatsByFilter({
        tournamentId,
        sort: sort || undefined
      })
    );
  } catch {
    return Response.json(
      { error: 'tournament_stats_failed' },
      { status: 502 }
    );
  }
}
