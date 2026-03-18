import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { signIn } from '../../Accounts/effects';
import { SignInEntity } from '../../Accounts/entity';
import { isSigingIn } from '../../Accounts/selectors';
import { ThemeV2Provider } from '../../ThemeV2';
import NavBar from '../Shared/NavBar';
import Footer from '../Shared/Footer';
import CardV2 from '../Shared/CardV2';
import SignInFormV2 from '../../Accounts/SignInFormV2';
import guyJumpingOnSmartphone from '../../assets/illustrations/guy-jumping-on-smartphone.svg';
import { Trans } from 'react-i18next';
import './SignInV2.scss';

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

type SignInV2Props = ConnectedProps<typeof connector>;

function SignInV2({ isSigingIn, signIn }: SignInV2Props): React.ReactElement {
  return (
    <ThemeV2Provider>
      <div className="page-v2-wrapper">
        <NavBar />
        <main className="page-v2-main signin-v2-page">
          <div className="page-v2-container">
            <div className="signin-v2-illustration">
              <img src={guyJumpingOnSmartphone} alt="" aria-hidden="true" />
            </div>

            <CardV2>
              <h1 className="card-v2-title">
                <Trans>signInTitle</Trans>
              </h1>
              <p className="card-v2-subtitle is-hidden-mobile">
                <Trans>signInSubtitle</Trans>
              </p>

              <Form
                onSubmit={signIn}
                initialValues={{ username: '', password: '' }}
                render={(props: FormRenderProps<SignInEntity>) => (
                  <SignInFormV2 {...props} isLoading={isSigingIn} />
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

export default connector(SignInV2);
