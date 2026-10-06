import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import BehindFeatureFlag from '../../Shared/UI/BehindFeatureFlag';
import publicHttpClient from '../../Shared/httpClient/publicHttpClient';
import { ApiAboutStats } from '../../Shared/httpClient/apiTypes';
import { formatOptionalStatNumber } from './formatStatNumber';
import LegacyAboutV2 from './LegacyAboutV2';
import { TrustedOrganization } from './trustedOrganizations';
import useTrustedOrganizations from './useTrustedOrganizations';
import './AboutV2.scss';
import arrowOutward from '../../assets/about/arrow-outward.svg';
import check from '../../assets/about/check.svg';
import heroCourt from '../../assets/about/hero-court.jpg';
import heroFans from '../../assets/about/hero-fans.webp';
import heroOperator from '../../assets/about/hero-operator.webp';
import missionAnalytics from '../../assets/about/mission-analytics.webp';
import missionOrganizer from '../../assets/about/mission-organizer.webp';
import audienceOrganizer from '../../assets/about/audience-organizer.jpg';
import audienceAthlete from '../../assets/about/audience-athlete.jpg';
import audienceFan from '../../assets/about/audience-fan.jpg';
import platformScoresheet from '../../assets/about/platform-scoresheet.webp';
import platformSchedule from '../../assets/about/platform-schedule.webp';
import platformBracket from '../../assets/about/platform-bracket.webp';
import platformLive from '../../assets/about/platform-live.webp';
import platformStats from '../../assets/about/platform-stats.webp';
import platformStandings from '../../assets/about/platform-standings.webp';
import lairPhoto from '../../assets/photos/lair.png';
import isaPhoto from '../../assets/photos/isa.png';
import ruanPhoto from '../../assets/photos/ruan.png';
import wagnerPhoto from '../../assets/photos/wagner.png';
import juliaPhoto from '../../assets/photos/julia.png';

const TEAM = [
  {
    name: 'Lair Júnior',
    photo: lairPhoto,
    roleKey: 'founder',
    bioKey: 'lairBio',
    cta: { labelKey: 'lairCta', href: 'https://www.lairjr.me' }
  },
  {
    name: 'Isadora Paixão',
    photo: isaPhoto,
    roleKey: 'productDesigner',
    bioKey: 'isaBio'
  },
  {
    name: 'Ruan Victor',
    photo: ruanPhoto,
    roleKey: 'softwareEngineer',
    bioKey: 'ruanBio'
  },
  {
    name: 'Wagner Assis',
    photo: wagnerPhoto,
    roleKey: 'mobileEngineer',
    bioKey: 'wagnerBio'
  },
  {
    name: 'Julia Ipê',
    photo: juliaPhoto,
    roleKey: 'socialMedia',
    bioKey: 'juliaBio'
  }
];

const ORGANIZERS_SECTION_ID = 'organizers';

const AUDIENCES: {
  key: string;
  photo: string;
  features: string[];
  targetId?: string;
}[] = [
  {
    key: 'organizers',
    photo: audienceOrganizer,
    features: [],
    targetId: ORGANIZERS_SECTION_ID
  },
  {
    key: 'athletes',
    photo: audienceAthlete,
    features: ['career', 'stats', 'photos', 'schedule']
  },
  {
    key: 'fans',
    photo: audienceFan,
    features: ['regional', 'liveStats', 'cheer', 'talent']
  }
];

const MISSION_VALUES = ['visibility', 'information', 'connection'];

const BOOK_DEMO_URL = 'https://wa.me/5551996863254';
const EXAMPLE_TOURNAMENT_URL =
  'https://go-champs.com/demo-organization/demo-tournament';

