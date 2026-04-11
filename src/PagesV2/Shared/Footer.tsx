import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';
import { REACT_APP_BUILD_NUMBER } from '../../Shared/env';

function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer-v2">
      <div className="footer-v2-container">
        <div className="footer-v2-social">
          <a
            href="https://www.instagram.com/gochampsapp"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-v2-social-link"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.youtube.com/@GoChampsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-v2-social-link"
            aria-label="YouTube"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/go-champs"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-v2-social-link"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <div className="footer-v2-text">
          <p className="footer-v2-attribution">
            <strong>Go Champs</strong>
            {`, ${t('with')} 💚 `}
            {t('byGoChampsTeam')}.
          </p>
          <p className="footer-v2-license">
            {`${t('theSourceCodeIsLicensed')} `}
            <a
              href="https://github.com/lairjr/go-champs-web/blob/master/LICENSE"
              className="footer-v2-link"
            >
              MIT
            </a>
            .
            <a href="/PrivacyPolicyBRV2" className="footer-v2-link">
              {` ${t('privacyPolicyBR')}`}
            </a>
            {'. '}
            <a href="/TermsBRV2" className="footer-v2-link">
              {t('termsBR')}
            </a>
            .
          </p>
          <p className="footer-v2-attribution">
            {t('copyright')} &copy; {new Date().getFullYear()}{' '}
            <a href="https://go-champs.com" className="footer-v2-link">
              Go Champs Tecnologia LTDA
            </a>
            {` ${t('andContributors')}. ${t('allRightsReserved')}.`}
          </p>
          <p className="footer-v2-build">
            Build: <em>1.0.{REACT_APP_BUILD_NUMBER}</em>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
