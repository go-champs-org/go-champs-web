import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity } from '../../Phases/state';
import AuthenticatedWrapper, {
  NotAuthenticatedWrapper
} from '../../Shared/UI/AdminWrapper';

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
            <NotAuthenticatedWrapper>
              <Link
                to={`/${organizationSlug}/${tournamentSlug}/Phase/${phase.id}`}
              >
                {phase.title}
              </Link>
            </NotAuthenticatedWrapper>

            <AuthenticatedWrapper>
              <Link
                to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}`}
              >
                {phase.title}
              </Link>
            </AuthenticatedWrapper>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopBreadcrumbs;
