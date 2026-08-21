describe('getPlayerStatsLogsByGame', () => {
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

  it('filters the logs by game_id and maps the response', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getPlayerStatsLogsByGame } = await import('./playerStatsLogs');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 'log1',
            game_id: 'g1',
            phase_id: 'ph1',
            player_id: 'p1',
            team_id: 't1',
            tournament_id: 'tour1',
            stats: { points: '12' }
          }
        ]
      })
    }) as unknown as typeof fetch;

    const result = await getPlayerStatsLogsByGame('g1');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/player-stats-logs?where%5Bgame_id%5D=g1',
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(result).toEqual([
      {
        id: 'log1',
        gameId: 'g1',
        phaseId: 'ph1',
        playerId: 'p1',
        teamId: 't1',
        tournamentId: 'tour1',
        stats: { points: '12' }
      }
    ]);
  });
});
