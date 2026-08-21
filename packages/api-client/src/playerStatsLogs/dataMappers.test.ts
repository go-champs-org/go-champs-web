import { mapApiPlayerStatsLogToEntity } from './dataMappers';

describe('mapApiPlayerStatsLogToEntity', () => {
  it('maps the snake_case API fields', () => {
    expect(
      mapApiPlayerStatsLogToEntity({
        id: 'log1',
        game_id: 'g1',
        phase_id: 'ph1',
        player_id: 'p1',
        team_id: 't1',
        tournament_id: 'tour1',
        stats: { points: '12', assists: '3' }
      })
    ).toEqual({
      id: 'log1',
      gameId: 'g1',
      phaseId: 'ph1',
      playerId: 'p1',
      teamId: 't1',
      tournamentId: 'tour1',
      stats: { points: '12', assists: '3' }
    });
  });

  it('falls back to an empty stats map for a player who has not played yet', () => {
    const entity = mapApiPlayerStatsLogToEntity({
      id: 'log1',
      game_id: 'g1',
      phase_id: 'ph1',
      player_id: 'p1',
      team_id: 't1',
      tournament_id: 'tour1',
      stats: undefined as unknown as Record<string, string>
    });

    expect(entity.stats).toEqual({});
  });
});
