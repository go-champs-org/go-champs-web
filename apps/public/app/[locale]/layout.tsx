import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NavBar, Footer, noFlashThemeScript } from '@gochamps/ui';
import { routing } from '../../src/i18n/routing';
import { GoogleAnalytics } from '../analytics/GoogleAnalytics';
import { Amplitude } from '../analytics/Amplitude';
import '../globals.css';

export const metadata = {
  title: 'Go Champs',
  description: 'Go Champs — campeonatos, times e jogadores'
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations('common');
  const tFooter = await getTranslations('footer');
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || '';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <Amplitude apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''} />
        <NextIntlClientProvider>
          <NavBar
            links={[
              { href: `/${locale}/about`, label: t('navAbout') },
              { href: `/${locale}/faq`, label: t('navFaq') },
              { href: `/${locale}/contact`, label: t('navContact') }
            ]}
            logoHref={`/${locale}`}
            logoSrc="/logo/logo-white-name.png"
            logoSrcMobile="/logo/logo-green.png"
            loginHref={process.env.NEXT_PUBLIC_CMS_URL || '/SignIn'}
            loginLabel={t('navLogin')}
          />
          {children}
          <Footer
            t={{
              with: tFooter('with'),
              byGoChampsTeam: tFooter('byGoChampsTeam'),
              theSourceCodeIsLicensed: tFooter('theSourceCodeIsLicensed'),
              privacyPolicyBR: tFooter('privacyPolicyBR'),
              termsBR: tFooter('termsBR'),
              copyright: tFooter('copyright'),
              andContributors: tFooter('andContributors'),
              allRightsReserved: tFooter('allRightsReserved'),
              apiDocumentationPrefix: tFooter('apiDocumentationPrefix'),
              apiDocumentationSuffix: tFooter('apiDocumentationSuffix')
            }}
            privacyHref={`${cmsUrl}/PrivacyPolicyBR`}
            termsHref={`${cmsUrl}/TermsBR`}
            buildNumber={process.env.NEXT_PUBLIC_BUILD_NUMBER}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
