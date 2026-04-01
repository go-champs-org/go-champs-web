import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiBillingContract } from '../Shared/httpClient/apiTypes';
import { BillingAgreementEntity } from './state';
import MarkdownContent from '../Shared/UI/MarkdownContent';
import { formatCurrency, parseAmount } from '../Shared/currencyUtils';

interface ExistingBillingAgreementProps {
  agreement?: BillingAgreementEntity;
  billingContract?: ApiBillingContract;
  backUrl: string;
}

function ExistingBillingAgreement({
  agreement,
  backUrl,
  billingContract
}: ExistingBillingAgreementProps): React.ReactElement {
  const { t } = useTranslation();
  const agreedAmount =
    agreement && agreement.agreedAmount
      ? parseAmount(agreement.agreedAmount)
      : null;
  return (
    <div className="column is-12">
      <div className="notification is-success">
        <h3 className="title is-5">
          <Trans>useAgreementAlreadyAccepted</Trans>
        </h3>
        <p>
          <Trans>agreementDetailsBelow</Trans>
        </p>
      </div>

      <div
        className="box"
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          marginBottom: '1rem'
        }}
      >
        {billingContract && billingContract.content ? (
          <MarkdownContent
            content={billingContract.content}
            className="content"
          />
        ) : (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}
      </div>

      <div className="box">
        <table className="table is-fullwidth">
          <tbody>
            <tr>
              <th>
                <Trans>plan</Trans>
              </th>
              <td>
                {agreement && agreement.plan && agreement.plan.name ? (
                  t(`plans.${agreement.plan.slug}.name`, agreement.plan.name, {
                    keySeparator: '.'
                  })
                ) : (
                  <Trans>noPlansAvailable</Trans>
                )}
              </td>
            </tr>
            <tr>
              <th>
                <Trans>amountPerGame</Trans>
              </th>
              <td>{agreedAmount && formatCurrency(agreedAmount, t)}</td>
            </tr>
            <tr>
              <th>
                <Trans>signedAt</Trans>
              </th>
              <td>
                {agreement && agreement.signedAt
                  ? new Date(agreement.signedAt).toLocaleString()
                  : '-'}
              </td>
            </tr>
            <tr>
              <th>
                <Trans>gamesRemaining</Trans>
              </th>
              <td>
                {agreement && agreement.gamesRemaining != null ? (
                  agreement.gamesRemaining
                ) : (
                  <Trans>unlimited</Trans>
                )}
              </td>
            </tr>
            {agreement && agreement.trialActive && (
              <tr>
                <th>
                  <Trans>trialActive</Trans>
                </th>
                <td>
                  <span className="tag is-light">
                    <Trans>isTrialTournament</Trans>
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link to={backUrl}>
        <button className="button is-small is-info is-outlined">
          <span className="icon">
            <i className="fas fa-caret-left"></i>
          </span>

          <span>
            <Trans>back</Trans>
          </span>
        </button>
      </Link>
    </div>
  );
}

export default ExistingBillingAgreement;
