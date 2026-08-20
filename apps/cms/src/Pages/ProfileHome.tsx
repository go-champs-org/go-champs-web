import React from 'react';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';

import { RouteProps } from './support/routerInterfaces';
import {
  athleteProfileByUsername,
  hasCareerStats
} from '../AthleteProfiles/selectors';
import { bindActionCreators, Dispatch } from 'redux';
import { requestAthleteProfile } from '../AthleteProfiles/effects';
import { connect, ConnectedProps } from 'react-redux';
import Banner from '../AthleteProfiles/Banner';
import CareerStats from '../AthleteProfiles/CareerStats';
import Schedule from '../AthleteProfiles/Schedules/Schedule';
import { Trans } from 'react-i18next';
import './AthleteProfilePage.scss';

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

type ProfileHomeProps = ConnectedProps<typeof connector> &
  RouteComponentProps<ProfileHomeParams>;

function ProfileHome({
  match,
  requestAthleteProfile,
  athleteProfile
}: ProfileHomeProps) {
  React.useEffect(() => {
    if (match.params.username) {
      requestAthleteProfile(match.params.username);
    }
  }, [match.params.username, requestAthleteProfile]);

  const hasLinkedTournaments = !!(
    athleteProfile &&
    athleteProfile.tournaments &&
    athleteProfile.tournaments.length > 0
  );

  return (
    <div className="columns is-multiline athlete-profile-page">
      <div className="column is-12 slide-fade-content">
        <Banner athleteProfile={athleteProfile} />
      </div>

      {hasCareerStats(athleteProfile) && (
        <div className="column is-12 slide-fade-content delay-1">
          <div className="athlete-profile-page__section">
            <h2 className="title is-5 athlete-profile-page__section-title">
              <Trans>careerStats</Trans>
            </h2>

            <CareerStats careerStats={athleteProfile.careerStats || []} />
          </div>
        </div>
      )}

      <div className="column is-12 slide-fade-content delay-2">
        <div className="athlete-profile-page__section">
          <Schedule hasLinkedTournaments={hasLinkedTournaments} />
        </div>
      </div>
    </div>
  );
}

export default connector(ProfileHome);
