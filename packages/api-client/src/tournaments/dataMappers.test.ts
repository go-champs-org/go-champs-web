import { mapApiTournamentToTournamentWithTeamsEntity } from './dataMappers';

describe('mapApiTournamentToTournamentWithTeamsEntity', () => {
  it('maps snake_case API tournament fields, including nested teams', () => {
    const result = mapApiTournamentToTournamentWithTeamsEntity({
      id: 'tour1',
      name: 'Test League',
      slug: 'test-league',
      logo_url: 'https://example.com/logo.png',
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
});
