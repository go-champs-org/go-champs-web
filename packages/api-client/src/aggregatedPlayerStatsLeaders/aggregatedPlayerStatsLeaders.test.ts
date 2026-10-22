describe('getAggregatedPlayerStatsLeaders', () => {
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

  const loadWithFetch = async (data: unknown[] = []) => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getAggregatedPlayerStatsLeaders } = await import(
      './aggregatedPlayerStatsLeaders'
    );

    global.fetch = (jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data })
    }) as unknown) as typeof fetch;

    return getAggregatedPlayerStatsLeaders;
  };

  it('asks for the tournament leaders of every stat, in order', async () => {
    const getAggregatedPlayerStatsLeaders = await loadWithFetch();

    await getAggregatedPlayerStatsLeaders({
      tournamentId: 't1',
      stats: ['points', 'points_per_game']
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/aggregated-player-stats-leaders?where%5Btournament_id%5D=t1&stats%5B%5D=points&stats%5B%5D=points_per_game',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json' }
      })
    );
  });

  it('leaves stats out when none are given, and narrows to a phase', async () => {
    const getAggregatedPlayerStatsLeaders = await loadWithFetch();

    await getAggregatedPlayerStatsLeaders({
      tournamentId: 't1',
      phaseId: 'ph1'
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/aggregated-player-stats-leaders?where%5Btournament_id%5D=t1&where%5Bphase_id%5D=ph1',
      expect.anything()
    );
  });

  it('maps every group to entities', async () => {
    const getAggregatedPlayerStatsLeaders = await loadWithFetch([
      {
        stat_key: 'points_per_game',
        qualifier: { game_played: 3 },
        leaders: [
          {
            player_id: 'p1',
            team_id: 'team1',
            value: 21.5,
            player: {
              name: 'Ana',
              shirt_number: '7',
              photo_url: 'https://photo'
            }
          }
        ]
      }
    ]);

    const result = await getAggregatedPlayerStatsLeaders({
      tournamentId: 't1'
    });

    expect(result).toEqual([
      {
        statKey: 'points_per_game',
        qualifier: { game_played: 3 },
        leaders: [
          {
            playerId: 'p1',
            teamId: 'team1',
            value: 21.5,
            playerName: 'Ana',
            shirtNumber: '7',
            photoUrl: 'https://photo'
          }
        ]
      }
    ]);
  });
});
