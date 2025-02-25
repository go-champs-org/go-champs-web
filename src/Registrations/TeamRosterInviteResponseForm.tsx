import React from 'react';
import { Field } from 'react-final-form';
import { Trans } from 'react-i18next';
import StringInput from '../Shared/UI/Form/StringInput';
import LoadingButton from '../Shared/UI/LoadingButton';
import Shimmer from '../Shared/UI/Shimmer';

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

function TeamRosterInviteResponseForm() {
  return (
    <div className="container has-text-centered">
      <div className="card" style={{ maxWidth: '380px', margin: 'auto' }}>
        <div className="card-content">
          <form className="form">
            <div className="field">
              <label className="label">
                <Trans>name</Trans>
              </label>

              <div className="control">
                <Field name="name" component={StringInput} />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>email</Trans>
              </label>

              <div className="control">
                <Field name="email" component={StringInput} />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>shirtName</Trans>
              </label>

              <div className="control">
                <Field name="shirtName" component={StringInput} />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <Trans>shirtNumber</Trans>
              </label>

              <div className="control">
                <Field name="shirtNumber" component={StringInput} />
              </div>
            </div>

            <div className="field">
              <label className="label">Instagram</label>
              <div className="control">
                <Field
                  name="instagram"
                  component={StringInput}
                  type="text"
                  placeholder="www.instagram.com/your-tournament"
                />
              </div>

              {/* <p className="help is-info">
                        {`https://www.instagram.com/${values.instagram ? values.instagram : ''
                            }`}
                    </p> */}
            </div>

            <LoadingButton
              isLoading={false}
              className="button is-primary is-fullwidth"
              type="submit"
              style={{ marginBottom: '1rem', marginTop: '2rem' }}
              //   disabled={submitting || pristine}
            >
              <Trans>send</Trans>
            </LoadingButton>

            <button
              className="button is-outlined is-fullwidth"
              style={{ marginTop: '1rem' }}
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
