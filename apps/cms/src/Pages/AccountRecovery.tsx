import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { AccountRecoveryEntity } from '../Accounts/entity';
import AccountRecoveryForm, {
  accountRecoveryValidor
} from '../Accounts/RecoveryForm';
import { isAccountRecovering } from '../Accounts/selectors';
import { StoreState } from '../store';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router-dom';
import { accountRecovery } from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';
import { Trans } from 'react-i18next';

const mapStateToProps = (state: StoreState) => ({
  isAccountRecovering: isAccountRecovering(state.account)
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { history }: RouteComponentProps
) => {
  return bindActionCreators(
    {
      accountRecovery: (accountRecoveryData: AccountRecoveryEntity) =>
        accountRecovery(accountRecoveryData, history)
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AccountRecoveryProps = ConnectedProps<typeof connector>;

const AccountRecovery: React.FC<AccountRecoveryProps> = ({
  accountRecovery,
  isAccountRecovering
}) => {
  return (
    <div className="container has-text-centered">
      <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
        <div className="card-content">
          <div className="columns is-multiline">
            <div className="column is-12">
              <p className="title has-text-centered">
                <Trans>accountRecovery</Trans>
              </p>
            </div>

            <div className="column is-12">
              <Form
                onSubmit={accountRecovery}
                initialValues={{ email: '', recaptcha: '' }}
                validate={accountRecoveryValidor}
                render={(props: FormRenderProps<AccountRecoveryEntity>) => (
                  <AccountRecoveryForm
                    {...props}
                    isLoading={isAccountRecovering}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connector(AccountRecovery);
