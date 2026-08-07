describe('getGame', () => {
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

  it('requests /v1/games/:id and maps the response', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getGame } = await import('./games');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: {
          id: 'g1',
          away_score: 1,
          home_score: 2,
          is_finished: true,
          location: 'Arena X',
          phase_id: 'ph1',
          live_state: 'ended',
          result_type: 'normal'
        }
      })
    }) as unknown as typeof fetch;

    const result = await getGame('g1');

    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/v1/games/g1', {
      headers: { 'Content-Type': 'application/json' }
    });
    expect(result.id).toBe('g1');
    expect(result.awayScore).toBe(1);
    expect(result.homeScore).toBe(2);
  });
});
