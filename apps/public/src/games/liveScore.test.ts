import {
  isLiveGame,
  mapScoreboardGameToLiveScore,
  scoreboardGameEnded,
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

describe('scoreboardGameEnded', () => {
  const responseWith = (liveState?: string) => ({
    data: {
      home_team: { total_player_stats: { points: 62 } },
      away_team: { total_player_stats: { points: 58 } },
      ...(liveState === undefined ? {} : { live_state: { state: liveState } })
    }
  });

  it('ends on any state other than in progress', () => {
    expect(scoreboardGameEnded(responseWith('ended'))).toBe(true);
    expect(scoreboardGameEnded(responseWith('not_started'))).toBe(true);
  });

  it('keeps a running game going', () => {
    expect(scoreboardGameEnded(responseWith('in_progress'))).toBe(false);
  });

  it('keeps polling when the scoreboard sends no live state', () => {
    expect(scoreboardGameEnded(responseWith())).toBe(false);
  });
});
