import React from 'react';
import { Link } from 'react-router-dom';
import { isEdgeRoutingEnabled } from '../EdgeRouting/edgeRouting';

export interface MigratedRouteLinkProps {
  to: string;
  className?: string;
  'aria-label'?: string;
  children: React.ReactNode;
}

/**
 * A link to a route that has already been migrated to apps/public.
 *
 * Behind the Cloudflare Worker, it must be a real navigation: react-router's
 * <Link> changes the route inside the SPA without issuing a request, so the
 * edge never sees it and the CMS renders its own pre-migration version of the
 * page. On Netlify there is no edge to reach, so it stays a <Link> — a full
 * page load there would be slower for no gain.
 *
 * Drop-in for <Link> at the call sites listed in apps/cms/src/EdgeRouting.
 */
export const MigratedRouteLink = ({
  to,
  className,
  children,
  ...rest
}: MigratedRouteLinkProps) =>
  isEdgeRoutingEnabled() ? (
    <a href={to} className={className} {...rest}>
      {children}
    </a>
  ) : (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  );

export default MigratedRouteLink;
