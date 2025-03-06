import React from 'react';
import { ResponseListProps } from './ResponseList';
import { RegistrationEntity, RegistrationResponseEntity } from './state';
import { parseRegistrationResponseFor } from './dataMappers';
import { Trans } from 'react-i18next';
import RegistrationResponseFieldDisplay from './RegistrationResponseFieldDisplay';
import RegistrationResponseStatusChip from './RegistrationResponseStatusChip';

function TeamRosterResponseRow({
  registration,
  registrationResponse
}: {
  registration: RegistrationEntity;
  registrationResponse: RegistrationResponseEntity;
}) {
  const { name, shirtName, shirtNumber } = parseRegistrationResponseFor(
    registration.type,
    registrationResponse
  );
  return (
    <tr key={registrationResponse.id}>
      <td style={{ paddingLeft: 0 }}>
        <RegistrationResponseStatusChip status={registrationResponse.status} />
      </td>
      <td>{name}</td>
      <td className="has-text-centered">{shirtName}</td>
      <td className="has-text-centered">{shirtNumber}</td>
      {registration.customFields.map(field => (
        <td key={field.id}>
          <RegistrationResponseFieldDisplay
            customField={field}
            registrationResponse={registrationResponse}
          />
        </td>
      ))}
    </tr>
  );
}

function TeamRosterResponses({
  registration,
  registrationInvite
}: ResponseListProps) {
  return (
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12">
          <h2 className="title">{registration.title}</h2>
          <span className="subtitle">
            Responses para{' '}
            {registrationInvite.invitee && registrationInvite.invitee.name}
          </span>
        </div>

        <div className="column is-12">
          <div className="table-container">
            <table className="table is-narrow is-fullwidth">
              <thead>
                <tr>
                  <th style={{ paddingLeft: 0 }}>Status</th>
                  <th>
                    <Trans>name</Trans>
                  </th>
                  <th className="has-text-centered">
                    <Trans>shirtName</Trans>
                  </th>
                  <th className="has-text-centered">
                    <Trans>shirtNumber</Trans>
                  </th>
                  {registration.customFields.map(field => (
                    <th key={field.id}>{field.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registrationInvite.registrationResponses.map(response => (
                  <TeamRosterResponseRow
                    key={response.id}
                    registrationResponse={response}
                    registration={registration}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamRosterResponses;
