import React, { MouseEvent } from 'react';
import logo from '../../assets/logo-green.png';
import './NavTopToolbar.scss';
import AuthenticatedWrapper, { NotAuthenticatedWrapper } from './AdminWrapper';
import { StoreState } from '../../store';
import { account } from '../../Accounts/selectors';
import { getAccount } from '../../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import { Trans } from 'react-i18next';
import { bindActionCreators, Dispatch } from 'redux';
import withAccount from '../../Pages/support/withAccount';
import { ThemeSwitcher } from '../../Theme';
import BehindFeatureFlag from './BehindFeatureFlag';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAccount
    },
    dispatch
  );

const mapStateToProps = (state: StoreState) => ({
  account: account(state.account)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type NavTopToolbarProps = ConnectedProps<typeof connector>;

class NavTopToolbar extends React.Component<NavTopToolbarProps> {
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

            <h2 className="title notranslate">Go Champs</h2>
          </a>

          <span
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="menu"
            onClick={(event: MouseEvent) => event.preventDefault()}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>

        <div id="menu" className="navbar-menu">
          <div className="navbar-end">
            <a href="/Search" className="navbar-item has-text-centered-touch">
              <span className="icon is-medium">
                <i className="fas fa-search"></i>
              </span>
            </a>

            <div className="navbar-item">
              <span className="navbar-divider"></span>
            </div>

            <BehindFeatureFlag>
              <div className="navbar-item">
                <ThemeSwitcher variant="toggle" showLabel={false} />
              </div>
            </BehindFeatureFlag>

            <NotAuthenticatedWrapper>
              <a href="/SignIn" className="navbar-item has-text-centered-touch">
                <Trans>signIn</Trans>
              </a>
            </NotAuthenticatedWrapper>

            <AuthenticatedWrapper>
              <a
                href="/Account"
                className="navbar-item has-text-centered-touch"
              >
                {this.props.account && `@${this.props.account.username}`}
              </a>
            </AuthenticatedWrapper>

            <a href="/UseAsApp" className="navbar-item has-text-centered-touch">
              <Trans>useAsAnApp</Trans>
            </a>

            <a href="/About" className="navbar-item has-text-centered-touch">
              <Trans>aboutUs</Trans>
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

export default connector(withAccount(NavTopToolbar));
