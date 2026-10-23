import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import memoryQueue from '@opennextjs/cloudflare/overrides/queue/memory-queue';
import r2IncrementalCache from './src/cache/r2IncrementalCache';

// R2, not KV: KV Free allows 1k writes/day per account, and every revalidation is a write.
// The local wrapper retries a put R2 rejects when two renders of one page race.
export default defineCloudflareConfig({
  // Skip the lazy refresh on a cache hit: it would also pay an R2 read and re-parse.
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: 'long-lived',
    shouldLazilyUpdateOnCacheHit: false
  }),
  // Revalidates via WORKER_SELF_REFERENCE; a CPU-killed render just leaves the stale page up.
  queue: memoryQueue
});
