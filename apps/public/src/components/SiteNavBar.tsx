'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { NavBar, type NavLink } from '@gochamps/ui';
import { readUsernameCookie } from '../auth/authCookie';
import { cmsPath } from '../config/cms';

export interface SiteNavBarProps {
  links: NavLink[];
  logoHref: string;
  logoSrc: string;
  logoSrcMobile: string;
  loginLabel: string;
  localeSwitcher?: ReactNode;
}

export function SiteNavBar({ loginLabel, ...navBarProps }: SiteNavBarProps) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(readUsernameCookie());
  }, []);

  return (
    <NavBar
      {...navBarProps}
      loginHref={cmsPath('/SignIn')}
      loginLabel={loginLabel}
      account={username ? { href: cmsPath('/Account'), label: `@${username}` } : undefined}
    />
  );
}
