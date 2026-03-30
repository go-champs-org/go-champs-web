import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { StoreState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { accountReset } from '../../Accounts/effects';
import { AccountResetEntity } from '../../Accounts/entity';
import { isResetingPassword } from '../../Accounts/selectors';
import { accountResetValidor } from '../../Accounts/ResetForm';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import AccountResetFormV2 from '../../Accounts/AccountResetFormV2';
import smartphone from '../../assets/illustrations/smartphone.svg';
import { Trans } from 'react-i18next';
import './AccountResetV2.scss';

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

type AccountResetV2Props = ConnectedProps<typeof connector>;

function AccountResetV2({
  isResetingPassword,
  accountReset
}: AccountResetV2Props): React.ReactElement {
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const username = urlSearch.get('username') || '';
  const recoveryToken = urlSearch.get('token') || '';

  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main account-reset-v2-page">
          <div className="page-v2-container">
            <div className="account-reset-v2-illustration">
              <img src={smartphone} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">
                <Trans>accountReset</Trans>
              </h1>
              <p className="card-v2-subtitle is-hidden-mobile">
                <Trans>accountResetSubtitle</Trans>
              </p>

              <Form
                onSubmit={accountReset}
                initialValues={{
                  password: '',
                  repeatedPassword: '',
                  recoveryToken,
                  recaptcha: '',
                  username
                }}
                validate={accountResetValidor}
                render={(props: FormRenderProps<AccountResetEntity>) => (
                  <AccountResetFormV2
                    {...props}
                    isLoading={isResetingPassword}
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

export default connector(AccountResetV2);
