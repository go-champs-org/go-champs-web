import React from 'react';
import './Footer.scss';
import { REACT_APP_BUILD_NUMBER } from '../../Shared/env';

const Footer: React.FC = () => {
  return (
    <footer className="footer-v2">
      <div className="footer-v2-container">
        <div className="footer-v2-social">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-v2-social-link"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-v2-social-link"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-v2-social-link"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://linkedin.com"
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
            Go Champs! with <span className="footer-v2-heart">♥️</span> by Lair
            Júnior
          </p>
          <p className="footer-v2-license">
            The source code is licensed MIT. The website content is licensed CC
            BY SA 4.0.
          </p>
          <p className="footer-v2-build">
            Build: <em>0.0.{REACT_APP_BUILD_NUMBER}</em>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
