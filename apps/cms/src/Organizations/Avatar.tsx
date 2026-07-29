import React from 'react';
import { ApiOrganization } from '../Shared/httpClient/apiTypes';
import { initials } from '../Shared/contentHelper';
import './Avatar.scss';

interface AvatarProps {
  organization: ApiOrganization;
}

function Avatar({ organization }: AvatarProps) {
  if (!organization.logo_url) {
    const organizationInitials = initials(organization.name);
    return (
      <div className="organization-avatar--placeholder">
        {organizationInitials}
      </div>
    );
  }

  return (
    <div className="organization-avatar">
      <img src={organization.logo_url} alt={organization.name} />
    </div>
  );
}

export default Avatar;
