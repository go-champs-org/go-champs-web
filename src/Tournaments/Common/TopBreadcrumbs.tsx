import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity } from '../../Phases/state';

const TopBreadcrumbs: React.FC<{
  organizationSlug: string;
  phases: PhaseEntity[];
  tournamentSlug: string;
}> = ({ organizationSlug, phases, tournamentSlug }) => {
  return (
    <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        {phases.map((phase: PhaseEntity) => (
          <li key={phase.id}>
            <Link
              to={`/${organizationSlug}/${tournamentSlug}/Phase/${phase.id}`}
            >
              {phase.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopBreadcrumbs;
