describe('search', () => {
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

  it('requests /v1/search with the term as a query param', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { search } = await import('./search');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await search('go champs');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/search?term=go+champs',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('normalizes a missing trailing slash on API_HOST', async () => {
    process.env.API_HOST = 'https://api.example.com/api';
    jest.resetModules();
    const { search } = await import('./search');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await search('term');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/api/v1/search?term=term',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('maps the response data through the search result mapper', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { search } = await import('./search');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: '1',
            name: 'Test League',
            slug: 'test-league',
            logo_url: 'https://example.com/logo.png',
            organization: { id: 'o1', name: 'Test Organization', slug: 'test-organization' }
          }
        ]
      })
    }) as unknown as typeof fetch;

    const result = await search('test');

    expect(result).toEqual([
      {
        id: '1',
        name: 'Test League',
        slug: 'test-league',
        logoUrl: 'https://example.com/logo.png',
        organizationName: 'Test Organization',
        organizationSlug: 'test-organization'
      }
    ]);
  });

  it('throws when API_HOST is not configured', async () => {
    delete process.env.API_HOST;
    jest.resetModules();
    const { search } = await import('./search');

    await expect(search('term')).rejects.toThrow(
      'API_HOST environment variable is not configured'
    );
  });
});
