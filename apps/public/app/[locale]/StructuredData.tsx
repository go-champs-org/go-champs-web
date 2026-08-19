import { pageUrl, SITE_NAME, SITE_URL } from '../../src/seo/metadata';

interface StructuredDataProps {
  locale: string;
}

/**
 * Schema.org description of the site, so search engines can attach the brand
 * and the site name to the results they show for the home page.
 */
export const StructuredData = ({ locale }: StructuredDataProps) => {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
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
    ]
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify does not escape "</script>", which would end the tag
      // early if a name ever contained one.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, '\u003c')
      }}
    />
  );
};
