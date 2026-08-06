describe('getAggregatedPlayerStatsByFilter', () => {
  const originalFetch = global.fetch;
  const originalApiHost = process.env.API_HOST;

  afterEach(() => {
    global.fetch = originalFetch;
    process.env.API_HOST = originalApiHost;
    jest.resetModules();
  });

  it('filters by tournament_id only when playerId is absent', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getAggregatedPlayerStatsByFilter } = await import('./aggregatedPlayerStats');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getAggregatedPlayerStatsByFilter('t1');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/aggregated-player-stats-by-tournament?where%5Btournament_id%5D=t1',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('adds player_id to the filter when provided', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getAggregatedPlayerStatsByFilter } = await import('./aggregatedPlayerStats');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getAggregatedPlayerStatsByFilter('t1', 'p1');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/aggregated-player-stats-by-tournament?where%5Btournament_id%5D=t1&where%5Bplayer_id%5D=p1',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });
});
