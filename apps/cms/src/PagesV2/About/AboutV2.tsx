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
import heroScoretable from '../../assets/about/hero-scoretable.jpg';
import heroCrowd from '../../assets/about/hero-crowd.jpg';
import missionScoretable from '../../assets/about/mission-scoretable.jpg';
import audienceOrganizer from '../../assets/about/audience-organizer.jpg';
import audienceAthlete from '../../assets/about/audience-athlete.jpg';
import audienceFan from '../../assets/about/audience-fan.jpg';
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

const AUDIENCES = [
  { key: 'organizers', photo: audienceOrganizer },
  { key: 'athletes', photo: audienceAthlete },
  { key: 'fans', photo: audienceFan }
];

const MISSION_VALUES = ['visibility', 'information', 'connection'];

const PLANS_ITEMS = ['portal', 'scoresheet', 'stats'];

const STATS_BARS = [
  { label: 'PTS', value: 78 },
  { label: 'REB', value: 52 },
  { label: 'AST', value: 36 },
  { label: '3PT', value: 24 }
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

function ArrowButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="about-v2-arrow-button">
      {label}
      <img src={arrowOutward} alt="" width={24} height={24} />
    </a>
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
              <img src={heroScoretable} alt="" />
            </div>
            <div className="about-v2-photo">
              <img src={heroCrowd} alt="" />
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
        <div className="about-v2-photo about-v2-mission-photo">
          <img src={missionScoretable} alt="" />
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
            <article key={audience.key} className="about-v2-card">
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
    {
      key: 'scoresheet',
      preview: (
        <div className="about-v2-preview">
          <div className="about-v2-preview-row">
            <strong>{t('aboutPage.platform.scoresheet.previewTitle')}</strong>
            <span className="about-v2-preview-live">
              ● {t('aboutPage.platform.scoresheet.previewStatus')}
            </span>
          </div>
          <span className="about-v2-preview-chip">
            #7 Caio Santos | +2 · 14 pts
          </span>
          <span className="about-v2-preview-chip">
            #11 Rafa Lima | +3 · 9 pts
          </span>
          <span className="about-v2-preview-chip">
            #4 Davi Rocha | {t('aboutPage.platform.scoresheet.previewFoul')} · 2
          </span>
        </div>
      )
    },
    {
      key: 'calendar',
      preview: (
        <div className="about-v2-preview">
          <strong>{t('aboutPage.platform.calendar.previewTitle')}</strong>
          <span className="about-v2-preview-game">
            09:00 Leões do Itapuã × Tubarões da Barra · Quadra 1
          </span>
          <span className="about-v2-preview-game">
            10:30 Pituba Ballers × Rio Vermelho BC · Quadra 2
          </span>
          <span className="about-v2-preview-game">
            14:00 Stella Maris × Brotas Hoops · Quadra 1
          </span>
        </div>
      )
    },
    {
      key: 'brackets',
      preview: (
        <div className="about-v2-preview about-v2-preview-bracket">
          <div className="about-v2-preview-bracket-column">
            <span className="about-v2-preview-match">
              <strong>Leões 72</strong>
              Tubarões 60
            </span>
            <span className="about-v2-preview-match">
              <strong>Pituba 81</strong>
              Brotas 77
            </span>
          </div>
          <span className="about-v2-preview-match">
            <strong>Leões</strong>
            <strong>Pituba</strong>
          </span>
          <span className="about-v2-preview-final">
            {t('aboutPage.platform.brackets.previewFinal')}
          </span>
        </div>
      )
    },
    {
      key: 'liveResults',
      preview: (
        <div className="about-v2-preview about-v2-preview-dark">
          <span className="about-v2-preview-live">
            ● {t('aboutPage.platform.liveResults.previewStatus')}
          </span>
          <div className="about-v2-preview-row">
            <strong>Leões do Itapuã</strong>
            <span className="about-v2-preview-score">68</span>
          </div>
          <div className="about-v2-preview-row about-v2-preview-muted">
            <span>Tubarões da Barra</span>
            <span className="about-v2-preview-score">64</span>
          </div>
        </div>
      )
    },
    {
      key: 'stats',
      preview: (
        <div className="about-v2-preview">
          <strong>{t('aboutPage.platform.stats.previewTitle')}</strong>
          {STATS_BARS.map(bar => (
            <div key={bar.label} className="about-v2-preview-bar">
              <span className="about-v2-preview-bar-label">{bar.label}</span>
              <span className="about-v2-preview-bar-track">
                <span
                  className="about-v2-preview-bar-value"
                  style={{ width: `${bar.value}%` }}
                />
              </span>
              <span>{bar.value}%</span>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'showcase',
      preview: (
        <div className="about-v2-preview about-v2-preview-showcase">
          <div className="about-v2-preview-cover" />
          <span className="about-v2-preview-avatar">CI</span>
          <div className="about-v2-preview-identity">
            <strong>Copa Itapuã de Basquete</strong>
            <span>{t('aboutPage.platform.showcase.previewSubtitle')}</span>
          </div>
        </div>
      )
    }
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
              <div aria-hidden="true">{card.preview}</div>
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
    <section className="about-v2-section about-v2-section-alt">
      <div className="about-v2-container about-v2-organizers-grid">
        <SectionHeading
          eyebrow={t('aboutPage.organizersEyebrow')}
          title={t('aboutPage.organizersTitle')}
        />
        <div className="about-v2-card about-v2-plans">
          <h3 className="about-v2-plans-title">{t('aboutPage.plans.title')}</h3>
          <p className="about-v2-body">{t('aboutPage.plans.description')}</p>
          <ul className="about-v2-plans-list">
            {PLANS_ITEMS.map(item => (
              <li key={item}>
                <span className="about-v2-plans-check">
                  <img src={check} alt="" width={14} height={14} />
                </span>
                {t(`aboutPage.plans.items.${item}`)}
              </li>
            ))}
          </ul>
          <div className="about-v2-plans-price">
            <span>{t('aboutPage.plans.priceFrom')}</span>
            <strong>{t('aboutPage.plans.price')}</strong>
          </div>
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
          <TeamSection />
          <OrganizersSection />
          <BandSection
            title={t('aboutPage.ctaTitle')}
            description={t('aboutPage.ctaDescription')}
            action={
              <ArrowButton href="/" label={t('aboutPage.exploreTournaments')} />
            }
          />
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
