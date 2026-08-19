import type { RecentlyViewEntity } from '@gochamps/api-client';
import { pageUrl, SITE_NAME, SITE_URL } from '../../../src/seo/metadata';

const MAX_LISTED_TOURNAMENTS = 15;

interface StructuredDataProps {
  locale: string;
  cmsUrl?: string;
  recentlyViews?: RecentlyViewEntity[];
}

/**
 * Schema.org description of the site: the brand and site name behind the
 * results, plus the tournaments the home page is currently showing.
 */
export function StructuredData({
  locale,
  cmsUrl = '',
  recentlyViews = []
}: StructuredDataProps) {
  const tournaments = recentlyViews.slice(0, MAX_LISTED_TOURNAMENTS);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo/logo-green.png`
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: SITE_NAME,
      url: pageUrl(locale, ''),
      inLanguage: locale,
      publisher: { '@id': `${SITE_URL}#organization` }
    }
  ];

  if (tournaments.length > 0) {
    graph.push({
      '@type': 'ItemList',
      name: SITE_NAME,
      itemListElement: tournaments.map((recentlyView, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: recentlyView.tournamentName,
        url: `${cmsUrl}/${recentlyView.organizationSlug}/${recentlyView.tournamentSlug}`
      }))
    });
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify does not escape "</script>", which would end the tag
      // early if a tournament name ever contained one.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph
        }).replace(/</g, '\u003c')
      }}
    />
  );
};
