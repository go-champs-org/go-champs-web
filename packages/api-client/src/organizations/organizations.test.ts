describe('getOrganizationBySlug', () => {
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

  it('filters by slug and maps the first match', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getOrganizationBySlug } = await import('./organizations');

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 'org1',
            name: 'Test Org',
            slug: 'test-org',
            logo_url: 'https://example.com/logo.png'
          }
        ]
      })
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await getOrganizationBySlug('test-org');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/v1/organizations?where%5Bslug%5D=test-org',
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result).toEqual({
      id: 'org1',
      name: 'Test Org',
      slug: 'test-org',
      logoUrl: 'https://example.com/logo.png'
    });
  });

  it('throws an ApiError when no organization matches the slug', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getOrganizationBySlug } = await import('./organizations');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await expect(getOrganizationBySlug('missing-org')).rejects.toMatchObject({
      name: 'ApiError',
      status: 404
    });
  });
});

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
});
