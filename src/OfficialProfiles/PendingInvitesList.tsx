import React from 'react';
import { Trans } from 'react-i18next';
import { ApiOfficialInviteWithDetails } from '../Shared/httpClient/apiTypes';
import './PendingInvitesList.scss';

interface PendingInvitesListProps {
  invites: ApiOfficialInviteWithDetails[];
  onApprove: (inviteId: string) => void;
  isApproving: boolean;
}

const PendingInviteCard: React.FC<{
  invite: ApiOfficialInviteWithDetails;
  onApprove: (inviteId: string) => void;
  isApproving: boolean;
}> = ({ invite, onApprove, isApproving }) => {
  const tournament =
    invite.registration !== undefined &&
    invite.registration.tournament !== undefined
      ? invite.registration.tournament
      : { name: '', organization: { name: '' } };
  const tournamentName = tournament.name || '';

  return (
    <div className="card item pending-invite-card">
      <div className="card-header">
        <div className="card-header-title">
          <div className="invite-info">
            <span className="title is-6">{tournamentName}</span>
          </div>
        </div>

        <div className="card-header-icon">
          <button
            className={`button is-small is-success ${
              isApproving ? 'is-loading' : ''
            }`}
            onClick={() => onApprove(invite.id)}
            disabled={isApproving}
          >
            <Trans>approve</Trans>
          </button>
        </div>
      </div>
    </div>
  );
};

const PendingInvitesList: React.FC<PendingInvitesListProps> = ({
  invites,
  onApprove,
  isApproving
}) => {
  if (invites.length === 0) {
    return null;
  }

  return (
    <div className="pending-invites-list">
      <h3 className="subtitle is-6">
        <Trans>pendingInvites</Trans>
      </h3>
      <div>
        {invites.map(invite => (
          <PendingInviteCard
            key={invite.id}
            invite={invite}
            onApprove={onApprove}
            isApproving={isApproving}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingInvitesList;
