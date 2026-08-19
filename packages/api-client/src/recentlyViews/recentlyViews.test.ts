describe('getRecentlyViews', () => {
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

  it('requests /v1/recently-view', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getRecentlyViews } = await import('./recentlyViews');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getRecentlyViews();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/recently-view',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('maps the response data through the recently view mapper', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getRecentlyViews } = await import('./recentlyViews');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            views: 242,
            tournament: {
              id: 't1',
              name: 'Test League',
              slug: 'test-league',
              organization: {
                id: 'o1',
                name: 'Test Organization',
                slug: 'test-organization',
                logo_url: 'https://example.com/logo.png'
              }
            }
          }
        ]
      })
    }) as unknown as typeof fetch;

    const result = await getRecentlyViews();

    expect(result).toEqual([
      {
        tournamentId: 't1',
        tournamentName: 'Test League',
        tournamentSlug: 'test-league',
        organizationName: 'Test Organization',
        organizationSlug: 'test-organization',
        organizationLogoUrl: 'https://example.com/logo.png',
        views: 242
      }
    ]);
  });

  it('throws when API_HOST is not configured', async () => {
    delete process.env.API_HOST;
    jest.resetModules();
    const { getRecentlyViews } = await import('./recentlyViews');

    await expect(getRecentlyViews()).rejects.toThrow(
      'API_HOST environment variable is not configured'
    );
  });
});
