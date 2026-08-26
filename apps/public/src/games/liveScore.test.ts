import {
  isLiveGame,
  mapScoreboardGameToLiveScore,
  scoreboardGameEnded,
  scoreboardGameUrl,
  scoreboardTeamRows,
  scoreboardTeamTotals,
  type ScoreboardApiTeam
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
          home_team: { total_player_stats: { points: 62 }, players: [] },
          away_team: { total_player_stats: { points: 58 }, players: [] }
        }
      })
    ).toEqual({ homeScore: 62, awayScore: 58 });
  });

  it('falls back to zero before the first basket', () => {
    expect(
      mapScoreboardGameToLiveScore({
        data: {
          home_team: { total_player_stats: {}, players: [] },
          away_team: { total_player_stats: {}, players: [] }
        }
      })
    ).toEqual({ homeScore: 0, awayScore: 0 });
  });
});

describe('scoreboardGameEnded', () => {
  const responseWith = (liveState?: string) => ({
    data: {
      home_team: { total_player_stats: { points: 62 }, players: [] },
      away_team: { total_player_stats: { points: 58 }, players: [] },
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

describe('scoreboardTeamRows', () => {
  const team = (players: ScoreboardApiTeam['players']): ScoreboardApiTeam => ({
    total_player_stats: {},
    players
  });

  it('maps each player to a row named and keyed by the scoreboard', () => {
    const rows = scoreboardTeamRows(
      team([{ id: 'p1', name: 'Ana', number: '7', stats_values: { points: 12 } }])
    );

    expect(rows).toEqual([{ playerId: 'p1', name: 'Ana', stats: { points: '12' } }]);
  });

  it('stringifies every statistic, even a zero', () => {
    const rows = scoreboardTeamRows(
      team([{ id: 'p1', name: 'Ana', stats_values: { points: 0, assists: 3 } }])
    );

    expect(rows[0].stats).toEqual({ points: '0', assists: '3' });
  });

  it('reads no rows for a team the scoreboard has not started scoring', () => {
    expect(scoreboardTeamRows(team([]))).toEqual([]);
  });
});

describe('scoreboardTeamTotals', () => {
  it('stringifies the team totals the same way a player row is', () => {
    const totals = scoreboardTeamTotals({
      total_player_stats: { points: 82, rebounds: 40 },
      players: []
    });

    expect(totals).toEqual({ points: '82', rebounds: '40' });
  });

  it('reads an empty totals row before the scoreboard reports any', () => {
    expect(scoreboardTeamTotals({ total_player_stats: {}, players: [] })).toEqual({});
  });
});
