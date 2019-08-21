import React from 'react';
import { TournamentPhaseEntity } from '../Phases/state';

const TopBreadcrumbs: React.FC<{
  tournamentPhases: { [key: string]: TournamentPhaseEntity };
}> = ({ tournamentPhases }) => {
  return (
    <nav className="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
      <ul>
        <li>
          <a href="#">Bulma</a>
        </li>
        <li>
          <a href="#">Documentation</a>
        </li>
        <li>
          <a href="#">Components</a>
        </li>
        <li className="is-active">
          <a href="#" aria-current="page">
            Breadcrumb
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default TopBreadcrumbs;
