import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { StoreState } from '../store';
import { isSigingUp } from '../Accounts/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { signUp } from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import { SignUpEntity } from '../Accounts/entity';
import PasswordRecoveryForm, {
  passwordResetValidor
} from '../Accounts/PasswordResetForm';

const mapStateToProps = (state: StoreState) => ({
  isSigingUp: isSigingUp(state.account)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      signUp
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type PasswordRecoveryProps = ConnectedProps<typeof connector>;

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({
  isSigingUp,
  signUp
}) => (
  <div className="container has-text-centered">
    <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
      <div className="card-content">
        <div className="columns is-multiline">
          <div className="column is-12">
            <p className="title has-text-centered">Password Reset</p>
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
              validate={passwordResetValidor}
              render={(props: FormRenderProps<SignUpEntity>) => (
                <PasswordRecoveryForm {...props} isLoading={isSigingUp} />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default connector(PasswordRecovery);
