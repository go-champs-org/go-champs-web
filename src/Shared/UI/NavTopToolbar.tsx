import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-with-background.png';
import AdminWrapper from './AdminWrapper';
import './NavTopToolbar.scss';

class NavTopToolbar extends React.Component {
  render() {
    return (
      <nav
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="dropdown navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={logo} alt="Go Champs" className="logo" />

            <h2 className="title">Go Champs!</h2>
          </a>

          <a
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="menu"
            href="/"
            onClick={(event: MouseEvent) => event.preventDefault()}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="menu" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <Link to="/Search">
                <span className="icon is-medium">
                  <i className="fas fa-search"></i>
                </span>
              </Link>
            </div>

            <div className="navbar-item">
              <span className="navbar-divider"></span>
            </div>

            <AdminWrapper>
              <a href="/Account" className="navbar-item">
                My account
              </a>
            </AdminWrapper>

            <a href="/About" className="navbar-item">
              Go Champs!
            </a>

            <a href="/About" className="navbar-item">
              Sobre nós
            </a>
          </div>
        </div>
      </nav>
    );
  }

  componentDidMount() {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    );

    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          const target = el.dataset.target;
          const menu = document.getElementById(target);

          el.classList.toggle('is-active');
          menu!.classList.toggle('is-active');
        });
      });
    }
  }
}

export default NavTopToolbar;
