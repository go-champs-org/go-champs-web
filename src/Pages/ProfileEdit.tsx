import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  requestAthleteProfile,
  patchAthleteProfile
} from '../AthleteProfiles/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  athleteProfileByUsername,
  athleteProfilesLoading,
  patchingAthleteProfile
} from '../AthleteProfiles/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import {
  default as AthleteProfileForm,
  FormLoading
} from '../AthleteProfiles/Form';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Helmet from 'react-helmet';
import { AthleteProfileEntity } from '../AthleteProfiles/state';
import { Trans } from 'react-i18next';

interface ProfileRouteParams extends RouteProps {
  username: string;
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<ProfileRouteParams>
) => ({
  isPatchingAthleteProfile: patchingAthleteProfile(state.athleteProfiles),
  athleteProfile: athleteProfileByUsername(
    state.athleteProfiles,
    props.match.params.username
  ),
  athleteProfilesLoading: athleteProfilesLoading(state.athleteProfiles)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      requestAthleteProfile,
      patchAthleteProfile
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type ProfileEditProps = ConnectedProps<typeof connector> &
  RouteComponentProps<ProfileRouteParams>;

const ProfileEdit: React.FC<ProfileEditProps> = ({
  isPatchingAthleteProfile,
  athleteProfile,
  athleteProfilesLoading,
  patchAthleteProfile,
  requestAthleteProfile,
  match
}) => {
  React.useEffect(() => {
    if (match.params.username) {
      requestAthleteProfile(match.params.username);
    }
  }, [match.params.username, requestAthleteProfile]);

  const backUrl = `/Account`;
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>editAthleteProfile</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!athleteProfilesLoading}
            loader={<FormLoading />}
          >
            <Form
              onSubmit={patchAthleteProfile}
              initialValues={athleteProfile}
              render={(props: FormRenderProps<AthleteProfileEntity>) => (
                <AthleteProfileForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPatchingAthleteProfile}
                />
              )}
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs | Edit Athlete Profile</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(ProfileEdit);
