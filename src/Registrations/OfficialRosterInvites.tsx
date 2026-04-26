import React from 'react';
import { RegistrationEntity } from './state';

export interface OfficialRosterInvitesProps {
  organizationSlug: string;
  tournamentSlug: string;
  registration: RegistrationEntity;
}

function OfficialRosterInvites({
  organizationSlug,
  tournamentSlug,
  registration
}: OfficialRosterInvitesProps) {
  return (
    <div>
      <h2>Official Roster Invites</h2>
      {/* Implement the UI for official roster invites here */}
    </div>
  );
}

export default OfficialRosterInvites;
