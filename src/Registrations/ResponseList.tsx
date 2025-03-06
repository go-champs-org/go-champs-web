import React from 'react';
import { RegistrationEntity, RegistrationInviteEntity } from './state';

export interface ResponseListProps {
  organizationSlug: string;
  tournamentSlug: string;
  registration: RegistrationEntity;
  registrationInvite: RegistrationInviteEntity;
}

const RESPONSES_LIST: {
  [key: string]: React.ComponentType<ResponseListProps>;
} = {
  team_roster_invites: React.lazy(() => import('./TeamRosterResponses'))
};

function ResponseList({
  organizationSlug,
  tournamentSlug,
  registration,
  registrationInvite
}: ResponseListProps) {
  const Component = RESPONSES_LIST[registration.type];

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component
        organizationSlug={organizationSlug}
        tournamentSlug={tournamentSlug}
        registration={registration}
        registrationInvite={registrationInvite}
      />
    </React.Suspense>
  );
}

export default ResponseList;
