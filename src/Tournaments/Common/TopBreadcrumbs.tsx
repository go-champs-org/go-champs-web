import React from 'react';
import { Link } from 'react-router-dom';
import { byOrder } from '../Phases/compareFunctions';
import { TournamentPhaseEntity } from '../Phases/state';

const TopBreadcrumbs: React.FC<{
  tournamentPhases: { [key: string]: TournamentPhaseEntity };
  tournamentSlug: string;
}> = ({ tournamentPhases, tournamentSlug }) => {
  return (
    <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        {Object.keys(tournamentPhases)
          .map((key: string) => tournamentPhases[key])
          .sort(byOrder)
          .map((tournamentPhase: TournamentPhaseEntity) => (
            <li>
              <Link to={`./${tournamentSlug}/phases/${tournamentPhase.id}`}>
                {tournamentPhase.title}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default TopBreadcrumbs;
