describe('getFixedPlayerStatsTablesByFilter', () => {
  const originalFetch = global.fetch;
  const originalApiHost = process.env.API_HOST;

  afterEach(() => {
    global.fetch = originalFetch;
    if (originalApiHost === undefined) {
      delete process.env.API_HOST;
    } else {
      process.env.API_HOST = originalApiHost;
    }
    jest.resetModules();
  });

  it('filters by tournament_id', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getFixedPlayerStatsTablesByFilter } = await import(
      './fixedPlayerStatsTables'
    );

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getFixedPlayerStatsTablesByFilter({ tournamentId: 't1' });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/fixed-player-stats-tables?where%5Btournament_id%5D=t1',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });
});
