import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  requestOfficialProfile,
  patchOfficialProfile
} from '../OfficialProfiles/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  officialProfileByUsername,
  officialProfilesLoading,
  patchingOfficialProfile
} from '../OfficialProfiles/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import {
  default as OfficialProfileForm,
  FormLoading,
  officialProfileValidator
} from '../OfficialProfiles/Form';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import Helmet from 'react-helmet';
import { OfficialProfileEntity } from '../OfficialProfiles/state';
import { Trans } from 'react-i18next';

interface OfficialProfileRouteParams extends RouteProps {
  username: string;
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<OfficialProfileRouteParams>
) => ({
  isPatchingOfficialProfile: patchingOfficialProfile(state.officialProfiles),
  officialProfile: officialProfileByUsername(
    state.officialProfiles,
    props.match.params.username
  ),
  officialProfilesLoading: officialProfilesLoading(state.officialProfiles)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      requestOfficialProfile,
      patchOfficialProfile
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OfficialProfileEditProps = ConnectedProps<typeof connector> &
  RouteComponentProps<OfficialProfileRouteParams>;

const OfficialProfileEdit: React.FC<OfficialProfileEditProps> = ({
  isPatchingOfficialProfile,
  officialProfile,
  officialProfilesLoading,
  patchOfficialProfile,
  requestOfficialProfile,
  match
}) => {
  React.useEffect(() => {
    if (match.params.username) {
      requestOfficialProfile(match.params.username);
    }
  }, [match.params.username, requestOfficialProfile]);

  const backUrl = `/Account`;
  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>editOfficialProfile</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!officialProfilesLoading}
            loader={<FormLoading />}
          >
            <Form
              onSubmit={patchOfficialProfile}
              initialValues={officialProfile}
              validate={values => officialProfileValidator(values, false)}
              render={(props: FormRenderProps<OfficialProfileEntity>) => (
                <OfficialProfileForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPatchingOfficialProfile}
                  isNewProfile={false}
                />
              )}
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs | Edit Official Profile</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(OfficialProfileEdit);
