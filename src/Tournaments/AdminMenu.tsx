import React from 'react';
import { Link } from 'react-router-dom';

interface AdminMenuProps {
  organizationSlug: string;
  tournamentSlug: string;
}

const AdminMenu: React.FC<AdminMenuProps> = ({
  organizationSlug,
  tournamentSlug
}) => (
  <aside className="menu">
    <p className="menu-label">General</p>
    <ul className="menu-list">
      <li>
        <Link to={`/${organizationSlug}/${tournamentSlug}/Edit`}>
          Informations
        </Link>
      </li>
      <li>
        <Link to={`/${organizationSlug}/${tournamentSlug}/Phases`}>Phases</Link>
      </li>
      <li>
        <Link to={`/${organizationSlug}/${tournamentSlug}/Teams`}>Teams</Link>
      </li>
    </ul>
  </aside>
);

export default AdminMenu;
