import { getCloudflareContext } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';

// The adapter's R2 cache logs and drops any failed put. Two isolates rendering
// the same cold page (every deploy starts cold: keys carry the build id) put the
// same key in the same second, and R2 rejects the second one. This wrapper
// retries that put once instead, so the entry still lands.

// R2 accepts about one write per second to a given key.
export const RETRY_DELAY_MS = 1100;

// 10058: another put to this key is in flight. 10001: R2 internal error.
const RETRYABLE_CODES = ['(10058)', '(10001)'];

// getR2Key is protected; reusing it keeps keys identical to the adapter's reads.
type R2KeyBuilder = { getR2Key: (key: string, cacheType?: string) => string };

const r2Key = (key: string, cacheType?: string): string =>
  (r2IncrementalCache as unknown as R2KeyBuilder).getR2Key(key, cacheType);

const isRetryable = (error: unknown): boolean =>
  error instanceof Error && RETRYABLE_CODES.some(code => error.message.includes(code));

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const put = async (key: string, body: string): Promise<void> => {
  const bucket = getCloudflareContext().env.NEXT_INC_CACHE_R2_BUCKET;
  if (!bucket) throw new Error('No R2 bucket');
  await bucket.put(key, body);
};

const putWithRetry = async (key: string, body: string): Promise<void> => {
  try {
    await put(key, body);
  } catch (error) {
    if (!isRetryable(error)) throw error;
    await wait(RETRY_DELAY_MS);
    await put(key, body);
  }
};

type IncrementalCache = Pick<typeof r2IncrementalCache, 'name' | 'get' | 'set' | 'delete'>;

const retryingR2IncrementalCache: IncrementalCache = {
  name: r2IncrementalCache.name,
  get: (key, cacheType) => r2IncrementalCache.get(key, cacheType),
  set: async (key, value, cacheType) => {
    try {
      await putWithRetry(r2Key(key, cacheType), JSON.stringify(value));
    } catch (error) {
      console.error('Failed to set to cache', error);
    }
  },
  delete: key => r2IncrementalCache.delete(key)
};

export default retryingR2IncrementalCache;
