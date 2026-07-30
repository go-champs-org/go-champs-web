import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { postAthleteProfile } from '../AthleteProfiles/effects';
import { default as AthleteProfileForm } from '../AthleteProfiles/Form';
import { Form, FormRenderProps } from 'react-final-form';
import {
  AthleteProfileEntity,
  DEFAULT_ATHLETE_PROFILE
} from '../AthleteProfiles/state';
import Helmet from 'react-helmet';
import { StoreState } from '../store';
import { postingAthleteProfile } from '../AthleteProfiles/selectors';
import { RouteComponentProps } from 'react-router-dom';
import { Trans } from 'react-i18next';

const mapStateToProps = (state: StoreState) => ({
  isPostingAthleteProfile: postingAthleteProfile(state.athleteProfiles)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { history }: RouteComponentProps
) =>
  bindActionCreators(
    {
      postAthleteProfile: (athleteProfile: AthleteProfileEntity) =>
        postAthleteProfile(athleteProfile)
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProfileNewProps = ConnectedProps<typeof connector>;

const ProfileNew: React.FC<ProfileNewProps> = ({
  isPostingAthleteProfile,
  postAthleteProfile
}) => {
  const backUrl = `/Account`;
  const initialAthleteProfile = DEFAULT_ATHLETE_PROFILE;
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>newAthleteProfile</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <Form
            onSubmit={postAthleteProfile}
            initialValues={initialAthleteProfile}
            render={(props: FormRenderProps<AthleteProfileEntity>) => (
              <AthleteProfileForm
                {...props}
                backUrl={backUrl}
                isLoading={isPostingAthleteProfile}
              />
            )}
          />
        </div>
      </div>

      <Helmet>
        <title>Go Champs | New Athlete Profile</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(ProfileNew);
