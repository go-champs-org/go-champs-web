import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';

// Without an incrementalCache the adapter ignores every `export const
// revalidate` and re-renders on each request, which does not fit the Workers
// free plan's CPU budget. Reads the NEXT_INC_CACHE_KV binding.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache
});
