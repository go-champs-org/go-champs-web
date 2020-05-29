import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { StoreState } from '../store';
import { isResetingPassword } from '../Accounts/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { accountReset } from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import { AccountResetEntity } from '../Accounts/entity';
import AccountResetForm, { accountResetValidor } from '../Accounts/ResetForm';
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
      accountReset: (user: AccountResetEntity) => accountReset(user, history)
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AccountResetProps = ConnectedProps<typeof connector>;

const AccountReset: React.FC<AccountResetProps> = ({
  isResetingPassword,
  accountReset
}) => (
  <div className="container has-text-centered">
    <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
      <div className="card-content">
        <div className="columns is-multiline">
          <div className="column is-12">
            <p className="title has-text-centered">Account Reset</p>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={accountReset}
              initialValues={{
                password: '',
                repeatedPassword: '',
                recoveryToken: '',
                recaptcha: '',
                username: 'testaccount'
              }}
              validate={accountResetValidor}
              render={(props: FormRenderProps<AccountResetEntity>) => (
                <AccountResetForm {...props} isLoading={isResetingPassword} />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default connector(AccountReset);
