import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getOrganizationBySlug,
  getTournamentsByOrganizationSlug,
  type OrganizationEntity,
  type TournamentEntity
} from '@gochamps/api-client';
import { Avatar, ProfileBanner, RemoteImage, Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { buildPageMetadata } from '@/src/seo/metadata';

// The organization's identity moves as rarely as a tournament's, so the
// rendered HTML can be reused for minutes at a time.
export const revalidate = 300;

export async function generateStaticParams() {
  return [];
}

interface OrganizationPageParams {
  locale: string;
  org: string;
}

const organizationPagePath = ({ org }: OrganizationPageParams): string =>
  `/${org}`;

// generateMetadata and the page both need the organization; cache() avoids
// fetching it twice per request.
const loadOrganization = cache(
  async (org: string): Promise<OrganizationEntity | null> => {
    try {
      return await getOrganizationBySlug(org);
    } catch (error) {
      if (isNotFoundError(error)) return null;
      throw error;
    }
  }
);

// The tournament list is a companion to the organization: an unreachable
// endpoint leaves the page standing with an empty list instead of taking it
// down.
const loadTournaments = (org: string): Promise<TournamentEntity[]> =>
  getTournamentsByOrganizationSlug(org).catch(() => []);

export async function generateMetadata({
  params
}: {
  params: Promise<OrganizationPageParams>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { locale, org } = routeParams;
  const [organization, t] = await Promise.all([
    loadOrganization(org),
    getTranslations({ locale, namespace: 'metadata' })
  ]);

  const values = { organization: organization?.name || org };

  return buildPageMetadata({
    locale,
    path: organizationPagePath(routeParams),
    title: t('organizationTitle', values),
    description: t('organizationDescription', values),
    noIndex: !organization
  });
}

interface OrganizationHeaderProps {
  organization: OrganizationEntity;
  homeHref: string;
  homeLabel: string;
  tournamentsCountLabel: string;
}

function OrganizationHeader({
  organization,
  homeHref,
  homeLabel,
  tournamentsCountLabel
}: OrganizationHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <nav aria-label="Breadcrumb" className="text-xs text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={homeHref} className="hover:text-primary-dark">
              {homeLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-primary-dark" aria-current="page">
            {organization.name}
          </li>
        </ol>
      </nav>
      <Surface className="overflow-hidden p-0">
        <ProfileBanner as="div" className="h-16 md:h-20" ariaHidden />
        <div className="flex flex-wrap items-center gap-4 p-4 md:p-6">
          <Avatar
            name={organization.name}
            logoUrl={organization.logoUrl}
            size={64}
          />
          <h1 className="min-w-0 flex-1 text-xl font-extrabold leading-tight text-foreground md:text-2xl">
            {organization.name}
          </h1>
        </div>
        <div className="flex border-t border-border">
          <div className="flex flex-1 flex-col items-center gap-1 py-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">
              {tournamentsCountLabel}
            </span>
          </div>
        </div>
      </Surface>
    </div>
  );
}

interface TournamentGridProps {
  tournaments: TournamentEntity[];
  org: string;
  locale: string;
  emptyLabel: string;
}

function TournamentGrid({
  tournaments,
  org,
  locale,
  emptyLabel
}: TournamentGridProps) {
  if (tournaments.length === 0) {
    return (
      <Surface className="p-6 text-center">
        <p className="text-sm text-muted">{emptyLabel}</p>
      </Surface>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tournaments.map(tournament => (
        <Link
          key={tournament.id}
          href={`/${locale}/${org}/${tournament.slug}`}
          className="block"
        >
          <Surface className="flex items-center gap-3 p-4 hover:border-primary">
            {tournament.logoUrl ? (
              <RemoteImage
                src={tournament.logoUrl}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-extrabold text-[#4d6b2c]">
                {tournament.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="min-w-0 truncate font-semibold text-foreground">
              {tournament.name}
            </span>
          </Surface>
        </Link>
      ))}
    </div>
  );
}

export default async function OrganizationPage({
  params
}: {
  params: Promise<OrganizationPageParams>;
}) {
  const { locale, org } = await params;
  setRequestLocale(locale);

  const [organization, tournaments, t] = await Promise.all([
    loadOrganization(org),
    loadTournaments(org),
    getTranslations('organization')
  ]);

  if (!organization) notFound();

  return (
    <main
      data-testid="organization-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-6">
        <OrganizationHeader
          organization={organization}
          homeHref={`/${locale}`}
          homeLabel={t('breadcrumbHome')}
          tournamentsCountLabel={t('tournamentsCount', {
            count: tournaments.length
          })}
        />
        <TournamentGrid
          tournaments={tournaments}
          org={org}
          locale={locale}
          emptyLabel={t('noTournaments')}
        />
      </div>
    </main>
  );
}
