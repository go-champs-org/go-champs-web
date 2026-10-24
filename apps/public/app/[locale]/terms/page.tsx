import type { Metadata } from 'next';
import { buildPageMetadata } from '../../../src/seo/metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import LegalDocumentPage from '../../../src/legal/LegalDocumentPage';

// The text comes from the API (GC-346). A new version takes effect by date, so
// the page is revalidated hourly instead of frozen at build time.
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
      path: '/terms',
      title: t('termsTitle'),
      description: t('termsDescription')
    })
  };
}

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LegalDocumentPage kind="terms_of_use" fallbackTitle="Termos de Uso" />;
}
