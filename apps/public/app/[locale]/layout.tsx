import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Footer, noFlashThemeScript } from '@gochamps/ui';
import { LocaleSwitcher } from '../../src/components/LocaleSwitcher';
import { SiteNavBar } from '../../src/components/SiteNavBar';
import { pickClientMessages } from '../../src/i18n/clientMessages';
import { routing } from '../../src/i18n/routing';
import { publicPath } from '../../src/i18n/publicPath';
import { cmsPath } from '../../src/config/cms';
import { SITE_NAME, SITE_URL } from '../../src/seo/metadata';
import { GoogleAnalytics } from '../analytics/GoogleAnalytics';
import { Amplitude } from '../analytics/Amplitude';
import '../globals.css';

export const metadata = {
  // Resolves every relative URL the pages put in their metadata (canonical,
  // Open Graph images) against the live domain.
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
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
  const messages = pickClientMessages(await getMessages());

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <Amplitude apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''} />
        <NextIntlClientProvider messages={messages}>
          <SiteNavBar
            links={[
              { href: publicPath('/about'), label: t('navAbout') },
              { href: publicPath('/faq'), label: t('navFaq') },
              { href: publicPath('/contact'), label: t('navContact') }
            ]}
            logoHref={publicPath('')}
            logoSrc="/logo/logo-white-name.png"
            logoSrcMobile="/logo/logo-green.png"
            loginLabel={t('navLogin')}
            localeSwitcher={<LocaleSwitcher />}
          />
          {children}
          <Footer
            t={{
              tagline: tFooter('tagline'),
              platform: tFooter('platform'),
              forOrganizers: tFooter('forOrganizers'),
              tournaments: tFooter('tournaments'),
              apiDocumentation: tFooter('apiDocumentation'),
              knowGoChamps: tFooter('knowGoChamps'),
              faq: tFooter('faq'),
              contactUs: tFooter('contactUs'),
              privacyPolicyBR: tFooter('privacyPolicyBR'),
              termsBR: tFooter('termsBR'),
              with: tFooter('with'),
              byGoChampsTeam: tFooter('byGoChampsTeam'),
              theSourceCodeIsLicensed: tFooter('theSourceCodeIsLicensed'),
              copyright: tFooter('copyright'),
              andContributors: tFooter('andContributors'),
              allRightsReserved: tFooter('allRightsReserved'),
              navigation: tFooter('navigation')
            }}
            links={{
              home: publicPath(''),
              about: publicPath('/about'),
              organizers: `${publicPath('/about')}#organizers`,
              faq: publicPath('/faq'),
              contact: publicPath('/contact'),
              privacy: cmsPath('/PrivacyPolicyBR'),
              terms: cmsPath('/TermsBR')
            }}
            logoSrc="/logo/logo-white-name.png"
            buildNumber={process.env.NEXT_PUBLIC_BUILD_NUMBER}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
