import React from 'react';
import { RegistrationEntity } from './state';
import { TeamsMap } from '../Teams/state';

export interface InvitationListProps {
  organizationSlug: string;
  tournamentSlug: string;
  registration: RegistrationEntity;
  teamsMap: TeamsMap;
}

const INVITATION_LIST: {
  [key: string]: React.ComponentType<InvitationListProps>;
} = {
  team_roster_invites: React.lazy(() => import('./TeamRosterInvites'))
};

function InvitationList({
  organizationSlug,
  tournamentSlug,
  registration,
  teamsMap
}: InvitationListProps) {
  const Component = INVITATION_LIST[registration.type];

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component
        organizationSlug={organizationSlug}
        tournamentSlug={tournamentSlug}
        registration={registration}
        teamsMap={teamsMap}
      />
    </React.Suspense>
  );
}

export default InvitationList;
