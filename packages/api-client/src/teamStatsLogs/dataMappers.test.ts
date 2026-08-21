import { mapApiTeamStatsLogToEntity } from './dataMappers';

describe('mapApiTeamStatsLogToEntity', () => {
  it('maps the snake_case API fields', () => {
    const entity = mapApiTeamStatsLogToEntity({
      id: 'log1',
      game_id: 'g1',
      phase_id: 'ph1',
      team_id: 't1',
      against_team_id: 't2',
      tournament_id: 'tour1',
      stats: { points: 82 }
    });

    expect(entity).toEqual({
      id: 'log1',
      gameId: 'g1',
      phaseId: 'ph1',
      teamId: 't1',
      againstTeamId: 't2',
      tournamentId: 'tour1',
      stats: { points: '82' }
    });
  });

  it('renders the numeric totals as strings, like the player logs', () => {
    const entity = mapApiTeamStatsLogToEntity({
      id: 'log1',
      game_id: 'g1',
      phase_id: 'ph1',
      team_id: 't1',
      against_team_id: 't2',
      tournament_id: 'tour1',
      stats: { points: 8.0, field_goal_percentage: 66.7 }
    });

    expect(entity.stats).toEqual({
      points: '8',
      field_goal_percentage: '66.7'
    });
  });

  it('falls back to an empty stats map when the API sends none', () => {
    const entity = mapApiTeamStatsLogToEntity({
      id: 'log1',
      game_id: 'g1',
      phase_id: 'ph1',
      team_id: 't1',
      against_team_id: 't2',
      tournament_id: 'tour1',
      stats: undefined as unknown as Record<string, number>
    });

    expect(entity.stats).toEqual({});
  });
});
