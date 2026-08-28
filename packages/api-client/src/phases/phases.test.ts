describe('phases', () => {
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

  it('getPhase requests /v1/phases/:id and maps the response', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getPhase } = await import('./phases');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: { id: 'ph1', title: 'Group Stage', type: 'elimination', order: 1, is_in_progress: true }
      })
    }) as unknown as typeof fetch;

    const result = await getPhase('ph1');

    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/v1/phases/ph1', {
      headers: { 'Content-Type': 'application/json' }
    });
    expect(result).toEqual({
      id: 'ph1',
      title: 'Group Stage',
      type: 'elimination',
      order: 1,
      isInProgress: true,
      draws: [],
      eliminationStats: [],
      eliminations: []
    });
  });

  it('getGamesByPhaseId filters games by phase_id', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getGamesByPhaseId } = await import('./phases');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getGamesByPhaseId('ph1');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/games?where%5Bphase_id%5D=ph1',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });
});
