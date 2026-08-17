import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getAboutStats } from '@gochamps/api-client';
import { formatStatNumber } from './formatStatNumber';

const CARD_CLASS =
  'w-full rounded-xl border border-border px-4 py-6 shadow-[0_4px_20px_var(--shadow-elevated)] sm:rounded-2xl sm:px-6 sm:py-8 md:p-10 lg:p-12';

const TEAM = [
  {
    name: 'Lair Júnior',
    photo: '/photos/lair.png',
    roleKey: 'founder',
    bioKey: 'lairBio',
    ctaKey: 'lairCta',
    ctaHref: 'https://www.lairjr.me'
  },
  {
    name: 'Isadora Paixão',
    photo: '/photos/isa.png',
    roleKey: 'productDesigner',
    bioKey: 'isaBio'
  },
  {
    name: 'Ruan Victor',
    photo: '/photos/ruan.png',
    roleKey: 'softwareEngineer',
    bioKey: 'ruanBio'
  },
  {
    name: 'Wagner Assis',
    photo: '/photos/wagner.png',
    roleKey: 'mobileEngineer',
    bioKey: 'wagnerBio'
  },
  {
    name: 'Julia Ipê',
    photo: '/photos/julia.png',
    roleKey: 'socialMedia',
    bioKey: 'juliaBio'
  }
] as const;

// The CMS version fetches stats client-side and shows a shimmer, then "---" on
// failure. Here the fetch happens on the server, so there is no loading state —
// only the same "---" fallback when the API is unreachable, which must not take
// the whole institutional page down with it.
const PLACEHOLDER = '---';

// Without this the page is prerendered once at build time and the counters stay
// frozen until the next deploy. Stats move slowly, so hourly revalidation keeps
// them fresh without paying for a request to the API on every page view.
export const revalidate = 3600;

const StatCounter = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-[2rem] font-bold leading-[1.1] text-primary md:text-[2.75rem]">
      {value}
    </span>
    <span className="text-[0.875rem] font-medium uppercase tracking-[0.05em] text-muted md:text-base">
      {label}
    </span>
  </div>
);

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');

  let stats: Awaited<ReturnType<typeof getAboutStats>> | null = null;
  try {
    stats = await getAboutStats();
  } catch (error) {
    console.error('Failed to fetch about stats:', error);
  }

  return (
    <main className="bg-background py-12 px-6">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Image
          src="/illustrations/hands-on-trophy.svg"
          alt=""
          aria-hidden="true"
          width={440}
          height={440}
          priority
          className="mx-auto hidden h-auto w-full max-w-[440px] lg:block"
        />

        <div className={`${CARD_CLASS} mx-auto max-w-[560px]`}>
          <h1 className="mb-4 text-center text-[1.375rem] font-bold leading-tight text-foreground sm:text-[1.5rem] md:text-left md:text-[1.75rem] lg:text-[2rem]">
            {t('aboutUs')}
          </h1>

          <div className="flex flex-col gap-4 text-[0.9375rem] leading-[1.7] text-muted sm:text-base md:text-[1.0625rem]">
            <p>{t('aboutUsParagraph1')}</p>
            <p>{t('aboutUsParagraph2')}</p>
            <p>{t('aboutUsParagraph3')}</p>

            <div className="text-left">
              <p className="mb-2">{t('aboutUsListTitle')}</p>
              <ul className="list-disc pl-6">
                <li>{t('aboutUsListItem1')}</li>
                <li>{t('aboutUsListItem2')}</li>
                <li>{t('aboutUsListItem3')}</li>
              </ul>
            </div>

            <p>{t('aboutUsParagraph4')}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[560px] md:mt-12 md:max-w-[1200px]">
        <div className={CARD_CLASS}>
          <h2 className="mb-6 text-center text-[1.375rem] font-bold leading-tight text-foreground sm:text-[1.5rem] md:text-left md:text-[1.75rem] lg:text-[2rem]">
            {t('ourImpact')}
          </h2>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-around sm:gap-4">
            <StatCounter
              value={stats ? formatStatNumber(stats.gamesCount) : PLACEHOLDER}
              label={t('games')}
            />
            <StatCounter
              value={
                stats ? formatStatNumber(stats.tournamentsCount) : PLACEHOLDER
              }
              label={t('tournaments')}
            />
            <StatCounter
              value={
                stats ? formatStatNumber(stats.organizationsCount) : PLACEHOLDER
              }
              label={t('organizations')}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-[560px] md:mt-12 md:max-w-[1200px]">
        <div className={CARD_CLASS}>
          <h2 className="mb-6 text-center text-[1.375rem] font-bold leading-tight text-foreground sm:text-[1.5rem] md:text-left md:text-[1.75rem] lg:text-[2rem]">
            {t('theTeam')}
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
            {TEAM.map(member => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 h-[150px] w-[150px] overflow-hidden rounded-full bg-border">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 text-[1.125rem] font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="mb-3 text-[0.875rem] font-semibold uppercase leading-[1.4] tracking-[0.05em] text-primary">
                  {t(member.roleKey)}
                </p>
                <p className="text-[0.9375rem] leading-[1.6] text-muted">
                  {t(member.bioKey)}
                </p>
                {'ctaKey' in member && (
                  <p className="mt-2 text-[0.9375rem] leading-[1.6] text-muted">
                    <a
                      href={member.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-primary"
                    >
                      {t(member.ctaKey)}
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
