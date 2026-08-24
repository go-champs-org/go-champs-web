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

describe('getGamesByFilter', () => {
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

  it('requests /v1/games with the team or-filter query string', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getGamesByFilter } = await import('./games');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getGamesByFilter({
      or: [{ home_team_id: 'team-1' }, { away_team_id: 'team-1' }]
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/games?where[or][0][home_team_id]=team-1&where[or][1][away_team_id]=team-1',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('serializes plain equality keys before the or conditions', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getGamesByFilter } = await import('./games');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getGamesByFilter({
      phase_id: 'ph1',
      or: [{ home_team_id: 'team-1' }, { away_team_id: 'team-1' }]
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/games?where[phase_id]=ph1&where[or][0][home_team_id]=team-1&where[or][1][away_team_id]=team-1',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('requests /v1/games with no query string when the filter is empty', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getGamesByFilter } = await import('./games');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    await getGamesByFilter({});

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/v1/games',
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('maps the response array to game entities', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getGamesByFilter } = await import('./games');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 'g1',
            away_score: 1,
            home_score: 2,
            is_finished: true,
            location: 'Arena X',
            phase_id: 'ph1',
            live_state: 'ended',
            result_type: 'normal',
            home_team: { id: 't1', name: 'Home Team' }
          },
          {
            id: 'g2',
            away_score: 0,
            home_score: 0,
            is_finished: false,
            location: 'Arena Y',
            phase_id: 'ph1',
            live_state: 'not_started',
            result_type: 'normal'
          }
        ]
      })
    }) as unknown as typeof fetch;

    const result = await getGamesByFilter({
      or: [{ home_team_id: 't1' }, { away_team_id: 't1' }]
    });

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('g1');
    expect(result[0].homeScore).toBe(2);
    expect(result[0].awayScore).toBe(1);
    expect(result[0].homeTeam.name).toBe('Home Team');
    expect(result[1].id).toBe('g2');
    expect(result[1].isFinished).toBe(false);
    expect(result[1].homeTeam.id).toBe('');
  });

  it('returns an empty array when no games match the filter', async () => {
    process.env.API_HOST = 'https://api.example.com';
    jest.resetModules();
    const { getGamesByFilter } = await import('./games');

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] })
    }) as unknown as typeof fetch;

    const result = await getGamesByFilter({
      or: [{ home_team_id: 'unknown' }, { away_team_id: 'unknown' }]
    });

    expect(result).toEqual([]);
  });
});
