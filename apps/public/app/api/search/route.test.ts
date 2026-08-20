/**
 * Route handlers run on the server, where Request/Response are Node globals —
 * jsdom does not provide them.
 *
 * @jest-environment node
 */
import { GET } from './route';
import { search } from '@gochamps/api-client';

jest.mock('@gochamps/api-client', () => ({
  search: jest.fn()
}));

const searchMock = search as jest.Mock;

describe('GET /api/search', () => {
  beforeEach(() => {
    searchMock.mockReset();
  });

  it('returns the search results for the given term', async () => {
    const results = [
      {
        id: '1',
        name: 'Liga Teste',
        slug: 'liga-teste',
        logoUrl: '',
        organizationName: 'Org Teste',
        organizationSlug: 'org-teste'
      }
    ];
    searchMock.mockResolvedValue(results);

    const response = await GET(
      new Request('http://localhost/api/search?term=Liga')
    );

    expect(searchMock).toHaveBeenCalledWith('Liga');
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(results);
  });

  it('returns an empty list without hitting the API when the term is missing', async () => {
    const response = await GET(new Request('http://localhost/api/search'));

    expect(searchMock).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([]);
  });

  it('lets the edge cache a term for a minute', async () => {
    searchMock.mockResolvedValue([]);

    const response = await GET(
      new Request('http://localhost/api/search?term=Liga')
    );

    expect(response.headers.get('Cache-Control')).toBe(
      'public, s-maxage=60, stale-while-revalidate=300'
    );
  });

  it('never caches an upstream failure', async () => {
    searchMock.mockRejectedValue(new Error('boom'));

    const response = await GET(
      new Request('http://localhost/api/search?term=Liga')
    );

    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it('returns 502 when the upstream API fails', async () => {
    searchMock.mockRejectedValue(new Error('boom'));

    const response = await GET(
      new Request('http://localhost/api/search?term=Liga')
    );

    expect(response.status).toBe(502);
  });
});
