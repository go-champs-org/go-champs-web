import { mapApiPhaseToPhaseEntity } from './dataMappers';

describe('mapApiPhaseToPhaseEntity', () => {
  it('maps snake_case API phase fields to camelCase entity fields', () => {
    const result = mapApiPhaseToPhaseEntity({
      id: 'ph1',
      title: 'Group Stage',
      type: 'elimination',
      order: 1,
      is_in_progress: true
    });

    expect(result).toEqual({
      id: 'ph1',
      title: 'Group Stage',
      type: 'elimination',
      order: 1,
      isInProgress: true,
      draws: [],
      eliminationStats: [],
      eliminations: []
    });
  });

  it('maps elimination stats and standings rows, defaulting missing placeholders/labels', () => {
    const result = mapApiPhaseToPhaseEntity({
      id: 'ph1',
      title: 'Classificação',
      type: 'elimination',
      order: 1,
      is_in_progress: true,
      elimination_stats: [
        {
          id: 'stat1',
          title: 'PTS',
          team_stat_source: 'fiba_group_points',
          ranking_order: 1,
          ranking_criteria: 'overall'
        }
      ],
      eliminations: [
        {
          id: 'group-a',
          order: 1,
          title: 'Grupo A',
          info: null,
          team_stats: [
            {
              id: 'ts1',
              team_id: 'team1',
              placeholder: null,
              stats: { stat1: 3 },
              ranking_criteria_used: null,
              ranking_stat_used: null
            }
          ]
        }
      ]
    });

    expect(result.eliminationStats).toEqual([
      {
        id: 'stat1',
        title: 'PTS',
        teamStatSource: 'fiba_group_points',
        rankingOrder: 1,
        rankingCriteria: 'overall'
      }
    ]);
    expect(result.eliminations).toEqual([
      {
        id: 'group-a',
        order: 1,
        title: 'Grupo A',
        info: '',
        teamStats: [
          {
            id: 'ts1',
            teamId: 'team1',
            placeholder: '',
            stats: { stat1: 3 },
            rankingCriteriaUsed: null,
            rankingStatUsed: ''
          }
        ]
      }
    ]);
  });

  it('maps draw rounds and matches, defaulting missing team ids/placeholders', () => {
    const result = mapApiPhaseToPhaseEntity({
      id: 'ph2',
      title: 'Playoffs',
      type: 'draw',
      order: 2,
      is_in_progress: false,
      draws: [
        {
          id: 'round1',
          order: 1,
          title: 'Final',
          matches: [
            {
              id: 'match1',
              first_team_id: 'team1',
              first_team_placeholder: null,
              first_team_score: '2',
              second_team_id: null,
              second_team_placeholder: 'Vencedor B',
              second_team_score: '0',
              name: null,
              info: null
            }
          ]
        }
      ]
    });

    expect(result.draws).toEqual([
      {
        id: 'round1',
        order: 1,
        title: 'Final',
        matches: [
          {
            id: 'match1',
            firstTeamId: 'team1',
            firstTeamPlaceholder: '',
            firstTeamScore: '2',
            secondTeamId: '',
            secondTeamPlaceholder: 'Vencedor B',
            secondTeamScore: '0',
            name: '',
            info: ''
          }
        ]
      }
    ]);
  });
});
