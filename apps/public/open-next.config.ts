import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';

/**
 * Without an incrementalCache the adapter ignores every `export const
 * revalidate` in the app and re-renders each page from scratch on every
 * request. On the Workers free plan that reliably blows the 10ms CPU budget:
 * observability showed exceededCpu across the whole site — the home, a
 * tournament root, a game and a phase page — at roughly 3% of requests.
 *
 * With it, a request inside the revalidate window serves stored HTML and the
 * render cost disappears. Reads the NEXT_INC_CACHE_KV binding in
 * wrangler.jsonc.
 */
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache
});
