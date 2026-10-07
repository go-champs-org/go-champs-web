import type { ReactNode } from 'react';
import Image from 'next/image';
import type { AboutStats } from '@gochamps/api-client';
import { publicPath } from '../../../src/i18n/publicPath';
import { formatOptionalStatNumber } from './formatStatNumber';
import {
  ArrowButton,
  CARD_CLASS,
  CheckList,
  Container,
  Eyebrow,
  Photo,
  Section,
  SectionHeading,
  type Translate
} from './primitives';

export const ORGANIZERS_SECTION_ID = 'organizers';

// "Encontrar campeonatos" and "Explorar campeonatos" both land on the home
// page, where the tournament search lives.
const TOURNAMENTS_HREF = publicPath('');

const EXAMPLE_TOURNAMENT_URL =
  'https://go-champs.com/demo-organization/demo-tournament';

const TEAM = [
  {
    name: 'Lair Júnior',
    photo: '/photos/lair.png',
    roleKey: 'founder',
    bioKey: 'lairBio',
    cta: { labelKey: 'lairCta', href: 'https://www.lairjr.me' }
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

const AUDIENCES = [
  {
    key: 'organizers',
    photo: '/about/audience-organizer.jpg',
    features: [] as string[]
  },
  {
    key: 'athletes',
    photo: '/about/audience-athlete.jpg',
    features: ['career', 'stats', 'photos', 'schedule']
  },
  {
    key: 'fans',
    photo: '/about/audience-fan.jpg',
    features: ['regional', 'liveStats', 'cheer', 'talent']
  }
];

const MISSION_VALUES = ['visibility', 'information', 'connection'];

// Their logos ship with the app, so the strip never depends on what the API
// serves for them.
const TRUSTED_ORGANIZATIONS = [
  { name: 'CBB', slug: 'cbb', logo: '/about/logos/cbb.png' },
  { name: 'FGB', slug: 'ffgb', logo: '/about/logos/fgb.png' },
  { name: 'FBERJ', slug: 'fberj', logo: '/about/logos/fberj.png' }
];

const PLATFORM_CARDS = [
  { key: 'scoresheet', screenshot: '/about/platform-scoresheet.webp' },
  { key: 'calendar', screenshot: '/about/platform-schedule.webp' },
  { key: 'brackets', screenshot: '/about/platform-bracket.webp' },
  { key: 'liveResults', screenshot: '/about/platform-live.webp' },
  { key: 'stats', screenshot: '/about/platform-stats.webp' },
  { key: 'standings', screenshot: '/about/platform-standings.webp' }
];

// Every paid package builds on the free one; its `includes` line says so.
const PACKAGES = [
  {
    key: 'free',
    features: ['tournamentCreation', 'website', 'results', 'api'],
    exampleUrl: EXAMPLE_TOURNAMENT_URL
  },
  {
    key: 'scoresheet',
    features: [
      'onSite',
      'live',
      'playByPlay',
      'scoresheetReport',
      'obsScoreboard',
      'officialsPin'
    ]
  },
  {
    key: 'stats',
    features: [
      'onSite',
      'live',
      'playByPlay',
      'boxScoreReport',
      'tournamentStats',
      'leaderboard',
      'obsScoreboard'
    ]
  },
  {
    key: 'complete',
    features: [
      'onSite',
      'live',
      'playByPlay',
      'scoresheetReport',
      'boxScoreReport',
      'tournamentStats',
      'leaderboard',
      'obsScoreboard',
      'officialsPin'
    ]
  }
];

const TEXT_LINK_CLASS =
  'mt-auto inline-flex items-center self-start gap-1.5 pt-2 text-[0.9375rem] font-bold text-accent-text underline underline-offset-[3px] hover:opacity-85';

export function HeroSection({ t }: { t: Translate }) {
  return (
    <Section className="pb-16! pt-12! md:pb-20! md:pt-[4.5rem]!">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
        <div className="flex flex-col items-start gap-6 lg:flex-1">
          <Eyebrow>{t('heroEyebrow')}</Eyebrow>
          <h1 className="text-[2.5rem] font-extrabold leading-[1.04] tracking-[-0.02em] md:text-[4rem]">
            {t('heroTitle')}
          </h1>
          <p className="text-[1.1875rem] leading-normal text-muted">
            {t('heroDescription')}
          </p>
          <ArrowButton href={TOURNAMENTS_HREF} label={t('findTournaments')} />
        </div>

        <div className="relative flex h-[360px] w-full gap-3 md:h-[512px] lg:flex-1">
          <Photo
            src="/about/hero-court.jpg"
            sizes="(min-width: 1025px) 300px, 50vw"
            priority
            className="flex-1"
          />
          <div className="flex flex-1 flex-col gap-3">
            <Photo
              src="/about/hero-fans.webp"
              sizes="(min-width: 1025px) 300px, 50vw"
              priority
              className="flex-1"
            />
            <Photo
              src="/about/hero-operator.webp"
              sizes="(min-width: 1025px) 300px, 50vw"
              priority
              className="flex-1"
            />
          </div>
          <LiveScoreCard label={t('heroLiveLabel')} />
        </div>
      </div>
    </Section>
  );
}

// Decorative: the match is made up, so it stays hidden from assistive tech.
function LiveScoreCard({ label }: { label: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-[18px] left-[18px] flex w-[240px] flex-col gap-2.5 rounded-2xl bg-surface p-[18px] text-foreground shadow-[0_12px_32px_var(--shadow-strong)] md:w-[280px]"
    >
      <span className="text-xs font-extrabold uppercase tracking-[0.08em] text-red-600">
        ● {label}
      </span>
      <div className="flex items-baseline justify-between text-[0.9375rem] font-bold">
        <span>Leões do Itapuã</span>
        <strong className="text-2xl font-extrabold">68</strong>
      </div>
      <div className="h-px bg-border" />
      <div className="flex items-baseline justify-between text-[0.9375rem] font-bold text-muted">
        <span>Tubarões da Barra</span>
        <strong className="text-2xl font-extrabold">64</strong>
      </div>
    </div>
  );
}

// Full-bleed green band. In light it is the design's brand green at 60% over
// the page; in dark it is lifted so the dark text keeps its contrast.
export function BandSection({
  title,
  description,
  action
}: {
  title: ReactNode;
  description: string;
  action?: ReactNode;
}) {
  const descriptionClass =
    'flex-1 text-[1.0625rem] font-semibold leading-normal';

  return (
    <section className="bg-band py-12 text-neutral-900 md:py-14">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:gap-16">
        {/* With an action the description sits under the title and the action
            takes the second column; without one, the description does. */}
        <div className="flex flex-1 flex-col gap-2.5">
          <h2 className="text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[2.5rem]">
            {title}
          </h2>
          {action && <p className={descriptionClass}>{description}</p>}
        </div>
        {action ?? <p className={descriptionClass}>{description}</p>}
      </Container>
    </section>
  );
}

export function ManifestoBand({ t }: { t: Translate }) {
  return (
    <BandSection
      title={
        <>
          {t('manifestoLine1')}
          <br />
          {t('manifestoLine2')}
        </>
      }
      description={t('manifestoDescription')}
    />
  );
}

export function ClosingBand({ t }: { t: Translate }) {
  return (
    <BandSection
      title={t('ctaTitle')}
      description={t('ctaDescription')}
      action={
        <ArrowButton href={TOURNAMENTS_HREF} label={t('exploreTournaments')} />
      }
    />
  );
}

export function MissionSection({ t }: { t: Translate }) {
  return (
    <Section tone="alt">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex h-[480px] w-full flex-col gap-3 md:h-[620px] lg:flex-1">
          <Photo
            src="/about/mission-analytics.webp"
            sizes="(min-width: 1025px) 560px, 100vw"
            className="flex-1"
          />
          <Photo
            src="/about/mission-organizer.webp"
            sizes="(min-width: 1025px) 560px, 100vw"
            className="flex-1"
          />
        </div>
        <div className="flex flex-col gap-6 lg:flex-1">
          <div className="flex max-w-[800px] flex-col gap-4">
            <Eyebrow>{t('missionEyebrow')}</Eyebrow>
            <h2 className="text-[2rem] font-extrabold leading-[1.08] tracking-[-0.02em] md:text-[2.875rem]">
              {t('missionTitle')}{' '}
              <span className="text-primary-dark">{t('missionTitleHighlight')}</span>
            </h2>
          </div>
          <p className="text-[1.0625rem] leading-normal text-muted">
            {t('missionParagraph1')}
          </p>
          <p className="text-[1.0625rem] leading-normal text-muted">
            {t('missionParagraph2')}
          </p>
          <div className="grid grid-cols-1 gap-5 border-t border-border pt-6 min-[481px]:grid-cols-3">
            {MISSION_VALUES.map(value => (
              <div key={value}>
                <h3 className="mb-2 text-xl font-extrabold">
                  {t(`values.${value}.title`)}
                </h3>
                <p className="text-sm leading-[1.45] text-muted">
                  {t(`values.${value}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function AudienceCard({
  audience,
  t
}: {
  audience: (typeof AUDIENCES)[number];
  t: Translate;
}) {
  const base = `audiences.${audience.key}`;

  return (
    <article className={CARD_CLASS}>
      <Photo
        src={audience.photo}
        sizes="(min-width: 769px) 33vw, 100vw"
        className="h-[340px] rounded-none!"
      />
      <div className="relative flex flex-col gap-[0.9375rem] px-7 pb-7 pt-8 before:absolute before:left-7 before:right-7 before:top-0 before:h-1 before:bg-primary before:content-['']">
        <span className="text-sm font-bold uppercase text-accent-text">
          {t(`${base}.label`)}
        </span>
        <h3 className="text-[1.875rem] font-normal">{t(`${base}.title`)}</h3>
        <p className="text-[0.9375rem] leading-[1.55] text-muted">
          {t(`${base}.description`)}
        </p>
        {audience.features.length > 0 && (
          <CheckList
            items={audience.features.map(feature =>
              t(`${base}.features.${feature}`)
            )}
          />
        )}
      </div>
    </article>
  );
}

export function AudienceSection({ t }: { t: Translate }) {
  return (
    <Section>
      <SectionHeading
        eyebrow={t('audienceEyebrow')}
        title={t('audienceTitle')}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {AUDIENCES.map(audience => (
          <AudienceCard key={audience.key} audience={audience} t={t} />
        ))}
      </div>
    </Section>
  );
}

function OrganizationTile({
  organization
}: {
  organization: (typeof TRUSTED_ORGANIZATIONS)[number];
}) {
  return (
    <li className="min-w-0 md:col-span-2">
      <a
        href={publicPath(`/${organization.slug}`)}
        title={organization.name}
        className="flex h-[88px] flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/20 px-2 text-[0.5625rem] font-extrabold uppercase tracking-[0.03em] text-white transition-colors hover:border-primary"
      >
        <span className="relative block h-10 w-full shrink-0">
          <Image
            src={organization.logo}
            alt=""
            fill
            sizes="200px"
            className="object-contain"
          />
        </span>
        <span className="opacity-80">{organization.name}</span>
      </a>
    </li>
  );
}

export function TrustSection({
  t,
  stats
}: {
  t: Translate;
  stats: AboutStats | null;
}) {
  const metrics = [
    { key: 'organizations', value: stats?.organizationsCount },
    { key: 'tournaments', value: stats?.tournamentsCount },
    { key: 'teams', value: stats?.teamsCount },
    { key: 'athletes', value: stats?.playersCount },
    { key: 'games', value: stats?.gamesCount }
  ];

  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow={t('trustEyebrow')}
        title={t('trustTitle')}
        inverted
      />
      <div className="mb-9 grid grid-cols-2 gap-4 md:grid-cols-5 md:text-center">
        {metrics.map(metric => (
          <div key={metric.key} className="flex flex-col gap-[0.3125rem] py-5">
            <span className="text-[2.75rem] font-extrabold leading-none text-primary">
              {formatOptionalStatNumber(metric.value)}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.1em] opacity-80">
              {t(`metrics.${metric.key}`)}
            </span>
          </div>
        ))}
      </div>
      <p className="mb-9 text-[0.9375rem] font-bold opacity-80">
        {t('trustLogosTitle')}
      </p>
      <ul className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {TRUSTED_ORGANIZATIONS.map(organization => (
          <OrganizationTile key={organization.slug} organization={organization} />
        ))}
      </ul>
    </Section>
  );
}

export function PlatformSection({ t }: { t: Translate }) {
  return (
    <Section>
      <SectionHeading
        eyebrow={t('platformEyebrow')}
        title={t('platformTitle')}
        description={t('platformDescription')}
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_CARDS.map(card => (
          <article key={card.key} className={`${CARD_CLASS} gap-2 p-5`}>
            {/* Decorative product screenshot; the box follows its shape. */}
            <div
              aria-hidden="true"
              className="relative aspect-[49/20] overflow-hidden rounded-xl border border-border bg-white"
            >
              <Image
                src={card.screenshot}
                alt=""
                fill
                sizes="(min-width: 1025px) 380px, (min-width: 769px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-2.5 text-xl font-extrabold">
              {t(`platform.${card.key}.title`)}
            </h3>
            <p className="text-[0.9375rem] leading-normal text-muted">
              {t(`platform.${card.key}.description`)}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function MemberCard({
  member,
  t
}: {
  member: (typeof TEAM)[number];
  t: Translate;
}) {
  return (
    <article
      className={`${CARD_CLASS} lg:min-w-0 lg:flex-1 w-[260px] shrink-0 snap-start items-center pt-4 lg:w-auto`}
    >
      <div className="relative aspect-[193/208] w-full max-w-[193px] overflow-hidden rounded-[100px] bg-border">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="193px"
          className="object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-2.5 p-5">
        <h3 className="text-xl font-extrabold">{member.name}</h3>
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-accent-text">
          {t(member.roleKey)}
        </span>
        <p className="text-sm leading-normal text-muted">{t(member.bioKey)}</p>
        {'cta' in member && (
          <a
            href={member.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-accent-text hover:opacity-80"
          >
            {t(member.cta.labelKey)} →
          </a>
        )}
      </div>
    </article>
  );
}

export function TeamSection({ t }: { t: Translate }) {
  return (
    <Section>
      <SectionHeading
        eyebrow={t('teamEyebrow')}
        title={t('teamTitle')}
        description={t('teamDescription')}
      />
      {/* A horizontal carousel on mobile, a row of five on desktop. */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scroll-padding:0_1.25rem] lg:mx-0 lg:overflow-visible lg:px-0">
        {TEAM.map(member => (
          <MemberCard key={member.name} member={member} t={t} />
        ))}
      </div>
    </Section>
  );
}

function PackageCard({
  item,
  t
}: {
  item: (typeof PACKAGES)[number];
  t: Translate;
}) {
  return (
    <article className={`${CARD_CLASS} gap-4 p-6 md:p-7`}>
      <h3 className="text-[1.375rem] font-extrabold">
        {t(`packages.${item.key}.name`)}
      </h3>
      <p className="border-b border-border pb-4 text-sm leading-[1.45] text-muted">
        {t(`packages.${item.key}.includes`)}
      </p>
      <CheckList
        items={item.features.map(feature => t(`packages.features.${feature}`))}
      />
      {'exampleUrl' in item && (
        <a
          href={item.exampleUrl}
          className={TEXT_LINK_CLASS}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('packages.seeExample')}
          <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden="true">
            <path
              d="M6.5 5.5V7.5H15.09L5.5 17.09L6.91 18.5L16.5 8.91V17.5H18.5V5.5H6.5Z"
              fill="currentColor"
            />
          </svg>
        </a>
      )}
    </article>
  );
}

// The footer's "Para organizadores" link lands here. The offset keeps the
// sticky header from covering the heading.
export function OrganizersSection({ t }: { t: Translate }) {
  return (
    <Section
      tone="alt"
      id={ORGANIZERS_SECTION_ID}
      className="scroll-mt-[var(--navbar-height)]"
    >
      <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:gap-16">
        <div className="lg:flex-1 [&>div]:mb-6 lg:[&>div]:mb-0">
          <SectionHeading
            eyebrow={t('organizersEyebrow')}
            title={t('organizersTitle')}
          />
        </div>
        <p className="text-[1.0625rem] leading-normal text-muted lg:flex-1">
          {t('organizersDescription')}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {PACKAGES.map(item => (
          <PackageCard key={item.key} item={item} t={t} />
        ))}
      </div>
    </Section>
  );
}
