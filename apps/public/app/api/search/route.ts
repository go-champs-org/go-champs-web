import { search } from '@gochamps/api-client';

// The search box is a client island, but `API_HOST` is a server-only env var
// (see packages/api-client/src/env.ts) — the browser would read `undefined`
// and `getApiHost()` would throw. This handler keeps the API host on the
// server and gives the island a same-origin endpoint to call.
export async function GET(request: Request): Promise<Response> {
  const term = new URL(request.url).searchParams.get('term');

  if (!term) {
    return Response.json([]);
  }

  try {
    return Response.json(await search(term));
  } catch {
    return Response.json({ error: 'search_failed' }, { status: 502 });
  }
}
