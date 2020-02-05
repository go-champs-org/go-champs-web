import React from 'react';
import { PhaseEntity } from '../../Phases/state';
import { TournamentEntity } from '../state';
import TopBreadcrumbs from './TopBreadcrumbs';

const Top: React.FC<{
  organizationSlug: string;
  tournament: TournamentEntity;
  phase: PhaseEntity;
  phases: PhaseEntity[];
  tournamentSlug: string;
}> = ({ phases, tournamentSlug }) => (
  <div>
    <TopBreadcrumbs phases={phases} tournamentSlug={tournamentSlug} />
  </div>
);

export default Top;
