import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';
import logoWhiteName from '../../assets/logo-white-name.png';
import { REACT_APP_BUILD_NUMBER } from '../../Shared/env';

const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/gochampsapp',
    label: 'Instagram',
    icon: 'fab fa-instagram'
  },
  {
    href: 'https://www.linkedin.com/company/go-champs',
    label: 'LinkedIn',
    icon: 'fab fa-linkedin'
  },
  {
    href: 'https://www.youtube.com/@GoChampsApp',
    label: 'YouTube',
    icon: 'fab fa-youtube'
  }
];

function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <div className="site-footer-spacer" aria-hidden="true" />
      <footer className="site-footer">
        <div className="site-footer-container">
          <div className="site-footer-top">
            <div className="site-footer-brand">
              <a href="/" className="site-footer-logo">
                <img src={logoWhiteName} alt="Go Champs" />
              </a>
              <p className="site-footer-tagline">{t('footerTagline')}</p>
              <div className="site-footer-social">
                {SOCIAL_LINKS.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer-social-link"
                    aria-label={link.label}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            <nav className="site-footer-columns">
              <div className="site-footer-column">
                <span className="site-footer-column-title">
                  {t('footerPlatform')}
                </span>
                <a href="/About#organizers" className="site-footer-link">
                  {t('footerForOrganizers')}
                </a>
                <a href="/" className="site-footer-link">
                  {t('tournaments')}
                </a>
                <a
                  href="https://api.go-champs.com/docs"
                  className="site-footer-link"
                >
                  {t('footerApiDocumentation')}
                </a>
              </div>
              <div className="site-footer-column">
                <span className="site-footer-column-title">Go Champs</span>
                <a href="/About" className="site-footer-link">
                  {t('knowGoChamps')}
                </a>
                <a href="/Faq" className="site-footer-link">
                  {t('faq')}
                </a>
                <a href="/Contact" className="site-footer-link">
                  {t('contactUs')}
                </a>
                <a href="/TermsBR" className="site-footer-link">
                  {t('termsBR')}
                </a>
                <a href="/PrivacyPolicyBR" className="site-footer-link">
                  {t('privacyPolicyBR')}
                </a>
              </div>
            </nav>
          </div>

          <div className="site-footer-bottom">
            <div className="site-footer-legal">
              <p>
                <strong>Go Champs</strong>
                {`, ${t('with')} 💚 `}
                {t('byGoChampsTeam')}.
              </p>
              <p>
                {t('copyright')} &copy; {new Date().getFullYear()}{' '}
                <a
                  href="https://go-champs.com"
                  className="site-footer-legal-link"
                >
                  Go Champs Tecnologia LTDA
                </a>
                {` ${t('andContributors')}. ${t('allRightsReserved')}.`}
              </p>
            </div>
            <div className="site-footer-meta">
              <p>
                {`${t('theSourceCodeIsLicensed')} `}
                <a
                  href="https://github.com/lairjr/go-champs-web/blob/master/LICENSE"
                  className="site-footer-legal-link"
                >
                  MIT
                </a>
              </p>
              <p className="site-footer-build">
                Build 1.0.{REACT_APP_BUILD_NUMBER}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
