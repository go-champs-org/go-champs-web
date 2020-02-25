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

            <a href="/" className="navbar-item">
              Go Champs!
            </a>

            <a href="/" className="navbar-item">
              Sobre nós
            </a>
          </div>
        </div>
      </nav>
    );
  }

  close = (event: any) => {
    if (event && !event.target.classList.contains('navbar-burger')) {
      const menu = document.getElementById('menu');
      menu!.classList.remove('is-active');

      const navbarBurger = document.querySelector('.navbar-burger');
      navbarBurger!.classList.remove('is-active');
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.close);

    const navbarBurger = document.querySelector('.navbar-burger');
    navbarBurger!.addEventListener('click', () => {
      const menu = document.getElementById('menu');

      navbarBurger!.classList.toggle('is-active');
      menu!.classList.toggle('is-active');
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.close);
  }
}

export default NavTopToolbar;
