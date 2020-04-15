import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import SingInForm from '../Accounts/SignInForm';
import { StoreState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { signIn } from '../Accounts/effects';
import { UserEntity } from '../Accounts/entity';
import { isSigingIn } from '../Accounts/selectors';

const mapStateToProps = (state: StoreState) => ({
  isSigingIn: isSigingIn(state.account)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      signIn
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type SignInProps = ConnectedProps<typeof connector>;

const SignIn: React.FC<SignInProps> = ({ isSigingIn, signIn }) => (
  <div className="container has-text-centered">
    <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
      <div className="card-content">
        <div className="columns is-multiline">
          <div className="column is-12">
            <p className="title has-text-centered">Sign in</p>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={signIn}
              initialValues={{ email: '', password: '' }}
              render={(props: FormRenderProps<UserEntity>) => (
                <SingInForm {...props} isLoading={isSigingIn} />
              )}
            />
          </div>

          <div className="column is-12">
            <Link to="/SignUp" className="button is-text">
              Ou cria uma conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default connector(SignIn);
