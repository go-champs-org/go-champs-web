import React from 'react';
import { TournamentPhaseEntity } from '../Phases/state';
import { TournamentEntity } from '../state';
import TopBreadcrumbs from './TopBreadcrumbs';
import TopLevel from './TopLevel';

const Top: React.FC<{
  organizationSlug: string;
  tournament: TournamentEntity;
  phase: TournamentPhaseEntity;
  phases: TournamentPhaseEntity[];
  tournamentSlug: string;
}> = ({ organizationSlug, tournament, phases, tournamentSlug, phase }) => (
  <div>
    <TopLevel
      phase={phase}
      organizationSlug={organizationSlug}
      tournament={tournament}
      tournamentSlug={tournamentSlug}
    />
    <TopBreadcrumbs phases={phases} tournamentSlug={tournamentSlug} />
  </div>
);

export default Top;
