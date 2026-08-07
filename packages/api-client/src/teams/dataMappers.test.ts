import { mapApiTeamToTeamEntity } from './dataMappers';

describe('mapApiTeamToTeamEntity', () => {
  it('maps snake_case API team fields to camelCase entity fields', () => {
    const result = mapApiTeamToTeamEntity({
      id: 't1',
      name: 'Team A',
      logo_url: 'https://example.com/a.png',
      tri_code: 'TMA',
      primary_color: '#FF0000',
      coaches: [{ id: 'c1', name: 'Coach A', type: 'head' }]
    });

    expect(result).toEqual({
      id: 't1',
      name: 'Team A',
      logoUrl: 'https://example.com/a.png',
      triCode: 'TMA',
      primaryColor: '#FF0000',
      coaches: [{ id: 'c1', name: 'Coach A', type: 'head' }]
    });
  });

  it('defaults optional fields when absent', () => {
    const result = mapApiTeamToTeamEntity({
      id: 't2',
      name: 'Team B',
      primary_color: null
    });

    expect(result).toEqual({
      id: 't2',
      name: 'Team B',
      logoUrl: '',
      triCode: '',
      primaryColor: '',
      coaches: []
    });
  });
});
