import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
import { withRegionalCache } from '@opennextjs/cloudflare/overrides/incremental-cache/regional-cache';
import memoryQueue from '@opennextjs/cloudflare/overrides/queue/memory-queue';

// Without an incrementalCache the adapter ignores every `export const
// revalidate` and re-renders each request. R2, not KV: KV Free allows 1k
// writes/day per account, and every revalidation is a write.
//
// withRegionalCache fronts R2 with the per-colo Cache API. Not refreshing it
// lazily on each hit keeps a hit from also paying an R2 read and re-parse.
//
// Without a queue the adapter defaults to a dummy one: stale pages are never
// revalidated. The memory queue revalidates through WORKER_SELF_REFERENCE, a
// separate invocation with its own CPU budget — a render that runs out of CPU
// there leaves the stale page up instead of failing a visitor's request.
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, {
    mode: 'long-lived',
    shouldLazilyUpdateOnCacheHit: false
  }),
  queue: memoryQueue
});
