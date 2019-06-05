import React from 'react';
import { Link } from 'react-router-dom';
import { OrganizationEntity } from '../state';

const NavBar: React.FC<{
  organizationSlug: string;
  organization: OrganizationEntity;
}> = ({ organizationSlug, organization }) => (
  <nav className="level">
    <div className="level-left">
      <div className="level-item">
        <Link to={`/${organizationSlug}`}>
          <h1 className="title">{organization.name}</h1>
        </Link>
      </div>
    </div>
  </nav>
);

export default NavBar;
