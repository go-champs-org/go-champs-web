'use client';

import { useEffect, useState } from 'react';
import { FaGear } from 'react-icons/fa6';
import { isOrganizationMember, readOrganizationIdsCookie } from '../auth/authCookie';
import { cmsPath } from '../config/cms';

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
    <>
      {isMember && (
        <a
          href={cmsPath(`/${org}/${tournament}/Manage`)}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm font-semibold text-primary-dark transition-colors hover:bg-primary/10"
        >
          <FaGear aria-hidden="true" className="h-4 w-4" />
          {label}
        </a>
      )}
    </>
  );
}
