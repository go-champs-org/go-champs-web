import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import OrganizationList from './OrganizationList';
import OrganizationNew from './OrganizationNew';
import OrganizationEdit from './OrganizationEdit';
import Helmet from 'react-helmet';
import { signOut } from '../Accounts/effects';
import { Trans } from 'react-i18next';
import ProfileEdit from './ProfileEdit';
import ProfileNew from './ProfileNew';
import withAccount from './support/withAccount';
import { StoreState } from '../store';
import { athleteProfileByUsername } from '../AthleteProfiles/selectors';
import { LOCAL_STORAGE_USERNAME_KEY } from '../Accounts/constants';
import { bindActionCreators, Dispatch } from 'redux';
import { getAccount } from '../Accounts/effects';
import { requestAthleteProfile } from '../AthleteProfiles/effects';
import { connect, ConnectedProps } from 'react-redux';
import ProfileHome from './ProfileHome';

const mapStateToProps = (state: StoreState) => {
  const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) || '';
  return {
    athleteProfile: athleteProfileByUsername(state.athleteProfiles, username)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getAccount,
      requestAthleteProfile
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type AccountHomeProps = ConnectedProps<typeof connector>;

function AccountHome({ athleteProfile }: AccountHomeProps) {
  return (
    <div>
      <div className="columns is-multiline">
        <header className="column is-12">
          <Link to="/Account">
            <h1 className="title">
              <Trans>myAccount</Trans>
            </h1>
          </Link>
        </header>

        <div className="column is-8">
          <Switch>
            <Route
              path="/Account/EditOrganization/:organizationSlug"
              component={OrganizationEdit}
            />
            <Route
              path="/Account/NewOrganization"
              component={OrganizationNew}
            />
            <Route path="/Account/Organizations" component={OrganizationList} />
            <Route
              path="/Account/EditProfile/:username"
              component={ProfileEdit}
            />
            <Route path="/Account/Profile/:username" component={ProfileHome} />
            <Route path="/Account/NewProfile" component={ProfileNew} />
          </Switch>
        </div>

        <div className="column is-4">
          <aside className="menu">
            <p className="menu-label">
              <Trans>general</Trans>
            </p>

            <ul className="menu-list">
              {athleteProfile.username ? (
                <li>
                  <a href={`/Account/EditProfile/${athleteProfile.username}`}>
                    <Trans>editAthleteProfile</Trans>
                  </a>
                </li>
              ) : (
                <li>
                  <a href="/Account/NewProfile">
                    <Trans>newAthleteProfile</Trans>
                  </a>
                </li>
              )}

              <li>
                <a href="/Account/Organizations">
                  <Trans>organizations</Trans>
                </a>
              </li>
            </ul>

            <p className="menu-label">
              <Trans>account</Trans>
            </p>

            <ul className="menu-list">
              <li>
                <a href="/" onClick={signOut}>
                  <Trans>signOut</Trans>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>

      <Helmet>
        <title>Go Champs | My Account</title>
      </Helmet>
    </div>
  );
}

export default connector(withAccount(AccountHome));
