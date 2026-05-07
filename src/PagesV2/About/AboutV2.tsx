import React from 'react';
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

function AboutV2() {
  const { t } = useTranslation();
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
                <div className="about-v2-counter">
                  <span className="about-v2-counter-value">+3.000</span>
                  <span className="about-v2-counter-label">{t('games')}</span>
                </div>
                <div className="about-v2-counter">
                  <span className="about-v2-counter-value">+300</span>
                  <span className="about-v2-counter-label">
                    {t('tournaments')}
                  </span>
                </div>
                <div className="about-v2-counter">
                  <span className="about-v2-counter-value">+100</span>
                  <span className="about-v2-counter-label">
                    {t('organizations')}
                  </span>
                </div>
              </div>
            </CardV2>
          </div>

          <div className="about-v2-team-section">
            <CardV2>
              <h2 className="card-v2-title">O time</h2>

              <div className="card-v2-content">
                <div className="about-v2-team-grid">
                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={lairPhoto} alt="Lair Júnior" />
                    </div>
                    <h3 className="about-v2-team-member-name">Lair Júnior</h3>
                    <p className="about-v2-team-member-role">Fundador</p>
                    <p className="about-v2-team-member-bio">
                      Apaixonada por construir em comunidade — seja em times de
                      tecnologia ou nas quadras de basquete.
                    </p>
                    <p className="about-v2-team-member-bio">
                      <a
                        href="https://www.lairjr.me"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Quer me conhecer melhor?
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
                      Product Designer
                    </p>
                    <p className="about-v2-team-member-bio">
                      Transformando problemas em experiências. Obcecada por
                      entender pessoas. Entre dados, intuição e design também
                      sou Astróloga.
                    </p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={ruanPhoto} alt="Ruan Victor" />
                    </div>
                    <h3 className="about-v2-team-member-name">Ruan Victor</h3>
                    <p className="about-v2-team-member-role">
                      Software Engineer
                    </p>
                    <p className="about-v2-team-member-bio">The Jedi.</p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={wagnerPhoto} alt="Wagner Assis" />
                    </div>
                    <h3 className="about-v2-team-member-name">Wagner Assis</h3>
                    <p className="about-v2-team-member-role">Mobile Engineer</p>
                    <p className="about-v2-team-member-bio">
                      Nerd, fã de esportes como basquete e futebol, torcedor do
                      SC Internacional.
                    </p>
                  </div>

                  <div className="about-v2-team-member">
                    <div className="about-v2-team-member-photo">
                      <img src={juliaPhoto} alt="Julia Ipê" />
                    </div>
                    <h3 className="about-v2-team-member-name">Julia Ipê</h3>
                    <p className="about-v2-team-member-role">Social Media</p>
                    <p className="about-v2-team-member-bio">
                      Conecto pessoas e propósitos por meio da comunicação.
                      Intensa, apaixonada por gente, por pets e pela vida —
                      idealizadora na essência e prática na ação.
                    </p>
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
