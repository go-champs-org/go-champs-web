import {
  mapApiTournamentToTournamentWithTeamsEntity,
  playerStatThatIsVisible
} from './dataMappers';

describe('mapApiTournamentToTournamentWithTeamsEntity', () => {
  it('maps snake_case API tournament fields, including nested teams', () => {
    const result = mapApiTournamentToTournamentWithTeamsEntity({
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      logo_url: 'https://example.com/logo.png',
      sport_slug: 'basketball_5x5',
      sport_name: 'Basketball 5x5',
      teams: [
        {
          id: 't1',
          name: 'Team A',
          primary_color: '#FF0000'
        }
      ]
    });

    expect(result).toEqual({
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      logoUrl: 'https://example.com/logo.png',
      sportSlug: 'basketball_5x5',
      sportName: 'Basketball 5x5',
      playerStats: [],
      scoreboardSetting: { liveSiteUpdate: 'full-live-update' },
      teams: [
        {
          id: 't1',
          name: 'Team A',
          logoUrl: '',
          triCode: '',
          primaryColor: '#FF0000',
          coaches: []
        }
      ]
    });
  });

  it('maps the stat columns and marks the CMS-private slugs as private', () => {
    const result = mapApiTournamentToTournamentWithTeamsEntity({
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      teams: [],
      player_stats: [
        { id: 'ps1', title: 'Points', slug: 'points' },
        { id: 'ps2', title: 'Plus minus', slug: 'plus_minus' }
      ]
    });

    expect(result.playerStats).toEqual([
      { id: 'ps1', title: 'Points', slug: 'points', visibility: 'public' },
      {
        id: 'ps2',
        title: 'Plus minus',
        slug: 'plus_minus',
        visibility: 'private'
      }
    ]);
  });

  it('reads the live-update setting of the tournament', () => {
    const result = mapApiTournamentToTournamentWithTeamsEntity({
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      teams: [],
      scoreboard_setting: {
        id: 'sb1',
        live_site_update: 'team-score-live-update'
      }
    });

    expect(result.scoreboardSetting).toEqual({
      liveSiteUpdate: 'team-score-live-update'
    });
  });

  it('falls back to the default for a live-update mode it does not know', () => {
    const result = mapApiTournamentToTournamentWithTeamsEntity({
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      teams: [],
      scoreboard_setting: {
        id: 'sb1',
        live_site_update: 'some-future-mode'
      }
    });

    expect(result.scoreboardSetting).toEqual({
      liveSiteUpdate: 'full-live-update'
    });
  });

  it('gives each tournament without settings its own default object', () => {
    const apiTournament = {
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      teams: []
    };

    const first = mapApiTournamentToTournamentWithTeamsEntity(apiTournament);
    const second = mapApiTournamentToTournamentWithTeamsEntity(apiTournament);

    expect(first.scoreboardSetting).not.toBe(second.scoreboardSetting);
  });

  it('treats a tournament without scoreboard settings as fully live, like the CMS', () => {
    const result = mapApiTournamentToTournamentWithTeamsEntity({
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      teams: []
    });

    expect(result.scoreboardSetting).toEqual({
      liveSiteUpdate: 'full-live-update'
    });
    expect(result.sportSlug).toBe('');
  });
});

describe('playerStatThatIsVisible', () => {
  it('keeps the public stats out of the private ones', () => {
    const stats = [
      { id: 'ps1', title: 'Points', slug: 'points', visibility: 'public' },
      {
        id: 'ps2',
        title: 'Plus minus',
        slug: 'plus_minus',
        visibility: 'private'
      }
    ] as const;

    expect(stats.filter(playerStatThatIsVisible).map(stat => stat.slug)).toEqual([
      'points'
    ]);
  });
});
