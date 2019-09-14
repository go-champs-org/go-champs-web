import React from 'react';
import { TournamentPhaseEntity } from '../Phases/state';
import { TournamentEntity } from '../state';
import TopBreadcrumbs from './TopBreadcrumbs';
import TopLevel from './TopLevel';

const Top: React.FC<{
  organizationSlug: string;
  tournament: TournamentEntity;
  tournamentPhases: { [key: string]: TournamentPhaseEntity };
  phase: TournamentPhaseEntity;
  tournamentSlug: string;
}> = ({
  organizationSlug,
  tournament,
  tournamentPhases,
  tournamentSlug,
  phase
}) => (
  <div>
    <TopLevel
      phase={phase}
      organizationSlug={organizationSlug}
      tournament={tournament}
      tournamentSlug={tournamentSlug}
    />
    <TopBreadcrumbs
      tournamentPhases={tournamentPhases}
      tournamentSlug={tournamentSlug}
    />
  </div>
);

export default Top;
