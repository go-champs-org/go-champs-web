import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import SignUpForm, { signUpValidor } from '../Accounts/SignUpForm';
import { StoreState } from '../store';
import { isSigingUp } from '../Accounts/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { signUp, signUpWithRegistration } from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import { SignUpEntity } from '../Accounts/entity';
import { RouteComponentProps } from 'react-router-dom';
import { Trans } from 'react-i18next';

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
  location,
  signUp
}: SignUpProps): React.ReactElement {
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(SignUp);
