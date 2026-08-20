import { search } from '@gochamps/api-client';

// Search results for a term barely move minute to minute, and the same terms
// repeat across visitors, so the CDN may hold one for a minute and keep serving
// it while it refreshes.
const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
};

// The search box is a client island and `API_HOST` is server-only (see
// packages/api-client/src/env.ts), so the browser gets a same-origin endpoint
// instead of the API host.
export async function GET(request: Request): Promise<Response> {
  const term = new URL(request.url).searchParams.get('term');

  if (!term) {
    return Response.json([], { headers: CACHE_HEADERS });
  }

  try {
    return Response.json(await search(term), { headers: CACHE_HEADERS });
  } catch {
    return Response.json(
      { error: 'search_failed' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
