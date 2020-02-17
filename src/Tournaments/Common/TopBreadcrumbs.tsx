import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity } from '../../Phases/state';
import AdminWrapper, { NotAdminWrapper } from '../../Shared/UI/AdminWrapper';

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
            <NotAdminWrapper>
              <Link
                to={`/${organizationSlug}/${tournamentSlug}/Phase/${phase.id}`}
              >
                {phase.title}
              </Link>
            </NotAdminWrapper>
            <AdminWrapper>
              <Link
                to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}`}
              >
                {phase.title}
              </Link>
            </AdminWrapper>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopBreadcrumbs;
