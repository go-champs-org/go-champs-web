/** @jest-environment ./src/EdgeRouting/workerTestEnvironment.js */
import worker from '../../worker/index';
import { BLOCKED_ROBOTS_TXT } from './routes';

const env = (overrides = {}) => ({
  ASSETS: { fetch: jest.fn(async () => new Response('spa', { status: 200 })) },
  PUBLIC: {
    fetch: jest.fn(
      async () =>
        new Response('public', { status: 201, headers: { 'X-Test': 'kept' } })
    )
  },
  ...overrides
});

const get = (path: string) =>
  new Request(`https://new-staging.go-champs.com${path}`);

describe('worker with BLOCK_CRAWLERS on', () => {
  it('blocks /robots.txt locally, without calling either binding', async () => {
    const testEnv = env();
    const response = await worker.fetch(get('/robots.txt'), {
      ...testEnv,
      BLOCK_CRAWLERS: 'true'
    });

    expect(await response.text()).toBe(BLOCKED_ROBOTS_TXT);
    expect(response.status).toBe(200);
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
    expect(testEnv.ASSETS.fetch).not.toHaveBeenCalled();
    expect(testEnv.PUBLIC.fetch).not.toHaveBeenCalled();
  });

  it('404s a junk path at the edge, without calling either binding', async () => {
    const testEnv = env();
    const response = await worker.fetch(get('/resources/.env'), {
      ...testEnv,
      BLOCK_CRAWLERS: 'true'
    });

    expect(response.status).toBe(404);
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
    expect(testEnv.ASSETS.fetch).not.toHaveBeenCalled();
    expect(testEnv.PUBLIC.fetch).not.toHaveBeenCalled();
  });

  it('forwards a tournament path to PUBLIC, preserving its response and tagging it', async () => {
    const testEnv = env();
    const response = await worker.fetch(get('/fberj/adulto'), {
      ...testEnv,
      BLOCK_CRAWLERS: 'true'
    });

    expect(testEnv.PUBLIC.fetch).toHaveBeenCalledTimes(1);
    const forwardedRequest = testEnv.PUBLIC.fetch.mock.calls[0][0] as Request;
    expect(new URL(forwardedRequest.url).pathname).toBe('/fberj/adulto');
    expect(response.status).toBe(201);
    expect(await response.text()).toBe('public');
    expect(response.headers.get('X-Test')).toBe('kept');
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
  });

  it('serves a CMS route from ASSETS, tagging it', async () => {
    const testEnv = env();
    const response = await worker.fetch(get('/Account'), {
      ...testEnv,
      BLOCK_CRAWLERS: 'true'
    });

    expect(testEnv.ASSETS.fetch).toHaveBeenCalledTimes(1);
    expect(await response.text()).toBe('spa');
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
  });
});

describe('worker without BLOCK_CRAWLERS', () => {
  it('forwards /robots.txt to PUBLIC unchanged', async () => {
    const testEnv = env();
    const response = await worker.fetch(get('/robots.txt'), testEnv);

    expect(testEnv.PUBLIC.fetch).toHaveBeenCalledTimes(1);
    expect(await response.text()).toBe('public');
    expect(response.headers.get('X-Robots-Tag')).toBeNull();
  });

  it('still 404s a junk path at the edge, untagged', async () => {
    const testEnv = env();
    const response = await worker.fetch(get('/resources/.env'), testEnv);

    expect(response.status).toBe(404);
    expect(response.headers.get('X-Robots-Tag')).toBeNull();
  });

  it('leaves a forwarded response untagged', async () => {
    const testEnv = env();
    const response = await worker.fetch(get('/fberj/adulto'), testEnv);

    expect(response.headers.get('X-Robots-Tag')).toBeNull();
  });
});
