import { ApiOrganization } from '../../Shared/httpClient/apiTypes';
import cbbLogo from '../../assets/about/logos/cbb.png';
import fgbLogo from '../../assets/about/logos/fgb.png';
import fberjLogo from '../../assets/about/logos/fberj.png';

export interface TrustedOrganization {
  name: string;
  slug: string;
  logoUrl: string;
}

// Always shown first in the "Quem organiza confia" strip. Their logos ship
// with the app so the strip never depends on what the API serves for them.
export const FIXED_TRUSTED_ORGANIZATIONS: TrustedOrganization[] = [
  { name: 'CBB', slug: 'cbb', logoUrl: cbbLogo },
  { name: 'FGB', slug: 'ffgb', logoUrl: fgbLogo },
  { name: 'FBERJ', slug: 'fberj', logoUrl: fberjLogo }
];

// Demo and test organizations that have a logo but must never be shown as
// organizations using the platform.
export const EXCLUDED_ORGANIZATION_SLUGS = [
  'demo-organization',
  'org-test-lair'
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
