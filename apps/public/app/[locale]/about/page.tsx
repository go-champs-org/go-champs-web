import type { Metadata } from 'next';
import { buildPageMetadata } from '../../../src/seo/metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getAboutStats,
  getRecentlyViewedOrganizations
} from '@gochamps/api-client';
import {
  EXCLUDED_ORGANIZATION_SLUGS,
  FIXED_TRUSTED_ORGANIZATIONS,
  selectRotatingCandidates
} from '../../../src/about/trustedOrganizations';
import {
  AudienceSection,
  ClosingBand,
  HeroSection,
  ManifestoBand,
  MissionSection,
  OrganizersSection,
  PlatformSection,
  TeamSection,
  TrustSection
} from './sections';
import type { Translate } from './primitives';

// Without this the page is prerendered once at build time and the counters stay
// frozen until the next deploy. Stats move slowly, so hourly revalidation keeps
// them fresh without paying for a request to the API on every page view.
export const revalidate = 3600;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    ...buildPageMetadata({
      locale,
      path: '/about',
      title: t('aboutTitle'),
      description: t('aboutDescription')
    })
  };
}

// The page is worth serving without the counters, so a failure falls back to
// the "---" placeholders instead of an error page.
const loadAboutStats = async () => {
  try {
    return await getAboutStats();
  } catch (error) {
    console.error('Failed to fetch about stats:', error);
    return null;
  }
};

// The strip still shows the fixed organizations when this fails.
const loadRotatingOrganizations = async () => {
  try {
    return selectRotatingCandidates(
      await getRecentlyViewedOrganizations(),
      [
        ...FIXED_TRUSTED_ORGANIZATIONS.map(organization => organization.slug),
        ...EXCLUDED_ORGANIZATION_SLUGS
      ]
    );
  } catch (error) {
    console.error('Failed to fetch recently viewed organizations:', error);
    return [];
  }
};

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = (await getTranslations('about')) as Translate;

  const [stats, rotatingOrganizations] = await Promise.all([
    loadAboutStats(),
    loadRotatingOrganizations()
  ]);

  return (
    <main>
      <HeroSection t={t} />
      <ManifestoBand t={t} />
      <MissionSection t={t} />
      <AudienceSection t={t} />
      <TrustSection
        t={t}
        stats={stats}
        rotatingOrganizations={rotatingOrganizations}
      />
      <PlatformSection t={t} />
      <ClosingBand t={t} />
      <TeamSection t={t} />
      <OrganizersSection t={t} />
    </main>
  );
}
