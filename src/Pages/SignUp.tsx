import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import SignUpForm, { signUpValidor } from '../Accounts/SignUpForm';
import { StoreState } from '../store';
import { isSigingUp } from '../Accounts/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { signUp } from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import { SignUpEntity } from '../Accounts/entity';
import { RouteComponentProps } from 'react-router-dom';

const mapStateToProps = (state: StoreState) => ({
  isSigingUp: isSigingUp(state.account)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { history }: RouteComponentProps
) =>
  bindActionCreators(
    {
      signUp: (user: SignUpEntity) => signUp(user, history)
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type SignUpProps = ConnectedProps<typeof connector>;

const SignUp: React.FC<SignUpProps> = ({ isSigingUp, signUp }) => (
  <div className="container has-text-centered">
    <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
      <div className="card-content">
        <div className="columns is-multiline">
          <div className="column is-12">
            <p className="title has-text-centered">Sign up</p>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={signUp}
              initialValues={{
                email: '',
                password: '',
                repeatedPassword: '',
                recaptcha: ''
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

export default connector(SignUp);
