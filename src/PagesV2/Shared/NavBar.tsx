import React, { useState } from 'react';
import './NavBar.scss';
import logo from '../../assets/logo-white-name.png';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-v2">
      <div className="navbar-v2-container">
        <div className="navbar-v2-brand">
          <a href="/AboutV2" className="navbar-v2-logo">
            <img src={logo} alt="Go Champs" />
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
              Sobre nós
            </a>
            <a href="/faq" className="navbar-v2-link">
              Perguntas Frequentes
            </a>
            <a href="/contact" className="navbar-v2-link">
              Fale com a gente
            </a>
          </div>
          <div className="navbar-v2-actions">
            <a href="/SignIn" className="navbar-v2-login-button button-v2">
              Fazer login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
