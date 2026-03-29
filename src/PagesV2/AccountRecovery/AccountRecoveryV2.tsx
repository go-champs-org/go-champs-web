import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { accountRecovery } from '../../Accounts/effects';
import { AccountRecoveryEntity } from '../../Accounts/entity';
import { isAccountRecovering } from '../../Accounts/selectors';
import { accountRecoveryValidor } from '../../Accounts/RecoveryForm';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import AccountRecoveryFormV2 from '../../Accounts/AccountRecoveryFormV2';
import pathToSuccess from '../../assets/illustrations/path-to-success.svg';
import { Trans } from 'react-i18next';
import './AccountRecoveryV2.scss';

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

type AccountRecoveryV2Props = ConnectedProps<typeof connector>;

function AccountRecoveryV2({
  isAccountRecovering,
  accountRecovery
}: AccountRecoveryV2Props): React.ReactElement {
  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main account-recovery-v2-page">
          <div className="page-v2-container">
            <div className="account-recovery-v2-illustration">
              <img src={pathToSuccess} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">
                <Trans>accountRecovery</Trans>
              </h1>
              <p className="card-v2-subtitle is-hidden-mobile">
                <Trans>accountRecoverySubtitle</Trans>
              </p>

              <Form
                onSubmit={accountRecovery}
                initialValues={{ email: '', recaptcha: '' }}
                validate={accountRecoveryValidor}
                render={(props: FormRenderProps<AccountRecoveryEntity>) => (
                  <AccountRecoveryFormV2
                    {...props}
                    isLoading={isAccountRecovering}
                  />
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

export default connector(AccountRecoveryV2);
