/**
 * Route handlers run on the server, where Request/Response are Node globals —
 * jsdom does not provide them.
 *
 * @jest-environment node
 */
import { GET } from './route';
import { getRecentlyViewedOrganizations } from '@gochamps/api-client';

jest.mock('@gochamps/api-client', () => ({
  getRecentlyViewedOrganizations: jest.fn()
}));

const getRecentlyViewedOrganizationsMock =
  getRecentlyViewedOrganizations as jest.Mock;

describe('GET /api/organizations/recently-viewed', () => {
  beforeEach(() => {
    getRecentlyViewedOrganizationsMock.mockReset();
  });

  it('returns the recently viewed organizations', async () => {
    const organizations = [
      {
        id: 'o1',
        name: 'Test Organization',
        slug: 'test-organization',
        logoUrl: ''
      }
    ];
    getRecentlyViewedOrganizationsMock.mockResolvedValue(organizations);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(organizations);
  });

  it('returns 502 when the upstream API fails', async () => {
    getRecentlyViewedOrganizationsMock.mockRejectedValue(new Error('boom'));

    const response = await GET();

    expect(response.status).toBe(502);
  });
});
