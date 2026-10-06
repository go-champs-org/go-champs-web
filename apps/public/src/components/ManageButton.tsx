'use client';

import { useEffect, useState } from 'react';
import { FaGear } from 'react-icons/fa6';
import { isOrganizationMember, readOrganizationIdsCookie } from '../auth/authCookie';
import { cmsPath } from '../config/cms';
import { manageButtonClassName } from './manageButtonClassName';

export interface ManageButtonProps {
  organizationId: string;
  org: string;
  tournament: string;
  label: string;
}

export function ManageButton({ organizationId, org, tournament, label }: ManageButtonProps) {
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    setIsMember(isOrganizationMember(readOrganizationIdsCookie(), organizationId));
  }, [organizationId]);

  return (
    <a
      href={cmsPath(`/${org}/${tournament}/Manage`)}
      className={manageButtonClassName(isMember)}
      aria-hidden={isMember ? undefined : true}
      tabIndex={isMember ? undefined : -1}
    >
      <FaGear aria-hidden="true" className="h-4 w-4" />
      {label}
    </a>
  );
}
