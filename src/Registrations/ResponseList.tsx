import React from 'react';
import { RegistrationEntity, RegistrationInviteEntity } from './state';
import Shimmer from '../Shared/UI/Shimmer';
import LoadingTable from '../Shared/LoadingTable';

export function Loading() {
  return (
    <div className="columns is-multiline">
      <div className="column is-12">
        <Shimmer>
          <div
            style={{
              height: '20px',
              marginTop: '20px',
              width: '200px'
            }}
          ></div>
        </Shimmer>
      </div>
      <div className="column is-12">
        <LoadingTable />
      </div>
    </div>
  );
}

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
    <React.Suspense fallback={<Loading />}>
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
