import React from 'react';

import { InvitationListProps } from './InvitationList';
import { RegistrationInviteEntity } from './state';
import { TeamsMap } from '../Teams/state';
import { mapRegistrationInviteUrl } from './dataMappers';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

function TeamRosterInviteRow({
  registrationInviteManagerBaseUrl,
  registrationInvite,
  teamsMap
}: {
  registrationInvite: RegistrationInviteEntity;
  registrationInviteManagerBaseUrl: string;
  teamsMap: TeamsMap;
}) {
  const inviteUrl = mapRegistrationInviteUrl(registrationInvite);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(inviteUrl);
  };
  const registrationInviteManagerUrl = `${registrationInviteManagerBaseUrl}/Invite/${registrationInvite.id}`;
  return (
    <tr>
      <td style={{ paddingLeft: 0, verticalAlign: 'middle' }}>
        <Link to={registrationInviteManagerUrl} className="has-text-danger">
          {teamsMap[registrationInvite.inviteeId]
            ? teamsMap[registrationInvite.inviteeId].name
            : ''}
        </Link>
      </td>
      <td className="has-text-centered">
        <button className="button is-small" onClick={handleCopyClick}>
          <span className="icon is-small">
            <i className="fas fa-copy"></i>
          </span>
        </button>
      </td>
    </tr>
  );
}

function TeamRosterInvites({
  registration,
  teamsMap,
  organizationSlug,
  tournamentSlug
}: InvitationListProps) {
  const registrationInviteManagerBaseUrl = `/${organizationSlug}/${tournamentSlug}/RegistrationInvites/${registration.id}`;
  return (
    <div className="container">
      <div className="table-container">
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th style={{ paddingLeft: 0 }}>
                <Trans>team</Trans>
              </th>
              <th className="has-text-centered">
                <Trans>copyLink</Trans>
              </th>
            </tr>
          </thead>
          <tbody>
            {registration.registrationInvites.map(invitation => (
              <TeamRosterInviteRow
                key={invitation.id}
                registrationInvite={invitation}
                registrationInviteManagerBaseUrl={
                  registrationInviteManagerBaseUrl
                }
                teamsMap={teamsMap}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamRosterInvites;
