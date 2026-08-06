import { mapApiSearchTournamentToSearchResultEntity } from '@gochamps/api-client';

describe('mapApiSearchTournamentToSearchResultEntity', () => {
  it('maps snake_case API fields to camelCase entity fields', () => {
    const result = mapApiSearchTournamentToSearchResultEntity({
      id: '1',
      name: 'Test League',
      slug: 'test-league',
      logo_url: 'https://example.com/logo.png',
      organization: {
        id: 'o1',
        name: 'Test Organization',
        slug: 'test-organization'
      }
    });

    expect(result).toEqual({
      id: '1',
      name: 'Test League',
      slug: 'test-league',
      logoUrl: 'https://example.com/logo.png',
      organizationName: 'Test Organization',
      organizationSlug: 'test-organization'
    });
  });

  it('defaults logoUrl to empty string when absent', () => {
    const result = mapApiSearchTournamentToSearchResultEntity({
      id: '2',
      name: 'Test Team',
      slug: 'test-team',
      organization: {
        id: 'o2',
        name: 'Another Organization',
        slug: 'another-organization'
      }
    });

    expect(result.logoUrl).toBe('');
  });
});
