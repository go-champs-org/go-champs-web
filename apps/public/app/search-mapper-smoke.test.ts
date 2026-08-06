import { mapApiSearchTournamentToSearchResultEntity } from '@gochamps/api-client';

describe('mapApiSearchTournamentToSearchResultEntity', () => {
  it('maps snake_case API fields to camelCase entity fields', () => {
    const result = mapApiSearchTournamentToSearchResultEntity({
      id: '1',
      name: 'Liga Teste',
      slug: 'liga-teste',
      logo_url: 'https://example.com/logo.png',
      organization: {
        id: 'o1',
        name: 'Organização Teste',
        slug: 'organizacao-teste'
      }
    });

    expect(result).toEqual({
      id: '1',
      name: 'Liga Teste',
      slug: 'liga-teste',
      logoUrl: 'https://example.com/logo.png',
      organizationName: 'Organização Teste',
      organizationSlug: 'organizacao-teste'
    });
  });

  it('defaults logoUrl to empty string when absent', () => {
    const result = mapApiSearchTournamentToSearchResultEntity({
      id: '2',
      name: 'Time Teste',
      slug: 'time-teste',
      organization: {
        id: 'o2',
        name: 'Outra Org',
        slug: 'outra-org'
      }
    });

    expect(result.logoUrl).toBe('');
  });
});
