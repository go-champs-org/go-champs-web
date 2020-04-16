import React from 'react';
import { Form } from 'react-final-form';
import SignUpForm from '../Accounts/SignUpForm';

const SignUp: React.FC = () => (
  <div className="container has-text-centered">
    <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
      <div className="card-content">
        <div className="columns is-multiline">
          <div className="column is-12">
            <p className="title has-text-centered">Sign in</p>
          </div>

          <div className="column is-12">
            <Form
              onSubmit={() => {
                '';
              }}
              initialValues={{ email: '', password: '', repeatedPassword: '' }}
              component={SignUpForm}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SignUp;
