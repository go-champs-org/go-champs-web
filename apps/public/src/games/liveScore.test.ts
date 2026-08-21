import {
  isLiveGame,
  mapScoreboardGameToLiveScore,
  scoreboardGameUrl
} from './liveScore';

describe('isLiveGame', () => {
  it('is live only while the game is in progress', () => {
    expect(isLiveGame('in_progress')).toBe(true);
    expect(isLiveGame('ended')).toBe(false);
    expect(isLiveGame('not_started')).toBe(false);
    expect(isLiveGame('')).toBe(false);
  });
});

describe('scoreboardGameUrl', () => {
  it('builds the game endpoint from the scoreboard host', () => {
    expect(scoreboardGameUrl('https://scoreboard.test', 'g1')).toBe(
      'https://scoreboard.test/v1/games/g1'
    );
  });

  it('does not double the slash when the host carries a trailing one', () => {
    expect(scoreboardGameUrl('https://scoreboard.test/', 'g1')).toBe(
      'https://scoreboard.test/v1/games/g1'
    );
  });
});

describe('mapScoreboardGameToLiveScore', () => {
  it('reads the running score from each team total', () => {
    expect(
      mapScoreboardGameToLiveScore({
        data: {
          home_team: { total_player_stats: { points: 62 } },
          away_team: { total_player_stats: { points: 58 } }
        }
      })
    ).toEqual({ homeScore: 62, awayScore: 58 });
  });

  it('falls back to zero before the first basket', () => {
    expect(
      mapScoreboardGameToLiveScore({
        data: {
          home_team: { total_player_stats: {} },
          away_team: { total_player_stats: {} }
        }
      })
    ).toEqual({ homeScore: 0, awayScore: 0 });
  });
});
