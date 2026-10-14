import type { OrganizationEntity } from '@gochamps/api-client';

export interface TrustedOrganization {
  name: string;
  slug: string;
  logoUrl: string;
}

export const FIXED_TRUSTED_ORGANIZATIONS = [
  { name: 'CBB', slug: 'cbb', logo: '/about/logos/cbb.png' },
  { name: 'FGB', slug: 'ffgb', logo: '/about/logos/fgb.png' },
  { name: 'FBERJ', slug: 'fberj', logo: '/about/logos/fberj.png' }
];

export const EXCLUDED_ORGANIZATION_SLUGS = [
  'demo-organization',
  'org-test-lair'
];

export const ROTATING_SLOTS = 3;

export const selectRotatingCandidates = (
  organizations: OrganizationEntity[],
  excludedSlugs: string[]
): TrustedOrganization[] => {
  const seen = new Set(excludedSlugs);

  return organizations.reduce<TrustedOrganization[]>(
    (candidates, organization) => {
      const logoUrl = organization.logoUrl.trim();
      if (!logoUrl || seen.has(organization.slug)) {
        return candidates;
      }

      seen.add(organization.slug);
      return [
        ...candidates,
        { name: organization.name.trim(), slug: organization.slug, logoUrl }
      ];
    },
    []
  );
};

export const getRotatingWindow = <T,>(
  items: T[],
  page: number,
  size: number
): T[] => {
  if (items.length <= size) {
    return items;
  }

  const start = (page * size) % items.length;
  return Array.from(
    { length: size },
    (_, index) => items[(start + index) % items.length]
  );
};
