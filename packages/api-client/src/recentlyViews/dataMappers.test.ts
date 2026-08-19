import { mapApiRecentlyViewToRecentlyViewEntity } from './dataMappers';

describe('mapApiRecentlyViewToRecentlyViewEntity', () => {
  it('flattens the nested tournament and organization into one entity', () => {
    const result = mapApiRecentlyViewToRecentlyViewEntity({
      views: 242,
      tournament: {
        id: 't1',
        name: 'Test League',
        slug: 'test-league',
        organization: {
          id: 'o1',
          name: 'Test Organization',
          slug: 'test-organization',
          logo_url: 'https://example.com/logo.png'
        }
      }
    });

    expect(result).toEqual({
      tournamentId: 't1',
      tournamentName: 'Test League',
      tournamentSlug: 'test-league',
      organizationName: 'Test Organization',
      organizationSlug: 'test-organization',
      organizationLogoUrl: 'https://example.com/logo.png',
      views: 242
    });
  });

  it('defaults organizationLogoUrl to empty string when the API sends null', () => {
    const result = mapApiRecentlyViewToRecentlyViewEntity({
      views: 7,
      tournament: {
        id: 't2',
        name: 'Another League',
        slug: 'another-league',
        organization: {
          id: 'o2',
          name: 'Another Organization',
          slug: 'another-organization',
          logo_url: null
        }
      }
    });

    expect(result.organizationLogoUrl).toBe('');
  });
});
