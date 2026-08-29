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
 * Drop-in <Link> for a route that has moved to apps/public.
 *
 * <Link> navigates inside the SPA without issuing a request, so behind the
 * Worker the edge never sees it and the CMS serves its own pre-migration copy
 * of the page. Without an edge to reach, a real navigation would just be a
 * slower <Link>, hence the flag.
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
