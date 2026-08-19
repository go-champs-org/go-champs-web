import { getRecentlyViewedOrganizations } from '@gochamps/api-client';

// The sidebar is a client island and `API_HOST` is server-only (see
// packages/api-client/src/env.ts), so the fetch is proxied here.
export async function GET(): Promise<Response> {
  try {
    return Response.json(await getRecentlyViewedOrganizations());
  } catch {
    return Response.json({ error: 'recently_viewed_failed' }, { status: 502 });
  }
}
