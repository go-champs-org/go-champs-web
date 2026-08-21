describe('getSportBySlug', () => {
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

  it('requests /v1/sports/:slug and maps the response', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getSportBySlug } = await import('./sports');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          slug: 'basketball_5x5',
          name: 'Basketball 5x5',
          player_statistics: [
            {
              slug: 'points',
              name: 'Points',
              level: 'game',
              scope: 'aggregate',
              value_type: 'calculated'
            }
          ]
        }
      })
    }) as unknown as typeof fetch;

    const result = await getSportBySlug('basketball_5x5');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/sports/basketball_5x5',
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result).toEqual({
      slug: 'basketball_5x5',
      name: 'Basketball 5x5',
      playerStatistics: [
        {
          slug: 'points',
          name: 'Points',
          level: 'game',
          scope: 'aggregate',
          valueType: 'calculated'
        }
      ]
    });
  });

  it('encodes the slug instead of letting it walk the path', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getSportBySlug } = await import('./sports');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { slug: 'x', name: 'X', player_statistics: [] } })
    }) as unknown as typeof fetch;

    await getSportBySlug('../tournaments/tour1');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/sports/..%2Ftournaments%2Ftour1',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });
});
