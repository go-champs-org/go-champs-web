describe('getAboutStats', () => {
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

  it('fetches public/about and maps snake_case counts to camelCase', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getAboutStats } = await import('./about');

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          public_games_count: 3247,
          public_tournaments_count: 315,
          organizations_with_public_tournaments_count: 31
        }
      })
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await getAboutStats();

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/public/about',
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result).toEqual({
      gamesCount: 3247,
      tournamentsCount: 315,
      organizationsCount: 31
    });
  });

  it('throws an ApiError when the request fails', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getAboutStats } = await import('./about');

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: async () => 'boom'
    }) as unknown as typeof fetch;

    await expect(getAboutStats()).rejects.toMatchObject({ status: 500 });
  });
});
