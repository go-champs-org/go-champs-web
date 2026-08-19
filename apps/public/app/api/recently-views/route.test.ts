/**
 * Route handlers run on the server, where Request/Response are Node globals —
 * jsdom does not provide them.
 *
 * @jest-environment node
 */
import { GET } from './route';
import { getRecentlyViews } from '@gochamps/api-client';

jest.mock('@gochamps/api-client', () => ({
  getRecentlyViews: jest.fn()
}));

const getRecentlyViewsMock = getRecentlyViews as jest.Mock;

describe('GET /api/recently-views', () => {
  beforeEach(() => {
    getRecentlyViewsMock.mockReset();
  });

  it('returns the recently viewed tournaments', async () => {
    const recentlyViews = [
      {
        tournamentId: 't1',
        tournamentName: 'Test League',
        tournamentSlug: 'test-league',
        organizationName: 'Test Organization',
        organizationSlug: 'test-organization',
        organizationLogoUrl: '',
        views: 12
      }
    ];
    getRecentlyViewsMock.mockResolvedValue(recentlyViews);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(recentlyViews);
  });

  it('returns 502 when the upstream API fails', async () => {
    getRecentlyViewsMock.mockRejectedValue(new Error('boom'));

    const response = await GET();

    expect(response.status).toBe(502);
  });
});
