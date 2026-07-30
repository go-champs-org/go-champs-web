import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { postOfficialProfile } from '../OfficialProfiles/effects';
import {
  default as OfficialProfileForm,
  officialProfileValidator
} from '../OfficialProfiles/Form';
import { Form, FormRenderProps } from 'react-final-form';
import {
  OfficialProfileEntity,
  DEFAULT_OFFICIAL_PROFILE
} from '../OfficialProfiles/state';
import Helmet from 'react-helmet';
import { StoreState } from '../store';
import { postingOfficialProfile } from '../OfficialProfiles/selectors';
import { Trans } from 'react-i18next';

const mapStateToProps = (state: StoreState) => ({
  isPostingOfficialProfile: postingOfficialProfile(state.officialProfiles)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      postOfficialProfile: (officialProfile: OfficialProfileEntity) =>
        postOfficialProfile(officialProfile)
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OfficialProfileNewProps = ConnectedProps<typeof connector>;

const OfficialProfileNew: React.FC<OfficialProfileNewProps> = ({
  isPostingOfficialProfile,
  postOfficialProfile
}) => {
  const backUrl = `/Account`;
  const initialOfficialProfile = DEFAULT_OFFICIAL_PROFILE;
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>newOfficialProfile</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <Form
            onSubmit={postOfficialProfile}
            initialValues={initialOfficialProfile}
            validate={values => officialProfileValidator(values, true)}
            render={(props: FormRenderProps<OfficialProfileEntity>) => (
              <OfficialProfileForm
                {...props}
                backUrl={backUrl}
                isLoading={isPostingOfficialProfile}
                isNewProfile={true}
              />
            )}
          />
        </div>
      </div>

      <Helmet>
        <title>Go Champs | New Official Profile</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(OfficialProfileNew);
