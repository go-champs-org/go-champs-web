import React from 'react';
import {
  RegistrationEntity,
  RegistrationInviteEntity,
  RegistrationResponseEntity
} from './state';
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
  putRegistrationResponseApprove: (
    registrationResponses: RegistrationResponseEntity[],
    registrationInvite: RegistrationInviteEntity
  ) => void;
  isApprovingRegistrationResponses: boolean;
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
  isApprovingRegistrationResponses,
  organizationSlug,
  putRegistrationResponseApprove,
  tournamentSlug,
  registration,
  registrationInvite
}: ResponseListProps) {
  const Component = RESPONSES_LIST[registration.type];

  return (
    <React.Suspense fallback={<Loading />}>
      <Component
        isApprovingRegistrationResponses={isApprovingRegistrationResponses}
        organizationSlug={organizationSlug}
        putRegistrationResponseApprove={putRegistrationResponseApprove}
        tournamentSlug={tournamentSlug}
        registration={registration}
        registrationInvite={registrationInvite}
      />
    </React.Suspense>
  );
}

export default ResponseList;
