import React from 'react';
import { Trans } from 'react-i18next';
import { Field, FormRenderProps } from 'react-final-form';
import { Link } from 'react-router-dom';
import BehindFeatureFlag from '../Shared/UI/BehindFeatureFlag';
import LoadingButton from '../Shared/UI/LoadingButton';

export interface BillingFormData {
  acceptedTerms: boolean;
  plan_id?: string;
  campaign_slug?: string;
  due_day?: number;
}

interface BillingAgreementFormProps extends FormRenderProps<BillingFormData> {
  backUrl: string;
  isSubmitting: boolean;
  showSuccess: boolean;
}

function BillingAgreementForm({
  backUrl,
  isSubmitting,
  showSuccess,
  handleSubmit,
  values,
  errors,
  submitFailed,
  submitError
}: BillingAgreementFormProps): React.ReactElement {
  return (
    <div className="column is-12">
      {showSuccess && (
        <div className="notification is-success">
          <Trans>billingAgreementAcceptedSuccessfully</Trans>
          <br />
          <Trans>redirectingToTournamentEdit</Trans>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          className="box"
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            marginBottom: '1rem'
          }}
        >
          <h3 className="title is-5">
            <Trans>billingContractTerms</Trans>
          </h3>
          <div className="content">
            <p>
              <strong>BILLING AGREEMENT - STANDARD TERMS v2.0</strong>
            </p>
            <p>
              This Billing Agreement ("Agreement") is entered into between Go
              Champs ("Service Provider") and the organization utilizing the
              tournament management services ("Client").
            </p>
            <h4>1. Services</h4>
            <p>
              Service Provider agrees to provide tournament management software
              services as described in the selected plan. Services include but
              are not limited to: tournament creation, team management,
              scheduling, and statistics tracking.
            </p>
            <h4>2. Payment Terms</h4>
            <p>
              Client agrees to pay the fees associated with the selected plan on
              the specified due day of each billing period. Payment methods
              accepted include credit card, debit card, and other methods as
              specified by Service Provider.
            </p>
            <h4>3. Billing Cycle</h4>
            <p>
              Billing will occur monthly on the due day specified in this
              agreement. If the due day falls on a day that does not exist in a
              given month, billing will occur on the last day of that month.
            </p>
            <h4>4. Late Payment</h4>
            <p>
              Late payments may result in service suspension until payment is
              received. A grace period of 5 days will be provided before any
              service interruption occurs.
            </p>
            <h4>5. Cancellation</h4>
            <p>
              Either party may terminate this agreement with 30 days written
              notice. Client will be responsible for payment through the end of
              the notice period.
            </p>
            <h4>6. Data Retention</h4>
            <p>
              Upon termination, tournament data will be retained for 90 days to
              allow for export. After this period, data may be permanently
              deleted.
            </p>
            <h4>7. Changes to Terms</h4>
            <p>
              Service Provider reserves the right to modify these terms with 30
              days notice to Client. Continued use of services after
              notification constitutes acceptance of modified terms.
            </p>
            <h4>8. Governing Law</h4>
            <p>
              This agreement shall be governed by the laws of the country
              specified in the billing information. The country code will be
              automatically determined based on your browser settings.
            </p>
          </div>
        </div>

        <BehindFeatureFlag>
          <div className="field">
            <label className="label">
              <Trans>plan</Trans>
            </label>
            <div className="control">
              <Field name="plan_id" component="select" className="input">
                <option value="premium-monthly">Premium Monthly</option>
                <option value="basic-monthly">Basic Monthly</option>
                <option value="enterprise-monthly">Enterprise Monthly</option>
              </Field>
            </div>
          </div>

          <div className="field">
            <label className="label">
              <Trans>campaign</Trans>
            </label>
            <div className="control">
              <Field
                name="campaign_slug"
                component="input"
                type="text"
                className="input"
                placeholder="e.g., summer-2026"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              <Trans>dueDay</Trans>
            </label>
            <div className="control">
              <Field
                name="due_day"
                component="input"
                type="number"
                className="input"
                min="1"
                max="31"
              />
            </div>
          </div>
        </BehindFeatureFlag>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <Field name="acceptedTerms" component="input" type="checkbox" />{' '}
              <Trans>iAcceptTheTermsAndConditions</Trans>
            </label>
            {errors && errors.acceptedTerms && submitFailed && (
              <p className="help is-danger">{errors.acceptedTerms}</p>
            )}
          </div>
        </div>

        {submitError && (
          <div className="notification is-danger">{submitError}</div>
        )}

        <div className="field is-grouped">
          <div className="control">
            <LoadingButton
              isLoading={isSubmitting || showSuccess}
              className="button is-primary"
              disabled={!values.acceptedTerms || isSubmitting || showSuccess}
            >
              <Trans>acceptAndSubmit</Trans>
            </LoadingButton>
          </div>
          <div className="control">
            <Link to={backUrl} className="button is-light">
              <Trans>cancel</Trans>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BillingAgreementForm;
