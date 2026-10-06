import { ApiOrganization } from '../../Shared/httpClient/apiTypes';

export interface TrustedOrganization {
  name: string;
  slug: string;
  logoUrl: string;
}

// Always shown first in the "Quem organiza confia" strip.
export const FIXED_TRUSTED_ORGANIZATIONS: TrustedOrganization[] = [
  {
    name: 'CBB',
    slug: 'cbb',
    logoUrl:
      'https://go-champs.com/media/organization-logos/uploads/b0ef741f-cf69-4025-a3fa-5cad7ea26a36_FDSFSD.png'
  },
  {
    name: 'FGB',
    slug: 'ffgb',
    logoUrl:
      'https://go-champs.com/media/organization-logos/uploads/1fc2dac0-c006-49ea-959d-153501960d6e_FGB.jpg'
  },
  {
    name: 'FBERJ',
    slug: 'fberj',
    logoUrl:
      'https://go-champs.com/media/organization-logos/uploads/3f101608-4264-4499-9d9b-108b95e4ae14_FBERJ 1.jpeg'
  }
];

// Slots after the fixed organizations, filled by rotating through the
// recently viewed organizations.
export const ROTATING_SLOTS = 3;

/**
 * Recently viewed organizations that can fill a rotating slot: the ones with
 * a logo, once each, leaving out the fixed organizations.
 */
export const selectRotatingCandidates = (
  organizations: ApiOrganization[],
  excludedSlugs: string[]
): TrustedOrganization[] => {
  const seen = new Set(excludedSlugs);

  return organizations.reduce<TrustedOrganization[]>(
    (candidates, organization) => {
      const logoUrl = organization.logo_url && organization.logo_url.trim();
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

/**
 * The `size` items shown on a given page of the rotation, wrapping around the
 * end of the list. A list that fits in one page is returned as is.
 */
export const getRotatingWindow = <T>(
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
