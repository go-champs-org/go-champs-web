import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ApiBillingAgreement } from '../Shared/httpClient/apiTypes';

interface ExistingBillingAgreementProps {
  agreement: ApiBillingAgreement | null;
  backUrl: string;
}

function ExistingBillingAgreement({
  agreement,
  backUrl
}: ExistingBillingAgreementProps): React.ReactElement {
  return (
    <div className="column is-12">
      <div className="notification is-success">
        <h3 className="title is-5">
          <Trans>billingAgreementAlreadyAccepted</Trans>
        </h3>
        <p>
          <Trans>agreementDetailsBelow</Trans>
        </p>
      </div>

      <div className="box">
        <table className="table is-fullwidth">
          <tbody>
            <tr>
              <th>
                <Trans>planId</Trans>
              </th>
              <td>{agreement ? agreement.plan_id : '-'}</td>
            </tr>
            <tr>
              <th>
                <Trans>campaignSlug</Trans>
              </th>
              <td>{agreement ? agreement.campaign_slug : '-'}</td>
            </tr>
            <tr>
              <th>
                <Trans>dueDay</Trans>
              </th>
              <td>{agreement ? agreement.due_day : '-'}</td>
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
            <tr>
              <th>
                <Trans>billingContractSlug</Trans>
              </th>
              <td>{agreement ? agreement.billing_contract_slug : '-'}</td>
            </tr>
            <tr>
              <th>
                <Trans>countryCode</Trans>
              </th>
              <td>{agreement ? agreement.country_code : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="column is-12">
        <Link to={backUrl}>
          <button className="button is-primary">
            <Trans>backToTournamentEdit</Trans>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ExistingBillingAgreement;
