import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { signUp, signUpWithRegistration } from '../../Accounts/effects';
import { SignUpEntity } from '../../Accounts/entity';
import { isSigingUp } from '../../Accounts/selectors';
import { signUpValidor } from '../../Accounts/SignUpForm';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import SignUpFormV2 from '../../Accounts/SignUpFormV2';
import girlOnSmartphone from '../../assets/illustrations/girl-on-smartphone.svg';
import { Trans } from 'react-i18next';
import './SignUpV2.scss';

const mapStateToProps = (state: StoreState, props: RouteComponentProps) => {
  const searchParams = new URLSearchParams(props.location.search);
  return {
    isSigingUp: isSigingUp(state.account),
    history: props.history,
    location: props.location,
    emailFromQuery: searchParams.get('email') || ''
  };
};

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

type SignUpV2Props = ConnectedProps<typeof connector>;

function SignUpV2({
  isSigingUp,
  signUp,
  emailFromQuery
}: SignUpV2Props): React.ReactElement {
  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main signup-v2-page">
          <div className="page-v2-container">
            <div className="signup-v2-illustration">
              <img src={girlOnSmartphone} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">
                <Trans>signUp</Trans>
              </h1>
              <p className="card-v2-subtitle is-hidden-mobile">
                <Trans>signUpSubtitle</Trans>
              </p>

              <Form
                onSubmit={signUp}
                initialValues={{
                  username: '',
                  email: emailFromQuery,
                  password: '',
                  repeatedPassword: '',
                  recaptcha: ''
                }}
                validate={signUpValidor}
                render={(props: FormRenderProps<SignUpEntity>) => (
                  <SignUpFormV2 {...props} isLoading={isSigingUp} />
                )}
              />
            </CardV2>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeV2Provider>
  );
}

export default connector(SignUpV2);
