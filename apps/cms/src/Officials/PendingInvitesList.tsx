import React from 'react';
import { Trans } from 'react-i18next';
import { ApiOfficialInviteWithDetails } from '../Shared/httpClient/apiTypes';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import './PendingInvitesList.scss';

interface PendingInvitesListProps {
  invites: ApiOfficialInviteWithDetails[];
  onDelete: (inviteId: string) => void;
}

const PendingInviteCard: React.FC<{
  invite: ApiOfficialInviteWithDetails;
  onDelete: (inviteId: string) => void;
}> = ({ invite, onDelete }) => (
  <div className="card item pending-invite-card">
    <div className="card-header">
      <div className="card-header-title">
        <div className="invite-info">
          <span className="title is-6">
            {invite.invitee.name || invite.invitee.username}
          </span>
          {invite.invitee.category && (
            <span className="category-text">
              <Trans>category</Trans>: {invite.invitee.category}
            </span>
          )}
        </div>
      </div>

      <div className="card-header-icon">
        <span className="tag is-warning">
          <Trans>pending</Trans>
        </span>
        <DoubleClickButton
          className="button is-text"
          onClick={() => onDelete(invite.id)}
        >
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </div>
    </div>
  </div>
);

const PendingInvitesList: React.FC<PendingInvitesListProps> = ({
  invites,
  onDelete
}) => {
  if (invites.length === 0) {
    return null;
  }

  return (
    <div className="pending-invites-list">
      <h3 className="subtitle is-6">
        <Trans>pendingOfficialInvites</Trans>
      </h3>
      <div>
        {invites.map(invite => (
          <PendingInviteCard
            key={invite.id}
            invite={invite}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingInvitesList;
