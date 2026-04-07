import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  requestOfficialProfile,
  patchOfficialProfileSignature
} from '../OfficialProfiles/effects';
import { StoreState } from '../store';
import { RouteProps } from './support/routerInterfaces';
import {
  officialProfileByUsername,
  officialProfilesLoading,
  patchingOfficialProfileSignature
} from '../OfficialProfiles/selectors';
import { Form, FormRenderProps } from 'react-final-form';
import SignatureForm, {
  signatureValidator
} from '../OfficialProfiles/SignatureForm';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import { FormLoading } from '../OfficialProfiles/Form';
import Helmet from 'react-helmet';
import { Trans } from 'react-i18next';

interface OfficialProfileSignatureRouteParams extends RouteProps {
  username: string;
}

interface SignatureFormValues {
  signature: string;
  signaturePin: string;
  repeatedSignaturePin: string;
}

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<OfficialProfileSignatureRouteParams>
) => ({
  isPatchingSignature: patchingOfficialProfileSignature(state.officialProfiles),
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
      patchOfficialProfileSignature
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type OfficialProfileSignatureEditProps = ConnectedProps<typeof connector> &
  RouteComponentProps<OfficialProfileSignatureRouteParams>;

const OfficialProfileSignatureEdit: React.FC<OfficialProfileSignatureEditProps> = ({
  isPatchingSignature,
  officialProfile,
  officialProfilesLoading,
  patchOfficialProfileSignature,
  requestOfficialProfile,
  match
}) => {
  React.useEffect(() => {
    if (match.params.username) {
      requestOfficialProfile(match.params.username);
    }
  }, [match.params.username, requestOfficialProfile]);

  const backUrl = `/Account/EditOfficialProfile/${match.params.username}`;

  const handleSubmit = (values: SignatureFormValues) => {
    patchOfficialProfileSignature(
      values.signature,
      values.signaturePin,
      match.params.username
    );
  };

  return (
    <Fragment>
      <div className="columns is-vcentered is-mobile is-multiline">
        <div className="column is-12">
          <h2 className="subtitle">
            <Trans>updateSignature</Trans>
          </h2>
        </div>

        <div className="column is-12">
          <ComponentLoader
            canRender={!officialProfilesLoading}
            loader={<FormLoading />}
          >
            <Form
              onSubmit={handleSubmit}
              initialValues={{
                signature: officialProfile.signature || '',
                signaturePin: '',
                repeatedSignaturePin: ''
              }}
              validate={signatureValidator}
              render={(props: FormRenderProps<SignatureFormValues>) => (
                <SignatureForm
                  {...props}
                  backUrl={backUrl}
                  isLoading={isPatchingSignature}
                />
              )}
            />
          </ComponentLoader>
        </div>
      </div>

      <Helmet>
        <title>Go Champs | Update Official Profile Signature</title>
      </Helmet>
    </Fragment>
  );
};

export default connector(OfficialProfileSignatureEdit);
