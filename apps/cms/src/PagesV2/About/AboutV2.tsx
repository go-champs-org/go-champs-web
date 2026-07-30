import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import handsOnTrophy from '../../assets/illustrations/hands-on-trophy.svg';
import './AboutV2.scss';
import lairPhoto from '../../assets/photos/lair.png';
import wagnerPhoto from '../../assets/photos/wagner.png';
import juliaPhoto from '../../assets/photos/julia.png';
import isaPhoto from '../../assets/photos/isa.png';
import ruanPhoto from '../../assets/photos/ruan.png';
import publicHttpClient from '../../Shared/httpClient/publicHttpClient';
import { ApiAboutStats } from '../../Shared/httpClient/apiTypes';
import { formatStatNumber } from './formatStatNumber';

const CounterShimmer: React.FC = () => (
  <div className="about-v2-counter">
    <div className="about-v2-counter-value-shimmer"></div>
    <div className="about-v2-counter-label-shimmer"></div>
  </div>
);

function AboutV2() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<ApiAboutStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await publicHttpClient.getAboutStats();
        setStats(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch about stats:', error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main">
          <div className="page-v2-container">
            <div className="about-v2-illustration">
              <img src={handsOnTrophy} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">{t('aboutUs')}</h1>

              <div className="card-v2-content">
                <p>{t('aboutUsParagraph1')}</p>

                <p>{t('aboutUsParagraph2')}</p>

                <p>{t('aboutUsParagraph3')}</p>

                <div className="about-v2-list">
                  <p>{t('aboutUsListTitle')}</p>
                  <ul>
                    <li>{t('aboutUsListItem1')}</li>
                    <li>{t('aboutUsListItem2')}</li>
                    <li>{t('aboutUsListItem3')}</li>
                  </ul>
                </div>

                <p>{t('aboutUsParagraph4')}</p>
              </div>
            </CardV2>
          </div>

          <div className="about-v2-counters-section">
            <CardV2>
              <h2 className="card-v2-title">{t('ourImpact')}</h2>
              <div className="about-v2-counters-grid">
                {isLoading ? (
                  <>
                    <CounterShimmer />
                    <CounterShimmer />
                    <CounterShimmer />
                  </>
                ) : (
                  <>
                    <div className="about-v2-counter">
                      <span className="about-v2-counter-value">
                        {stats
                          ? formatStatNumber(stats.public_games_count)
                          : '---'}
                      </span>
                      <span className="about-v2-counter-label">
                        {t('games')}
                      </span>
                    </div>
                    <div className="about-v2-counter">
                      <span className="about-v2-counter-value">
                        {stats
                          ? formatStatNumber(stats.public_tournaments_count)
                          : '---'}
                      </span>
                      <span className="about-v2-counter-label">
                        {t('tournaments')}
                      </span>
                    </div>
                    <div className="about-v2-counter">
                      <span className="about-v2-counter-value">
                        {stats
                          ? formatStatNumber(
                              stats.organizations_with_public_tournaments_count
                            )
                          : '---'}
                      </span>
                      <span className="about-v2-counter-label">
                        {t('organizations')}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardV2>
          </div>

          <div className="about-v2-team-section">
            <CardV2>
              <h2 className="card-v2-title">{t('theTeam')}</h2>

              <div className="card-v2-content">
                <div className="about-v2-team-grid">
                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={lairPhoto} alt="Lair Júnior" />
                    </div>
                    <h3 className="about-v2-team-member-name">Lair Júnior</h3>
                    <p className="about-v2-team-member-role">{t('founder')}</p>
                    <p className="about-v2-team-member-bio">{t('lairBio')}</p>
                    <p className="about-v2-team-member-bio">
                      <a
                        href="https://www.lairjr.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('lairCta')}
                      </a>
                    </p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={isaPhoto} alt="Isadora Paixão" />
                    </div>
                    <h3 className="about-v2-team-member-name">
                      Isadora Paixão
                    </h3>
                    <p className="about-v2-team-member-role">
                      {t('productDesigner')}
                    </p>
                    <p className="about-v2-team-member-bio">{t('isaBio')}</p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={ruanPhoto} alt="Ruan Victor" />
                    </div>
                    <h3 className="about-v2-team-member-name">Ruan Victor</h3>
                    <p className="about-v2-team-member-role">
                      {t('softwareEngineer')}
                    </p>
                    <p className="about-v2-team-member-bio">{t('ruanBio')}</p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={wagnerPhoto} alt="Wagner Assis" />
                    </div>
                    <h3 className="about-v2-team-member-name">Wagner Assis</h3>
                    <p className="about-v2-team-member-role">
                      {t('mobileEngineer')}
                    </p>
                    <p className="about-v2-team-member-bio">{t('wagnerBio')}</p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={juliaPhoto} alt="Julia Ipê" />
                    </div>
                    <h3 className="about-v2-team-member-name">Julia Ipê</h3>
                    <p className="about-v2-team-member-role">
                      {t('socialMedia')}
                    </p>
                    <p className="about-v2-team-member-bio">{t('juliaBio')}</p>
                  </div>
                </div>
              </div>
            </CardV2>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default AboutV2;
