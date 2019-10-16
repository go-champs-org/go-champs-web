import React from 'react';
import { Link } from 'react-router-dom';
import { TournamentPhaseEntity } from '../../Phases/state';

const TopBreadcrumbs: React.FC<{
  phases: TournamentPhaseEntity[];
  tournamentSlug: string;
}> = ({ phases, tournamentSlug }) => {
  return (
    <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        {phases.map((tournamentPhase: TournamentPhaseEntity) => (
          <li key={tournamentPhase.id}>
            <Link to={`./${tournamentSlug}/phase/${tournamentPhase.id}`}>
              {tournamentPhase.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopBreadcrumbs;
