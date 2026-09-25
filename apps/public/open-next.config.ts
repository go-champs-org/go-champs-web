import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import memoryQueue from '@opennextjs/cloudflare/overrides/queue/memory-queue';

// R2, not KV: KV Free allows 1k writes/day per account, and every revalidation is a write.
export default defineCloudflareConfig({
  // Skip the lazy refresh on a cache hit: it would also pay an R2 read and re-parse.
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: 'long-lived',
    shouldLazilyUpdateOnCacheHit: false
  }),
  // Revalidates via WORKER_SELF_REFERENCE; a CPU-killed render just leaves the stale page up.
  queue: memoryQueue
});
