import { mapApiGameToGameEntity } from './dataMappers';

describe('mapApiGameToGameEntity', () => {
  it('maps snake_case API game fields to camelCase entity fields', () => {
    const result = mapApiGameToGameEntity({
      id: 'g1',
      away_score: 10,
      home_score: 12,
      is_finished: true,
      location: 'Arena X',
      phase_id: 'ph1',
      live_state: 'not_started',
      result_type: 'normal'
    });

    expect(result).toEqual({
      id: 'g1',
      awayPlaceholder: '',
      awayScore: 10,
      awayTeam: { id: '', name: '', logoUrl: '', triCode: '', primaryColor: '', coaches: [] },
      datetime: '',
      homePlaceholder: '',
      homeScore: 12,
      homeTeam: { id: '', name: '', logoUrl: '', triCode: '', primaryColor: '', coaches: [] },
      info: '',
      isFinished: true,
      location: 'Arena X',
      city: '',
      number: '',
      phaseId: 'ph1',
      youTubeCode: '',
      liveState: 'not_started',
      resultType: 'normal'
    });
  });

  it('maps nested away/home teams when present', () => {
    const result = mapApiGameToGameEntity({
      id: 'g2',
      away_score: 5,
      away_team: { id: 'ta', name: 'Team A', primary_color: null },
      home_score: 7,
      home_team: { id: 'tb', name: 'Team B', primary_color: null },
      is_finished: false,
      location: 'Arena Y',
      phase_id: 'ph2',
      live_state: 'in_progress',
      result_type: 'normal'
    });

    expect(result.awayTeam.id).toBe('ta');
    expect(result.homeTeam.id).toBe('tb');
  });
});
