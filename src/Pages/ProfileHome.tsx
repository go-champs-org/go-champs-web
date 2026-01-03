import React from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';

import { RouteProps } from './support/routerInterfaces';
import {
  athleteProfileByUsername,
  athleteProfileLoading
} from '../AthleteProfiles/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { requestAthleteProfile } from '../AthleteProfiles/effects';
import { connect, ConnectedProps } from 'react-redux';
import Result from '../Search/Result';
import Banner from '../AthleteProfiles/Banner';
import './ProfileHome.scss';
import { Trans } from 'react-i18next';

interface ProfileHomeParams extends RouteProps {
  username: string;
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<ProfileHomeParams>
) => ({
  athleteProfile: athleteProfileByUsername(
    state.athleteProfiles,
    props.match.params.username
  ),
  athleteProfileLoading: athleteProfileLoading(state.athleteProfiles)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      requestAthleteProfile
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProfileHomeProps = ConnectedProps<typeof connector> &
  RouteComponentProps<ProfileHomeParams>;

function ProfileHome({
  match,
  requestAthleteProfile,
  athleteProfile,
  athleteProfileLoading
}: ProfileHomeProps) {
  React.useEffect(() => {
    if (match.params.username) {
      requestAthleteProfile(match.params.username);
    }
  }, [match.params.username, requestAthleteProfile]);

  return (
    <div className="columns is-multiline profile-home">
      <div className="column is-12 slide-fade-content">
        <Banner athleteProfile={athleteProfile} />
      </div>

      <div className="column is-12 slide-fade-content delay-1">
        <h2 className="title is-5">Seus campeonatos</h2>
      </div>

      {athleteProfileLoading ? (
        <div className="column is-12">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      ) : (
        <>
          {athleteProfile &&
          athleteProfile.tournaments &&
          athleteProfile.tournaments.length > 0 ? (
            athleteProfile.tournaments.map((tournament, index) => (
              <div key={tournament.id} className="tournament-result column">
                <div className="columns">
                  <Result tournament={tournament} />
                </div>
              </div>
            ))
          ) : (
            <div className="column is-12 slide-fade-content delay-2">
              <div className="hero is-dark is-small">
                <div className="hero-body">
                  <div className="container">
                    <p className="subtitle has-text-centered">
                      <Trans>noTournamentsYet</Trans>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default connector(ProfileHome);
