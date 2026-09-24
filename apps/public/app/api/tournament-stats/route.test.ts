/**
 * Route handlers run on the server, where Request/Response are Node globals —
 * jsdom does not provide them.
 *
 * @jest-environment node
 */
import { GET } from './route';
import { getAggregatedPlayerStatsByFilter } from '@gochamps/api-client';

jest.mock('@gochamps/api-client', () => ({
  getAggregatedPlayerStatsByFilter: jest.fn()
}));

const getAggregatedPlayerStatsByFilterMock =
  getAggregatedPlayerStatsByFilter as jest.Mock;

describe('GET /api/tournament-stats', () => {
  beforeEach(() => {
    getAggregatedPlayerStatsByFilterMock.mockReset();
  });

  it('asks the API for the tournament, sorted by the given stat', async () => {
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue([]);

    await GET(
      new Request(
        'http://localhost/api/tournament-stats?tournamentId=t1&sort=points'
      )
    );

    expect(getAggregatedPlayerStatsByFilterMock).toHaveBeenCalledWith({
      tournamentId: 't1',
      sort: 'points'
    });
  });

  it('returns the sorted logs from the API', async () => {
    const logs = [{ id: 'log-p1', playerId: 'p1', stats: { points: '22' } }];
    getAggregatedPlayerStatsByFilterMock.mockResolvedValue(logs);

    const response = await GET(
      new Request(
        'http://localhost/api/tournament-stats?tournamentId=t1&sort=points'
      )
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(logs);
  });

  it('returns 400 without hitting the API when tournamentId is missing', async () => {
    const response = await GET(
      new Request('http://localhost/api/tournament-stats?sort=points')
    );

    expect(getAggregatedPlayerStatsByFilterMock).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
  });

  it('returns 502 when the upstream API fails', async () => {
    getAggregatedPlayerStatsByFilterMock.mockRejectedValue(new Error('boom'));

    const response = await GET(
      new Request(
        'http://localhost/api/tournament-stats?tournamentId=t1&sort=points'
      )
    );

    expect(response.status).toBe(502);
  });
});
