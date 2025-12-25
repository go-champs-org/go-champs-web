import React from 'react';
import { Trans } from 'react-i18next';
import './AccountHomeBillboard.scss';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { LOCAL_STORAGE_USERNAME_KEY } from '../Accounts/constants';
import { StoreState } from '../store';
import { athleteProfileByUsername } from '../AthleteProfiles/selectors';
import { getAccount } from '../Accounts/effects';
import { requestAthleteProfile } from '../AthleteProfiles/effects';
import withAccount from './support/withAccount';
import { isGettingAccountLoading } from '../Accounts/selectors';
import { Link } from 'react-router-dom';

const mapStateToProps = (state: StoreState) => {
  const username = localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) || '';
  return {
    athleteProfile: athleteProfileByUsername(state.athleteProfiles, username),
    isGettingAccountLoading: isGettingAccountLoading(state.account)
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

type AccountHomeBillboardProps = ConnectedProps<typeof connector>;

function AccountHomeBillboard({
  athleteProfile,
  isGettingAccountLoading
}: AccountHomeBillboardProps) {
  return (
    <div className="account-billboard">
      <div className="billboard-content">
        <header>
          <Link to="/Account">
            <h1 className="title">
              <Trans>myAccount</Trans>
            </h1>
          </Link>
        </header>
        <div className="hero is-welcome is-info slide-fade-content">
          <div className="hero-body">
            <h1 className="title">
              <Trans>welcomeChamps</Trans>
            </h1>
          </div>
        </div>
        {isGettingAccountLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            {athleteProfile.username ? (
              <div className="hero is-primary slide-fade-content delay-1 hero-clickable">
                <Link to={`/Account/EditProfile/${athleteProfile.username}`}>
                  <div className="hero-body">
                    <div className="hero-content-stacked">
                      <div className="hero-main-row">
                        <p className="is-size-5">
                          <Trans>manageAthleteProfile</Trans>
                        </p>
                        <button className="button hero-button">
                          <span>
                            <Trans>clickHere</Trans>
                          </span>
                          <span className="icon">
                            <i className="fas fa-arrow-right"></i>
                          </span>
                        </button>
                      </div>
                      <div className="hero-subtitle-row">
                        <p className="is-size-7">
                          <Trans>forAthletes</Trans>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="hero is-primary slide-fade-content delay-1 hero-clickable">
                <Link to="/Account/NewProfile">
                  <div className="hero-body">
                    <div className="hero-content-stacked">
                      <div className="hero-main-row">
                        <p className="is-size-5">
                          <Trans>createAthleteProfile</Trans>
                        </p>
                        <button className="button hero-button">
                          <span>
                            <Trans>clickHere</Trans>
                          </span>
                          <span className="icon">
                            <i className="fas fa-arrow-right"></i>
                          </span>
                        </button>
                      </div>
                      <div className="hero-subtitle-row">
                        <p className="is-size-7">
                          <Trans>forAthletes</Trans>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            <div className="hero is-info slide-fade-content delay-2 hero-clickable">
              <Link to="/Account/Organizations">
                <div className="hero-body">
                  <div className="hero-content-stacked">
                    <div className="hero-main-row">
                      <p className="is-size-5">
                        <Trans>manageOrganizations</Trans>
                      </p>
                      <button className="button hero-button">
                        <span>
                          <Trans>clickHere</Trans>
                        </span>
                        <span className="icon">
                          <i className="fas fa-arrow-right"></i>
                        </span>
                      </button>
                    </div>
                    <div className="hero-subtitle-row">
                      <p className="is-size-7">
                        <Trans>forOrganizationAdministrators</Trans>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default connector(withAccount(AccountHomeBillboard));
