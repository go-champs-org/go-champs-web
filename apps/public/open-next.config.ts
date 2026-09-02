import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';

// Without an incrementalCache the adapter ignores every `export const
// revalidate` and re-renders on each request, which does not fit the Workers
// free plan's CPU budget. Reads the NEXT_INC_CACHE_KV binding.
//
// withRegionalCache fronts KV with a per-data-center Cache API layer so
// repeat hits in the same region don't count against KV's daily free-tier
// operation limits (we hit 50% of the KV write quota on new-staging without
// it).
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(kvIncrementalCache, { mode: 'long-lived' })
});
