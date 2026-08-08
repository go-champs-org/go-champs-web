import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { NavBar, Footer } from '@gochamps/ui';
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
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
        <Amplitude apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''} />
        <NextIntlClientProvider>
          <NavBar
            links={[
              { href: `/${locale}/sobre`, label: 'Sobre' },
              { href: `/${locale}/faq`, label: 'FAQ' },
              { href: `/${locale}/contato`, label: 'Contato' }
            ]}
            logoHref={`/${locale}`}
          />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
