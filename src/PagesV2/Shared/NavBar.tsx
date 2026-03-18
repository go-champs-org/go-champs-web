import React, { useState } from 'react';
import './NavBar.scss';
import logoWhiteName from '../../assets/logo-white-name.png';
import logoGreen from '../../assets/logo-green.png';
import { Trans } from 'react-i18next';

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-v2">
      <div className="navbar-v2-container">
        <div className="navbar-v2-brand">
          <a href="/AboutV2" className="navbar-v2-logo">
            <picture>
              <source media="(min-width: 769px)" srcSet={logoWhiteName} />
              <img src={logoGreen} alt="Go Champs" />
            </picture>
            <span className="navbar-v2-brand-name">Go Champs</span>
          </a>
          <button
            className={`navbar-v2-burger ${isMenuOpen ? 'is-active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`navbar-v2-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <div className="navbar-v2-links">
            <a href="/AboutV2" className="navbar-v2-link">
              <Trans>aboutUs</Trans>
            </a>
            <a href="/faq" className="navbar-v2-link">
              <Trans>faq</Trans>
            </a>
            <a href="/contact" className="navbar-v2-link">
              <Trans>contactUs</Trans>
            </a>
          </div>
          <div className="navbar-v2-actions">
            <a href="/SignInV2" className="navbar-v2-login-button button-v2">
              <Trans>signIn</Trans>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
