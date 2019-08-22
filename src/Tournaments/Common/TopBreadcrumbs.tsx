import React from 'react';
import { byOrder } from '../Phases/compareFunctions';
import { TournamentPhaseEntity } from '../Phases/state';

const TopBreadcrumbs: React.FC<{
  tournamentPhases: { [key: string]: TournamentPhaseEntity };
}> = ({ tournamentPhases }) => {
  return (
    <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        {Object.keys(tournamentPhases)
          .map((key: string) => tournamentPhases[key])
          .sort(byOrder)
          .map((tournamentPhase: TournamentPhaseEntity) => (
            <li>
              <a href={`./phases/${tournamentPhase.id}`}>
                {tournamentPhase.title}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default TopBreadcrumbs;
