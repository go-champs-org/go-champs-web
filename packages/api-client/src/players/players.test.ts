describe('getPlayer', () => {
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

  it('requests /v1/players/:id and maps the response', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getPlayer } = await import('./players');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { id: 'p1', name: 'Player A' } })
    }) as unknown as typeof fetch;

    const result = await getPlayer('p1');

    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/v1/players/p1', {
      headers: { 'Content-Type': 'application/json' }
    });
    expect(result.id).toBe('p1');
    expect(result.name).toBe('Player A');
  });
});
