import React from 'react';

import { InvitationListProps } from './InvitationList';
import { RegistrationInvityEntity } from './state';
import { TeamsMap } from '../Teams/state';
import { mapRegistrationInviteUrl } from './dataMappers';
import { Trans } from 'react-i18next';

function TeamRosterInviteRow({
  registrationInvite,
  teamsMap
}: {
  registrationInvite: RegistrationInvityEntity;
  teamsMap: TeamsMap;
}) {
  const inviteUrl = mapRegistrationInviteUrl(registrationInvite);
  const handleCopyClick = () => {
    navigator.clipboard.writeText(inviteUrl);
  };
  return (
    <tr>
      <td style={{ paddingLeft: 0, verticalAlign: 'middle' }}>
        {teamsMap[registrationInvite.inviteeId]
          ? teamsMap[registrationInvite.inviteeId].name
          : ''}
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

function TeamRosterInvites({ registration, teamsMap }: InvitationListProps) {
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
