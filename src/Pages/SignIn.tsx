import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Link, RouteComponentProps } from 'react-router-dom';
import SingInForm from '../Accounts/SignInForm';
import { StoreState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { signIn, redirectToFacebookSignUp } from '../Accounts/effects';
import { SignInEntity } from '../Accounts/entity';
import { isSigingIn } from '../Accounts/selectors';
import { Trans, useTranslation } from 'react-i18next';
import FacebookLogin from 'react-facebook-login';
import BehindFeatureFlag from '../Shared/UI/BehindFeatureFlag';
import { REACT_APP_FACEBOOK_APP_ID } from '../Shared/env';

const mapStateToProps = (state: StoreState, props: RouteComponentProps) => ({
  isSigingIn: isSigingIn(state.account),
  history: props.history
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { history, location }: RouteComponentProps
) => {
  return bindActionCreators(
    {
      signIn: (user: SignInEntity) => signIn(user, { history, location })
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type SignInProps = ConnectedProps<typeof connector>;

function SignIn({
  isSigingIn,
  history,
  signIn
}: SignInProps): React.ReactElement {
  const { t } = useTranslation();
  return (
    <div className="container has-text-centered">
      <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
        <div className="card-content">
          <div className="columns is-multiline">
            <div className="column is-12">
              <p className="title has-text-centered">
                <Trans>signIn</Trans>
              </p>
            </div>

            <div className="column is-12">
              <Form
                onSubmit={signIn}
                initialValues={{ username: '', password: '' }}
                render={(props: FormRenderProps<SignInEntity>) => (
                  <SingInForm {...props} isLoading={isSigingIn} />
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
                  textButton={t('signInWithFacebook')}
                  icon="fab fa-facebook"
                />
              </div>
            </BehindFeatureFlag>

            <div className="column is-12" style={{ padding: 0 }}>
              <Link to="/SignUp" className="button is-text">
                <Trans>orSignUp</Trans>
              </Link>
            </div>

            <div className="column is-12" style={{ padding: 0 }}>
              <Link to="/AccountRecovery" className="button is-text">
                <Trans>forgotYourPassword</Trans>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(SignIn);
