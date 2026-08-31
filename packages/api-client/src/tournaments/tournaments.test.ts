describe('getTournamentsByOrganizationSlug', () => {
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

  it('filters by organization_slug and maps each tournament', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getTournamentsByOrganizationSlug } = await import('./tournaments');

    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { id: 't1', name: 'Taça Bauru', slug: 'tacabauru', logo_url: 'https://x/l.png' },
          { id: 't2', name: 'Copa Paulista', slug: 'copa-paulista' }
        ]
      })
    });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await getTournamentsByOrganizationSlug('nlbb');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/v1/tournaments?where%5Borganization_slug%5D=nlbb',
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result).toEqual([
      { id: 't1', name: 'Taça Bauru', slug: 'tacabauru', logoUrl: 'https://x/l.png' },
      { id: 't2', name: 'Copa Paulista', slug: 'copa-paulista', logoUrl: '' }
    ]);
  });
});

describe('getTournamentBySlug', () => {
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

  it('filters by organization_slug+slug, then fetches the full tournament by id', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getTournamentBySlug } = await import('./tournaments');

    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [{ id: 'tour1', name: 'x', slug: 'x' }] })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: { id: 'tour1', name: 'Test League', slug: 'test-league', teams: [] }
        })
      });
    global.fetch = fetchMock as unknown as typeof fetch;

    const result = await getTournamentBySlug('test-org', 'test-league');

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://api.example.com/v1/tournaments?where%5Borganization_slug%5D=test-org&where%5Bslug%5D=test-league',
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://api.example.com/v1/tournaments/tour1',
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result).toEqual({
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      logoUrl: '',
      organization: { id: '', name: '', slug: '', logoUrl: '' },
      teams: [],
      players: [],
      phases: [],
      sportSlug: '',
      hasAggregatedPlayerStats: false,
      sportName: '',
      playerStats: [],
      scoreboardSetting: { liveSiteUpdate: 'full-live-update' }
    });
  });

  it('maps the nested organization', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getTournamentBySlug } = await import('./tournaments');

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [{ id: 'tour1', name: 'x', slug: 'x' }] })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: {
            id: 'tour1',
            name: 'Test League',
            slug: 'test-league',
            teams: [],
            organization: {
              id: 'org1',
              name: 'Test Org',
              slug: 'test-org',
              logo_url: 'https://example.com/org.png'
            }
          }
        })
      }) as unknown as typeof fetch;

    const result = await getTournamentBySlug('test-org', 'test-league');

    expect(result.organization).toEqual({
      id: 'org1',
      name: 'Test Org',
      slug: 'test-org',
      logoUrl: 'https://example.com/org.png'
    });
  });

  it('throws an ApiError when no tournament matches the filter', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getTournamentBySlug } = await import('./tournaments');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await expect(getTournamentBySlug('missing-org', 'missing-slug')).rejects.toMatchObject({
      name: 'ApiError',
      status: 404
    });
  });
});
