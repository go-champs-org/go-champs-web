import React, { useState } from 'react';
import './NavBar.scss';
import logoWhiteName from '../../assets/logo-white-name.png';
import logoGreen from '../../assets/logo-green.png';
import { Trans, useTranslation } from 'react-i18next';
import { useThemeV2 } from '../../ThemeV2';
import AuthenticatedWrapper, {
  NotAuthenticatedWrapper
} from '../../Shared/UI/AdminWrapper';
import BehindFeatureFlag from '../../Shared/UI/BehindFeatureFlag';
import { LOCAL_STORAGE_USERNAME_KEY } from '../../Accounts/constants';
import LegacyNavBar from './LegacyNavBar';

function SiteNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme, toggleTheme } = useThemeV2();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('pt') ? 'en' : 'pt');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="site-header">
      <div className="site-header-container">
        <a href="/" className="site-header-logo">
          <picture>
            <source media="(min-width: 769px)" srcSet={logoWhiteName} />
            <img src={logoGreen} alt="Go Champs" />
          </picture>
        </a>

        <div className={`site-header-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="site-header-links">
            <a href="/About" className="site-header-link">
              <Trans>knowGoChamps</Trans>
            </a>
            <a href="/Faq" className="site-header-link">
              <Trans>faq</Trans>
            </a>
            <a href="/Contact" className="site-header-link">
              <Trans>contactUs</Trans>
            </a>
          </div>
          <div className="site-header-toggles">
            <button
              className="site-header-toggle"
              onClick={toggleTheme}
              aria-label={
                currentTheme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {currentTheme === 'dark' ? '☀' : '☾'}
            </button>
            <button
              className="site-header-toggle"
              onClick={toggleLanguage}
              aria-label={
                i18n.language.startsWith('pt')
                  ? 'Switch to English'
                  : 'Mudar para Português'
              }
            >
              {i18n.language.startsWith('pt') ? '🇧🇷 PT' : '🇺🇸 EN'}
            </button>
          </div>
        </div>

        <div className="site-header-actions">
          <NotAuthenticatedWrapper>
            <a href="/SignIn" className="site-header-login">
              <Trans>signIn</Trans>
            </a>
          </NotAuthenticatedWrapper>
          <AuthenticatedWrapper>
            <a href="/Account" className="site-header-login">
              {(() => {
                const username = localStorage.getItem(
                  LOCAL_STORAGE_USERNAME_KEY
                );
                return username ? `@${username}` : <Trans>account</Trans>;
              })()}
            </a>
          </AuthenticatedWrapper>
          <button
            className={`site-header-burger ${isMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavBar() {
  return (
    <BehindFeatureFlag fallback={<LegacyNavBar />}>
      <SiteNavBar />
    </BehindFeatureFlag>
  );
}

export default NavBar;
