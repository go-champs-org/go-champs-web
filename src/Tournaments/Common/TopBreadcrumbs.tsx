import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity } from '../../Phases/state';
import {
  AuthenticatedAndMemberWrapper,
  NotMemberWrapper
} from '../../Shared/UI/AdminWrapper';
import { OrganizationEntity } from '../../Organizations/state';

const TopBreadcrumbs: React.FC<{
  organization: OrganizationEntity;
  organizationSlug: string;
  phases: PhaseEntity[];
  tournamentSlug: string;
}> = ({ organization, organizationSlug, phases, tournamentSlug }) => {
  return (
    <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        {phases.map((phase: PhaseEntity) => (
          <li key={phase.id}>
            <NotMemberWrapper organization={organization}>
              <Link
                to={`/${organizationSlug}/${tournamentSlug}/Phase/${phase.id}`}
              >
                {phase.title}
              </Link>
            </NotMemberWrapper>

            <AuthenticatedAndMemberWrapper organization={organization}>
              <Link
                to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}`}
              >
                {phase.title}
              </Link>
            </AuthenticatedAndMemberWrapper>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopBreadcrumbs;
