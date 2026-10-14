'use client';

import { useRotatingOrganizations } from '../../../src/about/useRotatingOrganizations';
import type { TrustedOrganization } from '../../../src/about/trustedOrganizations';
import { OrganizationTile } from './OrganizationTile';

export function RotatingOrganizations({
  candidates
}: {
  candidates: TrustedOrganization[];
}) {
  const { organizations, page } = useRotatingOrganizations(candidates);

  return (
    <>
      {organizations.map(organization => (
        <OrganizationTile
          key={`${page}-${organization.slug}`}
          name={organization.name}
          slug={organization.slug}
          logo={organization.logoUrl}
          className="logo-fade-in"
        />
      ))}
    </>
  );
}
