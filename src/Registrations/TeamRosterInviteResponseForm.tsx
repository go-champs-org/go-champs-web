import React from 'react';
import { Field, FormRenderProps } from 'react-final-form';
import { Trans } from 'react-i18next';
import StringInput from '../Shared/UI/Form/StringInput';
import LoadingButton from '../Shared/UI/LoadingButton';
import Shimmer from '../Shared/UI/Shimmer';
import { RegistrationResponseEntity } from './state';
import {
  composeValidators,
  mustBeEmail,
  required
} from '../Shared/UI/Form/Validators/commonValidators';
import './TeamRosterInviteResponseForm.scss';

export function Success() {
  return (
    <div
      className="card"
      style={{
        maxWidth: '380px',
        margin: 'auto',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div className="card-content">
        <div className="columns is-multiline">
          <div className="column is-12 has-text-centered">
            <span className="title is-4">
              <Trans>registrationFormSuccessMsg</Trans>
            </span>
          </div>
          <div className="column is-12 has-text-centered">
            <i className="fas fa-check-circle fa-4x success-icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoadingForm() {
  return (
    <div className="container has-text-centered">
      <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
        <div className="card-content">
          <div className="columns is-multiline">
            <div className="column is-12">
              <label className="label">
                <Trans>name</Trans>
              </label>
              <Shimmer>
                <div
                  style={{
                    height: '13px',
                    marginTop: '13px',
                    width: '250px'
                  }}
                ></div>
              </Shimmer>
            </div>

            <div className="column is-12">
              <label className="label">
                <Trans>email</Trans>
              </label>

              <Shimmer>
                <div
                  style={{
                    height: '13px',
                    marginTop: '13px',
                    width: '250px'
                  }}
                ></div>
              </Shimmer>
            </div>

            <div className="column is-12">
              <label className="label">
                <Trans>shirtName</Trans>
              </label>

              <Shimmer>
                <div
                  style={{
                    height: '13px',
                    marginTop: '13px',
                    width: '250px'
                  }}
                ></div>
              </Shimmer>
            </div>

            <div className="column is-12">
              <label className="label">
                <Trans>shirtNumber</Trans>
              </label>

              <Shimmer>
                <div
                  style={{
                    height: '13px',
                    marginTop: '13px',
                    width: '250px'
                  }}
                ></div>
              </Shimmer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamRosterInviteResponseForm({
  handleSubmit,
  submitting,
  pristine,
  form: { reset },
  valid
}: FormRenderProps<RegistrationResponseEntity>) {
  return (
    <div className="container has-text-centered">
      <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
        <div className="card-content">
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">
                <Trans>name</Trans>
              </label>

              <div className="control">
                <Field
                  name="response.name"
                  className="has-text-centered"
                  component={StringInput}
                  validate={composeValidators([required])}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>email</Trans>
              </label>

              <div className="control">
                <Field
                  name="response.email"
                  className="has-text-centered"
                  component={StringInput}
                  validate={composeValidators([required, mustBeEmail])}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>shirtName</Trans>
              </label>

              <div className="control">
                <Field
                  name="response.shirt_name"
                  className="has-text-centered"
                  component={StringInput}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>shirtNumber</Trans>
              </label>

              <div className="control">
                <Field
                  name="response.shirt_number"
                  className="has-text-centered"
                  component={StringInput}
                />
              </div>
            </div>

            <LoadingButton
              isLoading={submitting}
              className="button is-primary is-fullwidth"
              type="submit"
              style={{ marginBottom: '1rem', marginTop: '2rem' }}
              disabled={submitting || pristine || !valid}
            >
              <Trans>send</Trans>
            </LoadingButton>

            <button
              className="button is-outlined is-fullwidth"
              style={{ marginTop: '1rem' }}
              onClick={() => reset()}
            >
              <Trans>clean</Trans>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamRosterInviteResponseForm;
