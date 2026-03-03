import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  ApiBillingAgreement,
  ApiBillingContract
} from '../Shared/httpClient/apiTypes';
import MarkdownContent from '../Shared/UI/MarkdownContent';

interface ExistingBillingAgreementProps {
  agreement?: ApiBillingAgreement;
  billingContract?: ApiBillingContract;
  backUrl: string;
}

function ExistingBillingAgreement({
  agreement,
  backUrl,
  billingContract
}: ExistingBillingAgreementProps): React.ReactElement {
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
              <td>{agreement ? agreement.plan.name : '-'}</td>
            </tr>
            <tr>
              <th>
                <Trans>signedAt</Trans>
              </th>
              <td>
                {agreement && agreement.signed_at
                  ? new Date(agreement.signed_at).toLocaleString()
                  : '-'}
              </td>
            </tr>
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
