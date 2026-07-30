import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import SignUpForm, { signUpValidor } from '../Accounts/SignUpForm';
import { StoreState } from '../store';
import { isSigingUp } from '../Accounts/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import {
  signUp,
  signUpWithRegistration,
  redirectToFacebookSignUp
} from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import { SignUpEntity } from '../Accounts/entity';
import { RouteComponentProps } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import FacebookLogin from 'react-facebook-login';
import BehindFeatureFlag from '../Shared/UI/BehindFeatureFlag';
import { REACT_APP_FACEBOOK_APP_ID } from '../Shared/env';

const mapStateToProps = (state: StoreState, props: RouteComponentProps) => ({
  isSigingUp: isSigingUp(state.account),
  history: props.history,
  location: props.location
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { history, location }: RouteComponentProps
) => {
  const searchParams = new URLSearchParams(location.search);
  const registrationResponseId = searchParams.get('registrationResponseId');

  return bindActionCreators(
    {
      signUp: registrationResponseId
        ? (user: SignUpEntity) =>
            signUpWithRegistration(user, registrationResponseId, history)
        : (user: SignUpEntity) => signUp(user, history)
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type SignUpProps = ConnectedProps<typeof connector>;

function SignUp({
  isSigingUp,
  history,
  location,
  signUp
}: SignUpProps): React.ReactElement {
  const { t } = useTranslation();

  const searchParams = new URLSearchParams(location.search);
  const emailFromQuery = searchParams.get('email') || '';

  return (
    <div className="container has-text-centered">
      <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
        <div className="card-content">
          <div className="columns is-multiline">
            <div className="column is-12">
              <p className="title has-text-centered">
                <Trans>signUp</Trans>
              </p>
            </div>

            <div className="column is-12">
              <Form
                onSubmit={signUp}
                initialValues={{
                  email: emailFromQuery,
                  password: '',
                  repeatedPassword: '',
                  recaptcha: '',
                  username: ''
                }}
                validate={signUpValidor}
                render={(props: FormRenderProps<SignUpEntity>) => (
                  <SignUpForm {...props} isLoading={isSigingUp} />
                )}
              />
            </div>

            <BehindFeatureFlag>
              <div className="column is-12" style={{ paddingTop: 0 }}>
                <FacebookLogin
                  appId={REACT_APP_FACEBOOK_APP_ID || ''}
                  fields="id,email"
                  isDisabled={false}
                  callback={redirectToFacebookSignUp(history)}
                  cssClass="button facebook"
                  textButton={t('signUpWithFacebook')}
                  icon="fab fa-facebook"
                />
              </div>
            </BehindFeatureFlag>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(SignUp);
