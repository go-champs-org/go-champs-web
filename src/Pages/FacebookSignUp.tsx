import React from 'react';
import { Trans } from 'react-i18next';
import { Form, FormRenderProps } from 'react-final-form';
import FacebookSignUpForm, {
  signUpValidor
} from '../Accounts/FacebookSignUpForm';
import { FacebookSignUpEntity } from '../Accounts/entity';
import { StoreState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { isSigingUp } from '../Accounts/selectors';
import { Dispatch, bindActionCreators } from 'redux';
import { facebookSignUp } from '../Accounts/effects';
import { connect, ConnectedProps } from 'react-redux';

const mapStateToProps = (state: StoreState, props: RouteComponentProps) => ({
  isSigingUp: isSigingUp(state.account),
  history: props.history,
  location: props.location
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  { history }: RouteComponentProps
) =>
  bindActionCreators(
    {
      facebookSignUp: (user: FacebookSignUpEntity) =>
        facebookSignUp(user, history)
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type FacebookSignUpProps = ConnectedProps<typeof connector>;

function FacebookSignUp({
  facebookSignUp,
  isSigingUp,
  location
}: FacebookSignUpProps): React.ReactElement {
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email') || '';
  const facebookId = searchParams.get('facebookId') || '';

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
                onSubmit={facebookSignUp}
                initialValues={{
                  email,
                  facebookId,
                  recaptcha: '',
                  username: ''
                }}
                validate={signUpValidor}
                render={(props: FormRenderProps<FacebookSignUpEntity>) => (
                  <FacebookSignUpForm {...props} isLoading={isSigingUp} />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connector(FacebookSignUp);
