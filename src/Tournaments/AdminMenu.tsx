import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity, PhaseTypes } from '../Phases/state';

interface AdminMenuProps {
  organizationSlug: string;
  phase?: PhaseEntity;
  tournamentSlug: string;
}

interface AdminPhaseMenuProps {
  organizationSlug: string;
  phase: PhaseEntity;
  tournamentSlug: string;
}

const AdminPhaseMenu: React.FC<AdminPhaseMenuProps> = ({
  organizationSlug,
  phase,
  tournamentSlug
}) => {
  const DrawMenu = (
    <Fragment>
      <p className="menu-label">Draw info</p>
      <ul className="menu-list">
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}/Games`}
          >
            Games
          </Link>
        </li>
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}/Draws`}
          >
            Rounds
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  const EliminationMenu = (
    <Fragment>
      <p className="menu-label">Elimination info</p>
      <ul className="menu-list">
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}/Games`}
          >
            Games
          </Link>
        </li>
        <li>
          <Link
            to={`/${organizationSlug}/${tournamentSlug}/Manage/${phase.id}/Eliminations`}
          >
            Eliminations
          </Link>
        </li>
      </ul>
    </Fragment>
  );
  return (
    <Fragment>
      {phase.type === PhaseTypes.draw ? DrawMenu : EliminationMenu}
    </Fragment>
  );
};

const AdminMenu: React.FC<AdminMenuProps> = ({
  organizationSlug,
  phase,
  tournamentSlug
}) => {
  const PhaseMenu = phase ? (
    <AdminPhaseMenu
      organizationSlug={organizationSlug}
      phase={phase}
      tournamentSlug={tournamentSlug}
    />
  ) : (
    <div></div>
  );
  return (
    <aside className="menu">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Edit`}>
            Informations
          </Link>
        </li>
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Phases`}>
            Phases
          </Link>
        </li>
        <li>
          <Link to={`/${organizationSlug}/${tournamentSlug}/Teams`}>Teams</Link>
        </li>
      </ul>
      {PhaseMenu}
    </aside>
  );
};

export default AdminMenu;
