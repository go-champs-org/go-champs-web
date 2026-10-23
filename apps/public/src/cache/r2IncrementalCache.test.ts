const put = jest.fn();

jest.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: () => ({ env: { NEXT_INC_CACHE_R2_BUCKET: { put } } })
}));

jest.mock('@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache', () => ({
  __esModule: true,
  default: {
    name: 'cf-r2-incremental-cache',
    get: jest.fn(),
    delete: jest.fn(),
    getR2Key: (key: string, cacheType = 'cache') => `incremental-cache/build/${key}.${cacheType}`
  }
}));

import cache, { RETRY_DELAY_MS } from './r2IncrementalCache';

const value = { type: 'app', html: '<p>stats</p>' } as never;

const r2Error = (code: number) => new Error(`put: R2 says no. (${code})`);

// Lets the pending put rejection settle before the retry timer is advanced.
const flush = () => new Promise(jest.requireActual('timers').setImmediate);

describe('retrying R2 incremental cache', () => {
  beforeEach(() => {
    put.mockReset();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('writes the entry under the adapter key', async () => {
    await cache.set('/pt/cbb/sub17final', value);

    expect(put).toHaveBeenCalledWith('incremental-cache/build//pt/cbb/sub17final.cache', JSON.stringify(value));
  });

  it.each([10058, 10001])('retries once after R2 rejects the put with %i', async code => {
    jest.useFakeTimers();
    put.mockRejectedValueOnce(r2Error(code)).mockResolvedValueOnce(undefined);

    const pending = cache.set('/pt/cgc/master35-2026/stats', value);
    await flush();
    expect(put).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(RETRY_DELAY_MS);
    await pending;

    expect(put).toHaveBeenCalledTimes(2);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('logs when the retry fails too', async () => {
    jest.useFakeTimers();
    put.mockRejectedValue(r2Error(10058));

    const pending = cache.set('/pt/cgc/master35-2026/stats', value);
    await flush();
    jest.advanceTimersByTime(RETRY_DELAY_MS);
    await pending;

    expect(put).toHaveBeenCalledTimes(2);
    expect(console.error).toHaveBeenCalledWith('Failed to set to cache', expect.any(Error));
  });

  it('does not retry other errors', async () => {
    put.mockRejectedValue(r2Error(10007));

    await cache.set('/pt/cgc/master35-2026/stats', value);

    expect(put).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Failed to set to cache', expect.any(Error));
  });
});
