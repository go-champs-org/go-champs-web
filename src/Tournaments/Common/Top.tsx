import React from 'react';
import { TournamentEntity } from '../state';
import TopBreadcrumbs from './TopBreadcrumbs';
import TopLevel from './TopLevel';

const Top: React.FC<{
  organizationSlug: string;
  tournament: TournamentEntity;
  tournamentSlug: string;
}> = ({ organizationSlug, tournament, tournamentSlug }) => (
  <div>
    <TopLevel
      organizationSlug={organizationSlug}
      tournament={tournament}
      tournamentSlug={tournamentSlug}
    />
    <TopBreadcrumbs />
  </div>
);

export default Top;
