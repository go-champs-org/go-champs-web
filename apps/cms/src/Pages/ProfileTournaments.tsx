import React from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';

import { RouteProps } from './support/routerInterfaces';
import { athleteProfileByUsername } from '../AthleteProfiles/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { requestAthleteProfile } from '../AthleteProfiles/effects';
import { connect, ConnectedProps } from 'react-redux';
import Banner from '../AthleteProfiles/Banner';
import MiniCard from '../Tournaments/MiniCard';
import { Trans } from 'react-i18next';
import './AthleteProfilePage.scss';

interface ProfileTournamentsParams extends RouteProps {
  username: string;
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<ProfileTournamentsParams>
) => ({
  athleteProfile: athleteProfileByUsername(
    state.athleteProfiles,
    props.match.params.username
  )
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      requestAthleteProfile
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProfileTournamentsProps = ConnectedProps<typeof connector> &
  RouteComponentProps<ProfileTournamentsParams>;

function ProfileTournaments({
  match,
  athleteProfile,
  requestAthleteProfile
}: ProfileTournamentsProps) {
  React.useEffect(() => {
    if (match.params.username) {
      requestAthleteProfile(match.params.username);
    }
  }, [match.params.username, requestAthleteProfile]);

  return (
    <div className="columns is-multiline athlete-profile-page">
      <div className="column is-12 slide-fade-content">
        <Banner athleteProfile={athleteProfile} />
      </div>

      <div className="column is-12 slide-fade-content delay-1">
        <h2 className="title is-5 athlete-profile-page__section-title">
          <Trans>tournaments</Trans>
        </h2>
      </div>

      {athleteProfile.tournaments && athleteProfile.tournaments.length > 0 ? (
        athleteProfile.tournaments.map(tournament => (
          <div key={tournament.id} className="column is-12">
            <MiniCard tournament={tournament} />
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
    </div>
  );
}

export default connector(ProfileTournaments);
