import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { StoreState } from '../store';
import { isResetingPassword } from '../Accounts/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { passwordReset } from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import { PasswordResetEntity } from '../Accounts/entity';
import PasswordRecoveryForm, {
  passwordResetValidor
} from '../Accounts/PasswordResetForm';
import { RouteComponentProps } from 'react-router-dom';

const mapStateToProps = (state: StoreState) => ({
  isResetingPassword: isResetingPassword(state.account)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { history }: RouteComponentProps
) => {
  return bindActionCreators(
    {
      passwordReset: (user: PasswordResetEntity) => passwordReset(user, history)
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PasswordRecoveryProps = ConnectedProps<typeof connector>;

const PasswordRecovery: React.FC<PasswordRecoveryProps> = ({
  isResetingPassword,
  passwordReset
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
              onSubmit={passwordReset}
              initialValues={{
                email: '',
                password: '',
                repeatedPassword: '',
                recaptcha: ''
              }}
              validate={passwordResetValidor}
              render={(props: FormRenderProps<PasswordResetEntity>) => (
                <PasswordRecoveryForm
                  {...props}
                  isLoading={isResetingPassword}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default connector(PasswordRecovery);