// Every paid package builds on the free one; its `includes` line says so.
const PACKAGES: { key: string; features: string[]; exampleUrl?: string }[] = [
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

function SectionHeading({
  eyebrow,
  title,
  description,
  inverted = false
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  inverted?: boolean;
}) {
  return (
    <div
      className={`about-v2-heading ${
        inverted ? 'about-v2-heading-inverted' : ''
      }`}
    >
      <span className="about-v2-eyebrow">{eyebrow}</span>
      <h2 className="about-v2-title">{title}</h2>
      {description && <p className="about-v2-lead">{description}</p>}
    </div>
  );
}

function ArrowButton({
  href,
  label,
  external = false
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className="about-v2-arrow-button"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
      <img src={arrowOutward} alt="" width={24} height={24} />
    </a>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="about-v2-check-list">
      {items.map(item => (
        <li key={item}>
          <span className="about-v2-check">
            <img src={check} alt="" width={14} height={14} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="about-v2-section about-v2-hero">
      <div className="about-v2-container about-v2-hero-grid">
        <div className="about-v2-hero-copy">
          <span className="about-v2-eyebrow">{t('aboutPage.heroEyebrow')}</span>
          <h1 className="about-v2-hero-title">{t('aboutPage.heroTitle')}</h1>
          <p className="about-v2-hero-description">
            {t('aboutPage.heroDescription')}
          </p>
          <ArrowButton href="/" label={t('aboutPage.findTournaments')} />
        </div>

        <div className="about-v2-hero-media">
          <div className="about-v2-photo about-v2-hero-main-photo">
            <img src={heroCourt} alt="" />
          </div>
          <div className="about-v2-hero-side-photos">
            <div className="about-v2-photo">
              <img src={heroFans} alt="" />
            </div>
            <div className="about-v2-photo">
              <img src={heroOperator} alt="" />
            </div>
          </div>
          <div className="about-v2-live-score" aria-hidden="true">
            <span className="about-v2-live-label">
              ● {t('aboutPage.heroLiveLabel')}
            </span>
            <div className="about-v2-live-team">
              <span>Leões do Itapuã</span>
              <strong>68</strong>
            </div>
            <div className="about-v2-live-divider" />
            <div className="about-v2-live-team about-v2-live-team-muted">
              <span>Tubarões da Barra</span>
              <strong>64</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BandSection({
  title,
  description,
  action
}: {
  title: React.ReactNode;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="about-v2-band">
      <div className="about-v2-container about-v2-band-grid">
        {/* With an action the description sits under the title and the
            action takes the second column; without one, the description does. */}
        <div className="about-v2-band-copy">
          <h2 className="about-v2-band-title">{title}</h2>
          {action && <p className="about-v2-band-description">{description}</p>}
        </div>
        {action || <p className="about-v2-band-description">{description}</p>}
      </div>
    </section>
  );
}

function MissionSection() {
  const { t } = useTranslation();

  return (
    <section className="about-v2-section about-v2-section-alt">
      <div className="about-v2-container about-v2-mission-grid">
        <div className="about-v2-mission-photos">
          <div className="about-v2-photo">
            <img src={missionAnalytics} alt="" />
          </div>
          <div className="about-v2-photo">
            <img src={missionOrganizer} alt="" />
          </div>
        </div>
        <div className="about-v2-mission-copy">
          <SectionHeading
            eyebrow={t('aboutPage.missionEyebrow')}
            title={
              <>
                {t('aboutPage.missionTitle')}{' '}
                <span className="about-v2-title-highlight">
                  {t('aboutPage.missionTitleHighlight')}
                </span>
              </>
            }
          />
          <p className="about-v2-body">{t('aboutPage.missionParagraph1')}</p>
          <p className="about-v2-body">{t('aboutPage.missionParagraph2')}</p>
          <div className="about-v2-mission-values">
            {MISSION_VALUES.map(value => (
              <div key={value} className="about-v2-mission-value">
                <h3>{t(`aboutPage.values.${value}.title`)}</h3>
                <p>{t(`aboutPage.values.${value}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const scrollToSection = (event: React.MouseEvent, id: string) => {
  const section = document.getElementById(id);
  if (!section) {
    return;
  }

  event.preventDefault();
  const reduceMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
};

function AudienceSection() {
  const { t } = useTranslation();

  return (
    <section className="about-v2-section">
      <div className="about-v2-container">
        <SectionHeading
          eyebrow={t('aboutPage.audienceEyebrow')}
          title={t('aboutPage.audienceTitle')}
        />
        <div className="about-v2-audience-grid">
          {AUDIENCES.map(audience => (
            <article
              key={audience.key}
              className={`about-v2-card ${
                audience.targetId ? 'about-v2-card-clickable' : ''
              }`}
            >
              {/* Covers the whole card, so a click anywhere on it scrolls. */}
              {audience.targetId && (
                <a
                  href={`#${audience.targetId}`}
                  className="about-v2-card-link"
                  aria-label={t(`aboutPage.audiences.${audience.key}.cta`)}
                  onClick={event =>
                    scrollToSection(event, audience.targetId as string)
                  }
                />
              )}
              <div className="about-v2-audience-photo">
                <img src={audience.photo} alt="" />
              </div>
              <div className="about-v2-audience-details">
                <span className="about-v2-audience-label">
                  {t(`aboutPage.audiences.${audience.key}.label`)}
                </span>
                <h3 className="about-v2-audience-title">
                  {t(`aboutPage.audiences.${audience.key}.title`)}
                </h3>
                <p className="about-v2-audience-description">
                  {t(`aboutPage.audiences.${audience.key}.description`)}
                </p>
                {audience.features.length > 0 && (
                  <CheckList
                    items={audience.features.map(feature =>
                      t(
                        `aboutPage.audiences.${audience.key}.features.${feature}`
                      )
                    )}
                  />
                )}
                {/* The card link above carries the click; this is its label. */}
                {audience.targetId && (
                  <span className="about-v2-text-link" aria-hidden="true">
                    {t(`aboutPage.audiences.${audience.key}.cta`)}
                    <svg viewBox="0 0 24 24" width={18} height={18}>
                      <path
                        d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrganizationLogo({
  organization,
  className = ''
}: {
  organization: TrustedOrganization;
  className?: string;
}) {
  return (
    <li className={`about-v2-logo ${className}`}>
      <a href={`/${organization.slug}`} title={organization.name}>
        <img src={organization.logoUrl} alt="" height={40} />
        <span>{organization.name}</span>
      </a>
    </li>
  );
}

function TrustSection({ stats }: { stats: ApiAboutStats | null }) {
  const { t } = useTranslation();
  const { fixed, rotating, page } = useTrustedOrganizations();

  const metrics = [
    {
      key: 'organizations',
      value: stats?.organizations_with_public_tournaments_count
    },
    { key: 'tournaments', value: stats?.public_tournaments_count },
    { key: 'teams', value: stats?.public_teams_count },
    { key: 'athletes', value: stats?.public_players_count },
    { key: 'games', value: stats?.public_games_count }
  ];

  return (
    <section className="about-v2-section about-v2-section-dark">
      <div className="about-v2-container">
        <SectionHeading
          eyebrow={t('aboutPage.trustEyebrow')}
          title={t('aboutPage.trustTitle')}
          inverted
        />
        <div className="about-v2-metrics">
          {metrics.map(metric => (
            <div key={metric.key} className="about-v2-metric">
              <span className="about-v2-metric-value">
                {formatOptionalStatNumber(metric.value)}
              </span>
              <span className="about-v2-metric-label">
                {t(`aboutPage.metrics.${metric.key}`)}
              </span>
            </div>
          ))}
        </div>
        <p className="about-v2-logos-title">{t('aboutPage.trustLogosTitle')}</p>
        <ul className="about-v2-logos">
          {fixed.map(organization => (
            <OrganizationLogo
              key={organization.slug}
              organization={organization}
            />
          ))}
          {/* Keyed by page so each rotation re-runs the fade-in. */}
          {rotating.map(organization => (
            <OrganizationLogo
              key={`${page}-${organization.slug}`}
              organization={organization}
              className="about-v2-logo-rotating"
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function PlatformSection() {
  const { t } = useTranslation();

  const cards = [
    { key: 'scoresheet', screenshot: platformScoresheet },
    { key: 'calendar', screenshot: platformSchedule },
    { key: 'brackets', screenshot: platformBracket },
    { key: 'liveResults', screenshot: platformLive },
    { key: 'stats', screenshot: platformStats },
    { key: 'standings', screenshot: platformStandings }
  ];

  return (
    <section className="about-v2-section">
      <div className="about-v2-container">
        <SectionHeading
          eyebrow={t('aboutPage.platformEyebrow')}
          title={t('aboutPage.platformTitle')}
          description={t('aboutPage.platformDescription')}
        />
        <div className="about-v2-platform-grid">
          {cards.map(card => (
            <article
              key={card.key}
              className="about-v2-card about-v2-platform-card"
            >
              <div className="about-v2-preview" aria-hidden="true">
                <img src={card.screenshot} alt="" />
              </div>
              <h3 className="about-v2-card-title">
                {t(`aboutPage.platform.${card.key}.title`)}
              </h3>
              <p className="about-v2-card-description">
                {t(`aboutPage.platform.${card.key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const { t } = useTranslation();

  return (
    <section className="about-v2-section">
      <div className="about-v2-container">
        <SectionHeading
          eyebrow={t('aboutPage.teamEyebrow')}
          title={t('aboutPage.teamTitle')}
          description={t('aboutPage.teamDescription')}
        />
        <div className="about-v2-team">
          {TEAM.map(member => (
            <article
              key={member.name}
              className="about-v2-card about-v2-member"
            >
              <div className="about-v2-member-photo">
                <img src={member.photo} alt={member.name} />
              </div>
              <div className="about-v2-member-details">
                <h3 className="about-v2-member-name">{member.name}</h3>
                <span className="about-v2-member-role">
                  {t(member.roleKey)}
                </span>
                <p className="about-v2-member-bio">{t(member.bioKey)}</p>
                {member.cta && (
                  <a
                    href={member.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-v2-member-link"
                  >
                    {t(member.cta.labelKey)} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrganizersSection() {
  const { t } = useTranslation();

  return (
    <section
      id={ORGANIZERS_SECTION_ID}
      className="about-v2-section about-v2-section-alt about-v2-organizers"
    >
      <div className="about-v2-container">
        <div className="about-v2-organizers-header">
          <SectionHeading
            eyebrow={t('aboutPage.organizersEyebrow')}
            title={t('aboutPage.organizersTitle')}
          />
          <div className="about-v2-organizers-intro">
            <p className="about-v2-body">
              {t('aboutPage.organizersDescription')}
            </p>
            <ArrowButton
              href={BOOK_DEMO_URL}
              label={t('aboutPage.bookDemo')}
              external
            />
          </div>
        </div>
        <div className="about-v2-packages">
          {PACKAGES.map(item => (
            <article key={item.key} className="about-v2-card about-v2-package">
              <h3 className="about-v2-package-name">
                {t(`aboutPage.packages.${item.key}.name`)}
              </h3>
              <p className="about-v2-package-includes">
                {t(`aboutPage.packages.${item.key}.includes`)}
              </p>
              <CheckList
                items={item.features.map(feature =>
                  t(`aboutPage.packages.features.${feature}`)
                )}
              />
              {item.exampleUrl && (
                <a
                  href={item.exampleUrl}
                  className="about-v2-text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('aboutPage.packages.seeExample')}
                  <svg viewBox="0 0 24 24" width={18} height={18} aria-hidden>
                    <path
                      d="M6.5 5.5V7.5H15.09L5.5 17.09L6.91 18.5L16.5 8.91V17.5H18.5V5.5H6.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowGoChampsV2() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<ApiAboutStats | null>(null);

  useEffect(() => {
    // The page is worth showing without the counters, so a failed request
    // leaves them as placeholders instead of failing the page.
    publicHttpClient
      .getAboutStats()
      .then(response => setStats(response.data))
      .catch(error => console.error('Failed to fetch about stats:', error));
  }, []);

  useEffect(() => {
    // Links from other pages (like the footer's "Para organizadores") land
    // here before the sections render, so the browser can't scroll to the
    // fragment on its own.
    const id = window.location.hash.slice(1);
    const section = id && document.getElementById(id);
    if (section) {
      section.scrollIntoView();
    }
  }, []);

  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main about-v2-main">
          <HeroSection />
          <BandSection
            title={
              <>
                {t('aboutPage.manifestoLine1')}
                <br />
                {t('aboutPage.manifestoLine2')}
              </>
            }
            description={t('aboutPage.manifestoDescription')}
          />
          <MissionSection />
          <AudienceSection />
          <TrustSection stats={stats} />
          <PlatformSection />
          <BandSection
            title={t('aboutPage.ctaTitle')}
            description={t('aboutPage.ctaDescription')}
            action={
              <ArrowButton href="/" label={t('aboutPage.exploreTournaments')} />
            }
          />
          <TeamSection />
          <OrganizersSection />
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

function AboutV2() {
  return (
    <BehindFeatureFlag fallback={<LegacyAboutV2 />}>
      <KnowGoChampsV2 />
    </BehindFeatureFlag>
  );
}

export default AboutV2;
