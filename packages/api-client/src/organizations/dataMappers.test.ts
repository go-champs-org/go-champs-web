import { mapApiOrganizationToOrganizationEntity } from './dataMappers';

describe('mapApiOrganizationToOrganizationEntity', () => {
  it('maps snake_case API fields to camelCase entity fields', () => {
    const result = mapApiOrganizationToOrganizationEntity({
      id: 'o1',
      name: 'Test Organization',
      slug: 'test-organization',
      logo_url: 'https://example.com/logo.png'
    });

    expect(result).toEqual({
      id: 'o1',
      name: 'Test Organization',
      slug: 'test-organization',
      logoUrl: 'https://example.com/logo.png'
    });
  });

  it('defaults logoUrl to empty string when the API sends null', () => {
    const result = mapApiOrganizationToOrganizationEntity({
      id: 'o2',
      name: 'Another Organization',
      slug: 'another-organization',
      logo_url: null
    });

    expect(result.logoUrl).toBe('');
  });
});
