describe('getRecentlyViewedOrganizations', () => {
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

  it('requests /v1/organizations/recently-viewed', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getRecentlyViewedOrganizations } = await import('./organizations');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getRecentlyViewedOrganizations();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/organizations/recently-viewed',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('unwraps the organization of each recently viewed entry', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getRecentlyViewedOrganizations } = await import('./organizations');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            last_relevant_update_at: '2026-07-31T19:15:01Z',
            total_views: 326,
            organization: {
              id: 'o1',
              name: 'Test Organization',
              slug: 'test-organization',
              logo_url: 'https://example.com/logo.png'
            }
          }
        ]
      })
    }) as unknown as typeof fetch;

    const result = await getRecentlyViewedOrganizations();

    expect(result).toEqual([
      {
        id: 'o1',
        name: 'Test Organization',
        slug: 'test-organization',
        logoUrl: 'https://example.com/logo.png'
      }
    ]);
  });

  it('throws when API_HOST is not configured', async () => {
    delete process.env.API_HOST;
    jest.resetModules();
    const { getRecentlyViewedOrganizations } = await import('./organizations');

    await expect(getRecentlyViewedOrganizations()).rejects.toThrow(
      'API_HOST environment variable is not configured'
    );
  });
});
